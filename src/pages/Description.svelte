<script>
  import { getContext, onDestroy } from 'svelte';
  import TextBlock from '../components/TextBlock.svelte';
  import textData from '../data/textData.json';

  const languageStore = getContext('language');
  let lang;

  const unsubscribe = languageStore.subscribe((value) => {
    lang = value;
  });

  onDestroy(unsubscribe);

  // я не хотел прокидывать в параметры еще отдельно langSettings,
  // но без него не происходят обновления по тексту, если просто передавать lang в ключ
  function getTextByLanguage(key, langSettings) {
    return textData[key]?.[langSettings] || '';
  }
</script>

<section>
  <TextBlock headerBlock={getTextByLanguage('headerBlockFirst', lang)}>
    {getTextByLanguage('textBlockFirst', lang)}
  </TextBlock>
  <TextBlock headerBlock={getTextByLanguage('headerBlockFirst', lang)}>
    {getTextByLanguage('textBlockFirst', lang)}
  </TextBlock>
  <TextBlock headerBlock={getTextByLanguage('headerBlockFirst', lang)}>
    {getTextByLanguage('textBlockFirst', lang)}
  </TextBlock>
  <TextBlock headerBlock={getTextByLanguage('headerBlockFirst', lang)}>
    {getTextByLanguage('textBlockFirst', lang)}
  </TextBlock>
  <TextBlock headerBlock={getTextByLanguage('headerBlockFirst', lang)}>
    {getTextByLanguage('textBlockFirst', lang)}
  </TextBlock>
</section>
