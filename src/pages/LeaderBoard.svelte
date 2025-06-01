<script>
  import "carbon-components-svelte/css/white.css";
  import {
    DataTable,
    Toolbar,
    ToolbarContent,
    ToolbarSearch,
    Pagination,
  } from "carbon-components-svelte";
  import RangeSlider from "../components/RangeSlider.svelte";
  let values = [4, 6];

  let rows = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    name: "Load Balancer " + (i + 1),
    protocol: "HTTP",
    port: 3000 + i * 10,
    rule: i % 2 ? "Round robin" : "DNS delegation",
  }));
  let pageSize = 5;
  let page = 1;
  let filteredRowIds = [];

  $: console.log("filteredRowIds", filteredRowIds);
</script>

<section class="section-leaderboard">
  <!-- <RangeSlider bind:values max={100} min={0} step={1} pips/> -->
    <div class="slider-wrapper">
      <RangeSlider bind:values range float pips all='label' />
    </div>

  <DataTable
  headers={[
    { key: "name", value: "Name" },
    { key: "protocol", value: "Protocol" },
    { key: "port", value: "Port" },
    { key: "rule", value: "Rule" },
  ]}
  {rows}
  {pageSize}
  {page}
>
  <Toolbar>
    <ToolbarContent>
      <ToolbarSearch
        persistent
        value="round"
        shouldFilterRows
        bind:filteredRowIds
      />
    </ToolbarContent>
  </Toolbar>
</DataTable>

<Pagination
  bind:pageSize
  bind:page
  totalItems={filteredRowIds.length}
  pageSizeInputDisabled
/>
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
</style>
