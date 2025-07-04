<script>
  export let label;
  export let design = 'inner label';
  export let options = [];
  export let fontSize = 16;
  export let value = 'on';

  let checked = true;

  const uniqueID = Math.floor(Math.random() * 100);

  function handleClick(event) {
    const target = event.target;

    const state = target.getAttribute('aria-checked');

    checked = state === 'true' ? false : true;

    value = checked === true ? 'on' : 'off';
  }

  const slugify = (str = '') =>
    str.toLowerCase().replace(/ /g, '-').replace(/\./g, '');
</script>

{#if design == 'inner'}
  <div class="s s--inner">
    <span id={`switch-${uniqueID}`}>{label}</span>
    <button
      role="switch"
      aria-checked={checked}
      aria-labelledby={`switch-${uniqueID}`}
      on:click={handleClick}
    >
      <span>on</span>
      <span>off</span>
    </button>
  </div>
{:else if design == 'slider'}
  <div class="s s--slider" style="font-size:{fontSize}px">
    <span id={`switch-${uniqueID}`}>{label}</span>
    <button
      role="switch"
      aria-checked={checked}
      aria-labelledby={`switch-${uniqueID}`}
      on:click={handleClick}
    >
    </button>
  </div>
{:else}
  <div class="s s--multi">
    <div
      role="radiogroup"
      class="group-container"
      aria-labelledby={`label-${uniqueID}`}
      style="font-size:{fontSize}px"
      id={`group-${uniqueID}`}
    >
      <div class="legend" id={`label-${uniqueID}`}>{label}</div>
      {#each options as option}
        <input
          type="radio"
          id={`${option}-${uniqueID}`}
          value={option}
          bind:group={value}
        />
        <label for={`${option}-${uniqueID}`}>
          {option}
        </label>
      {/each}
    </div>
  </div>
{/if}

<style>
  :root {
    --accent-color: rgb(102, 126, 234);
    --gray: #ccc;
  }
  .s--inner button {
    padding: 0.5em;
    background-color: #fff;
    border: 1px solid var(--gray);
  }
  [role='switch'][aria-checked='true'] :first-child,
  [role='switch'][aria-checked='false'] :last-child {
    display: none;
    color: #fff;
  }

  .s--inner button span {
    user-select: none;
    pointer-events: none;
    padding: 0.25em;
  }

  .s--inner button:focus {
    outline: var(--accent-color) solid 1px;
  }

  .s--slider {
    display: flex;
    align-items: center;
  }

  .s--slider button {
    width: 3em;
    height: 1.6em;
    position: relative;
    margin: 0 0 0 0.5em;
    background: var(--gray);
    border: none;
  }

  .s--slider button::before {
    content: '';
    position: absolute;
    width: 1.3em;
    height: 1.3em;
    background: #fff;
    top: 0.13em;
    right: 1.5em;
    transition: transform 0.3s;
  }

  .s--slider button[aria-checked='true'] {
    background-color: var(--accent-color);
  }

  .s--slider button[aria-checked='true']::before {
    transform: translateX(1.3em);
    transition: transform 0.3s;
  }

  .s--slider button:focus {
    box-shadow: 0 0px 0px 1px var(--accent-color);
  }

  .s--multi .group-container {
    border: none;
    padding: 0;
    white-space: nowrap;
  }

  .s--multi label {
    display: inline-block;
    line-height: 1.6;
    position: relative;
    z-index: 2;
        &:hover {
      cursor: pointer;
    }
  }

  .s--multi input {
    opacity: 0;
    position: absolute;
  }

  .s--multi label:first-of-type {
    text-transform: uppercase;
    padding-right: 5em;
    color: #fff;
  }

  .s--multi label:last-child {
    text-transform: uppercase;
    color: #fff;
    margin-left: -5em;
    padding-left: 5em;
  }

  .s--multi:focus-within label:first-of-type:after {
    box-shadow: 0 0px 8px var(--accent-color);
    border-radius: 1.5em;
  }

  /* making the switch UI.  */
  .s--multi label:first-of-type:before,
  .s--multi label:first-of-type:after {
    content: '';
    height: 1.25em;
    /* overflow: hidden; */
    pointer-events: none;
    position: absolute;
    vertical-align: middle;
  }

  .s--multi label:first-of-type:before {
    border-radius: 100%;
    z-index: 2;
    position: absolute;
    width: 1.2em;
    height: 1.2em;
    background: #fff;
    top: 0.2em;
    right: 1.2em;
    transition: transform 0.3s;
  }

  .s--multi label:first-of-type:after {
    background: var(--accent-color);
    border-radius: 1em;
    margin: 0 1em;
    transition: background 0.2s ease-in-out;
    width: 3em;
    height: 1.6em;
  }

  .s--multi input:first-of-type:checked ~ label:first-of-type:after {
    background: var(--gray);
  }

  .s--multi input:first-of-type:checked ~ label:first-of-type:before {
    transform: translateX(-1.4em);
  }

  .s--multi input:last-of-type:checked ~ label:last-of-type {
    z-index: 1;
  }

  .s--multi input:focus {
    box-shadow: 0 0px 8px var(--accent-color);
    border-radius: 1.5em;
  }

  [role='switch'][aria-checked='true'] :first-child,
  [role='switch'][aria-checked='false'] :last-child {
    border-radius: 0.25em;
    background: var(--accent-color);
    display: inline-block;
  }

  .s--inner button:focus {
    box-shadow: 0 0px 8px var(--accent-color);
    border-radius: 0.1em;
  }

  .s--slider button {
    border-radius: 1.5em;
  }

  .s--slider button::before {
    border-radius: 100%;
  }

  .s--slider button:focus {
    box-shadow: 0 0px 8px var(--accent-color);
    border-radius: 1.5em;
  }
</style>
