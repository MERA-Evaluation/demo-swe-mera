<script lang="ts">
  import { asClassComponent } from 'svelte/legacy';
  import RangeSlider from '../components/RangeSlider.svelte';
  import { onMount } from 'svelte';

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

  let calculatedByJsonData: SummaryRow[] = [];
  let filteredByDate: SummaryRow[] = [];

  let allData: DataRow[] = [];

  // подгрузка всех файлов
  const modelsDataModules = import.meta.glob('../data/*.json');

  let START_DATE: number;
  let END_DATE: number;

  // date range: [timestamp, timestamp], let из-за bind к компоненту, на const прям ругается
  let dateRange;

  // Преобразуем JSON с колонками в массив DataRow
  function reshapeColumnJson(obj: any): DataRow[] {
    const keys = Object.keys(obj);
    const length = Object.values(obj[keys[0]]).length;

    return Array.from({ length }, (_, i) => {
      const row: Record<string, any> = {};
      keys.forEach((key) => {
        row[key] = obj[key][i];
      });
      return row as DataRow;
    });
  }

  // основные вычисления по файлам
  function summarize(data: DataRow[]): SummaryRow[] {
    const grouped = data.reduce(
      (acc, row) => {
        (acc[row.model] ||= []).push(row);
        return acc;
      },
      {} as Record<string, DataRow[]>,
    );

    const mean = (arr: number[]) =>
      (arr.reduce((a, b) => a + b, 0) / arr.length) * 100;
    const std = (arr: number[]) => {
      const m = mean(arr);
      return (
        Math.sqrt(arr.reduce((s, x) => s + (x - m) ** 2, 0) / arr.length) * 100
      );
    };

    return Object.entries(grouped).map(([model, rows]) => {
      const pass1 = rows.map((r) => r['pass@1']);
      const pass5 = rows.map((r) => r['pass@5']);
      const tasksLength = rows.length;
      return {
        model,
        'pass@1': mean(pass1),
        pass1_std: std(pass1) / Math.sqrt(tasksLength),
        'pass@5': mean(pass5),
        n_task: tasksLength,
        trajectory: `https://github.com/mera/swe-mera/trajectory/${model}`,
      };
    });
  }

  function updateTable() {
    const filteredData = filterByDate(
      allData,
      new Date(dateRange[0]),
      new Date(dateRange[1]),
    );
    calculatedByJsonData = summarize(filteredData);
    filteredByDate = [...calculatedByJsonData];
  }

  function filterByDate(data: DataRow[], start: Date, end: Date): DataRow[] {
    return data.filter((row) => {
      const date = new Date(row.date).getTime();
      return date >= start.getTime() && date <= end.getTime();
    });
  }

  function getMinimumDate(dataRow: DataRow[]) {
    let minimumDate = dataRow[0].date;
    for (let currentDate of dataRow) {
      if (
        new Date(minimumDate).getTime() > new Date(currentDate.date).getTime()
      ) {
        minimumDate = currentDate.date;
      }
    }

    return new Date(minimumDate).getTime();
  }

  function getMaximumDate(dataRow: DataRow[]) {
    let maximumDate = dataRow[0].date;
    for (let currentDate of dataRow) {
      if (
        new Date(maximumDate).getTime() < new Date(currentDate.date).getTime()
      ) {
        maximumDate = currentDate.date;
      }
    }
    return new Date(maximumDate).getTime();
  }

  function sortBy(value: string) {
    console.log(filteredByDate);
      filteredByDate = filteredByDate.sort(
        (currentElem: DataRow, nextElem: DataRow) => {
          if (currentElem[value] > nextElem[value]) {
            return -1;
          }

          if (currentElem[value] < nextElem[value]) {
            return 1;
          }

          return 0;
        },
      );
  }

  // Загрузка и первичная агрегация
  onMount(async () => {
    // подргужаем все модули, модули у нас являются промисами, выполняем их и получаем JSON-ы
    const loadedData = await Promise.all(
      Object.values(modelsDataModules).map((module) => module()),
    );

    allData = loadedData.flatMap((result) => reshapeColumnJson(result.default));

    START_DATE = getMinimumDate(allData);
    END_DATE = getMaximumDate(allData);
    dateRange = [START_DATE, END_DATE];
  });

  // Реактивная реакция на изменение диапазона
  $: if (allData.length && dateRange) {
    updateTable();
  }
</script>

<section class="section-leaderboard">
  <div class="slider-wrapper">
    <!-- step — 4 части, данные берутся из JSON -->
    <RangeSlider
      id="testSlider"
      bind:values={dateRange}
      range
      float
      min={START_DATE}
      max={END_DATE}
      step={4}
      all="label"
      pips
    />
  </div>

  {#if filteredByDate.length}
    <table>
      <thead>
        <tr>
          <th>Position</th>
          <th>Model</th>
          <th onclick={() => sortBy('pass@1')} class="table__row-sort">pass@1</th>
          <th onclick={() => sortBy('pass1_std')}>pass1_std</th>
          <th onclick={() => sortBy('pass@5')}>pass@5</th>
          <th onclick={() => sortBy('n_task')}>Tasks</th>
          <th>Trajectory</th>
        </tr>
      </thead>
      <tbody>
        {#each filteredByDate as row, idx}
          <tr>
            <td class="table__position">{idx + 1}</td>
            <td>{row.model}</td>
            <td>{row['pass@1'].toFixed(3)}</td>
            <td>{row['pass1_std'].toFixed(3)}</td>
            <td>{row['pass@5'].toFixed(3)}</td>
            <td>{row.n_task}</td>
            <td><a href={row.trajectory} target="_blank">link</a></td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <div class="table__no-data-wrapper">
      <span>Данных за этот период нет</span>
    </div>
  {/if}
</section>

<style>
  .section-leaderboard {
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    padding-right: 10px;
    padding-left: 10px;
    max-width: 980px;
    width: 980px;
    min-height: 800px;
    border: 1px solid #d3d3d3;
    border-radius: 10px;
  }

  .slider-wrapper {
    margin: 20px;
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

  .table__position {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 800;
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

  .table__no-data-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 200px;
  }
</style>
