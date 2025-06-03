<script lang="ts">
  import RangeSlider from "../components/RangeSlider.svelte";
  import { onMount } from "svelte";

  interface DataRow {
    model: string;
    date: string;
    "pass@1": number;
    "pass@5": number;
    task_id?: string;
  }

  interface SummaryRow {
    model: string;
    "pass@1": number;
    pass1_std: number;
    "pass@5": number;
    n_task: number;
    trajectory: string;
  }

  let summary: SummaryRow[] = [];
  let filtered: SummaryRow[] = [];

  let allData: DataRow[] = [];

  let modelsDataTestArr = [];
  // подгрузка всех файлов
  const modelsDataTest = import.meta.glob("./data/*.json");

  modelsDataTestArr = Object.values(modelsDataTest);

  const START_DATE = new Date("2025-02-26").getTime();
  const END_DATE = new Date("2025-06-04").getTime()

  // date range: [timestamp, timestamp], let из-за bind к компоненту
  let dateRange = [
    START_DATE,
    END_DATE
  ];

  // Преобразуем JSON с колонками в массив DataRow
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

  // основные вычисления по файлам
  function summarize(data: DataRow[]): SummaryRow[] {
    const grouped: Record<string, DataRow[]> = {};
    data.forEach((row) => {
      grouped[row.model] ||= [];
      grouped[row.model].push(row);
    });

    const mean = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
    const std = (arr: number[]) => {
      const m = mean(arr);
      return Math.sqrt(arr.reduce((s, x) => s + (x - m) ** 2, 0) / arr.length);
    };

    return Object.entries(grouped).map(([model, rows]) => {
      const pass1 = rows.map((r) => r["pass@1"]);
      const pass5 = rows.map((r) => r["pass@5"]);
      const n = rows.length;

      return {
        model,
        "pass@1": mean(pass1),
        pass1_std: std(pass1) / Math.sqrt(n),
        "pass@5": mean(pass5),
        n_task: n,
        trajectory: `https://github.com/mera/swe-mera/trajectory/${model}`,
      };
    });
  }

  function filterByDate(data: DataRow[], start: Date, end: Date): DataRow[] {
    return data.filter((row) => {
      const date = new Date(row.date);
      return date >= start && date <= end;
    });
  }

  // Загрузка и первичная агрегация
  onMount(() => {
    modelsDataTestArr.forEach((module) => {
      module().then((result) => {
        allData = [...reshapeColumnJson(result.default)];
      });
    });
    const filteredData = filterByDate(
      allData,
      new Date(dateRange[0]),
      new Date(dateRange[1])
    );
    summary = summarize(filteredData);
    filtered = [...summary];
  });

  // Реакция на изменение диапазона
  $: if (allData.length && dateRange) {
    const filteredData = filterByDate(
      allData,
      new Date(dateRange[0]),
      new Date(dateRange[1])
    );
    summary = summarize(filteredData);
    filtered = [...summary];
  }
</script>

<section class="section-leaderboard">
  <div class="slider-wrapper">
    <!-- step в один день -->
    <RangeSlider
      bind:values={dateRange}
      range
      float
      min={START_DATE}
      max={END_DATE}
      step={1000 * 60 * 60 * 24}
    />
  </div>

  <table>
    <thead>
      <tr>
        <th>Model</th>
        <th>pass@1</th>
        <th>pass@5</th>
        <th>Tasks</th>
        <th>Trajectory</th>
      </tr>
    </thead>
    <tbody>
      {#each filtered as row}
        <tr>
          <td>{row.model}</td>
          <td>{row["pass@1"].toFixed(3)}</td>
          <td>{row["pass@5"].toFixed(3)}</td>
          <td>{row.n_task}</td>
          <td><a href={row.trajectory} target="_blank">link</a></td>
        </tr>
      {/each}
    </tbody>
  </table>
</section>

<style>
  .section-leaderboard {
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    padding-right: 10px;
    padding-left: 10px;
    max-width: 960px;
    width: 960px;
    min-height: 800px;
    border: 1px solid #d3d3d3;
    border-radius: 10px;
  }

  .slider-wrapper {
    margin: 20px 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }

  th,
  td {
    border: 1px solid #ccc;
    padding: 0.4rem 0.8rem;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
  }

  @media (max-width: 500px) {
    .section-leaderboard {
      width: 410px;
      overflow: scroll;
    }

    .slider-wrapper {
      width: 405px;
    }

    td {
      border: 1px solid #ccc;
      padding: 0.2rem 0.4rem;
      text-align: left;
    }
  }
</style>
