<script>
  import { getContext, onDestroy } from 'svelte';
  import TextBlock from '../components/TextBlock.svelte';
  import { getTextByLang } from '../utils/getTextByLang';

  const languageStore = getContext('language');
  let lang;

  const unsubscribe = languageStore.subscribe((value) => {
    lang = value;
  });

  onDestroy(unsubscribe);
</script>

<section class="description">
  <TextBlock headerBlock={getTextByLang('headerBlockFirst', lang)}>
    <article class="description__text-wrapper">
      {getTextByLang('textBlockFirst', lang)}
    </article>
  </TextBlock>
</section>

<style>
  .description {
    max-width: 980px;
    width: 980px;
    padding-left: 4px;
    padding-right: 4px;
  }

  .description__text-wrapper {
    padding-left: 15px;
    padding-right: 15px;
  }

  @media (max-width: 500px) {
    .description {
      width: 420px;
    }
  }
</style>
