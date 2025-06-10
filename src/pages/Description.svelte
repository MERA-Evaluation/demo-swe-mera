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
  <TextBlock
    headerBlock={lang === 'ru'
      ? textData.firstParagraph.headerBlock.ru
      : textData.firstParagraph.headerBlock.eng}
  >
    {lang === 'ru'
      ? textData.firstParagraph.textBlock.ru
      : textData.firstParagraph.textBlock.eng}
  </TextBlock>
  <TextBlock
    headerBlock={lang === 'ru'
      ? textData.firstParagraph.headerBlock.ru
      : textData.firstParagraph.headerBlock.eng}
  >
    {lang === 'ru'
      ? textData.firstParagraph.textBlock.ru
      : textData.firstParagraph.textBlock.eng}
  </TextBlock>
  <TextBlock
    headerBlock={lang === 'ru'
      ? textData.firstParagraph.headerBlock.ru
      : textData.firstParagraph.headerBlock.eng}
  >
    {lang === 'ru'
      ? textData.firstParagraph.textBlock.ru
      : textData.firstParagraph.textBlock.eng}
  </TextBlock>
  <TextBlock
    headerBlock={lang === 'ru'
      ? textData.firstParagraph.headerBlock.ru
      : textData.firstParagraph.headerBlock.eng}
  >
    {lang === 'ru'
      ? textData.firstParagraph.textBlock.ru
      : textData.firstParagraph.textBlock.eng}
  </TextBlock>
  <TextBlock
    headerBlock={lang === 'ru'
      ? textData.firstParagraph.headerBlock.ru
      : textData.firstParagraph.headerBlock.eng}
  >
    {lang === 'ru'
      ? textData.firstParagraph.textBlock.ru
      : textData.firstParagraph.textBlock.eng}
  </TextBlock>
  <TextBlock
    headerBlock={lang === 'ru'
      ? textData.firstParagraph.headerBlock.ru
      : textData.firstParagraph.headerBlock.eng}
  >
    {lang === 'ru'
      ? textData.firstParagraph.textBlock.ru
      : textData.firstParagraph.textBlock.eng}
  </TextBlock>
</section>
