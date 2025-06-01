<script lang="ts">
  import { onMount } from 'svelte';
  import modelsData from './data/sample000.json';

  interface DataRow {
    model: string;
    date: string;
    'pass@1': number;
    'pass@5': number;
    task_id?: string;
  }

  interface SummaryRow {
    model: string;
    'pass@1': number;
    pass1_std: number;
    'pass@5': number;
    n_task: number;
    trajectory: string;
  }

  let summary: SummaryRow[] = [];
  let loading = true;

  const startDate = new Date('2025-02-26');
  const endDate = new Date('2025-06-04');

  onMount(() => {
    const reshaped = reshapeColumnJson(modelsData)
    console.log(reshaped)
    const filtered = filterByDate(reshaped, startDate, endDate);
    console.log(filtered);
    summary = summarize(filtered);
    loading = false;
  });

  function reshapeColumnJson(obj: any): DataRow[] {
      const keys = Object.keys(obj);
      const length = Object.values(obj[keys[0]]).length;

      const result: DataRow[] = [];

      for (let i = 0; i < length; i++) {
        const row: any = {};
        for (const key of keys) {
          row[key] = obj[key][i];
       }
    result.push(row as DataRow);
  }

  return result;
  }


  function filterByDate(data: DataRow[], start: Date, end: Date): DataRow[] {
    return data.filter(row => {
      console.log(row);
      const d = new Date(row.date);
      return d >= start && d <= end;
    });
  }

  function summarize(data: DataRow[]): SummaryRow[] {
    const grouped: Record<string, DataRow[]> = {};
    data.forEach(row => {
      grouped[row.model] ||= [];
      grouped[row.model].push(row);
    });

    const mean = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
    const std = (arr: number[]) => {
      const m = mean(arr);
      return Math.sqrt(arr.reduce((s, x) => s + (x - m) ** 2, 0) / arr.length);
    };

    return Object.entries(grouped).map(([model, rows]) => {
      const pass1 = rows.map(r => r['pass@1']);
      const pass5 = rows.map(r => r['pass@5']);
      const n = rows.length;

      return {
        model,
        'pass@1': mean(pass1),
        pass1_std: std(pass1) / Math.sqrt(n),
        'pass@5': mean(pass5),
        n_task: n,
        trajectory: `https://github.com/mera/swe-mera/trajectory/${model}`
      };
    });
  }
</script>


  <table>
    <thead>
      <tr>
        <th>Model</th>
        <th>pass@1</th>
        <th>pass@1</th>
        <th>pass@5</th>
        <th>Tasks</th>
        <th>Trajectory</th>
      </tr>
    </thead>
    <tbody>
      {#each summary as row}
        <tr>
          <td>{row.model}</td>
          <td>{row['pass@1'].toFixed(3)}</td>
          <td>{row.pass1_std.toFixed(3)}</td>
          <td>{row['pass@5'].toFixed(3)}</td>
          <td>{row.n_task}</td>
          <td><a href={row.trajectory} target="_blank">link</a></td>
        </tr>
      {/each}
    </tbody>
  </table>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }

  th, td {
    border: 1px solid #ccc;
    padding: 0.4rem 0.8rem;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
  }
</style>
