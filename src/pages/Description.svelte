<script lang="ts">
  import { getContext, onDestroy } from 'svelte';
  import TextBlock from '../components/TextBlock.svelte';
  import { firstParagraphText } from '../data/textData';
  import textData from '../data/textData.json';

  const languageStore = getContext('language');
  let lang;

  const unsubscribe = languageStore.subscribe((value) => {
    lang = value;
  });

  onDestroy(unsubscribe);
</script>

<section>
  {#if lang === 'ru'}
    <TextBlock headerBlock={textData.firstParagraph.headerBlock.ru}>
      {textData.firstParagraph.textBlock.ru}
    </TextBlock>
    <TextBlock headerBlock={textData.firstParagraph.headerBlock.ru}>
      {textData.firstParagraph.textBlock.ru}
    </TextBlock>
    <TextBlock headerBlock={textData.firstParagraph.headerBlock.ru}>
      {textData.firstParagraph.textBlock.ru}
    </TextBlock>
  {:else}
    <TextBlock headerBlock={textData.firstParagraph.headerBlock.eng}>
      {textData.firstParagraph.textBlock.eng}
    </TextBlock>
    <TextBlock headerBlock={textData.firstParagraph.headerBlock.eng}>
      {textData.firstParagraph.textBlock.eng}
    </TextBlock>
    <TextBlock headerBlock={textData.firstParagraph.headerBlock.eng}>
      {textData.firstParagraph.textBlock.eng}
    </TextBlock>
  {/if}
</section>
