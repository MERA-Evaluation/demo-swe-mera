<script lang="ts">
  import { getContext, onDestroy } from 'svelte';
  import TextBlock from '../components/TextBlock.svelte';
  import { firstParagraphText } from '../data/textData';

  const languageStore = getContext('language');
  let lang;

  const unsubscribe = languageStore.subscribe(value => {
    lang = value
  })

  onDestroy(unsubscribe);
</script>

<section>
  {console.log(lang)}
  <TextBlock headerBlock="Оглавление">
    {firstParagraphText}
  </TextBlock>
  <TextBlock headerBlock="Оглавление">
    {firstParagraphText}
  </TextBlock>
  <TextBlock headerBlock="Оглавление">
    {firstParagraphText}
  </TextBlock>
</section>
