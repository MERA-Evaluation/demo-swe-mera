<script>
  import { getContext, onDestroy } from 'svelte';
  import TextBlock from '../components/TextBlock.svelte';
  import textData from '../data/textData.json';
  import { getTextByLang } from '../utils/getTextByLang';

  const languageStore = getContext('language');
  let lang;

  const unsubscribe = languageStore.subscribe((value) => {
    lang = value;
  });

  onDestroy(unsubscribe);



</script>

<section>
  <TextBlock headerBlock={getTextByLang('headerBlockFirst', lang)}>
    {getTextByLang('textBlockFirst', lang)}
  </TextBlock>
  <TextBlock headerBlock={getTextByLang('headerBlockFirst', lang)}>
    {getTextByLang('textBlockFirst', lang)}
  </TextBlock>
  <TextBlock headerBlock={getTextByLang('headerBlockFirst', lang)}>
    {getTextByLang('textBlockFirst', lang)}
  </TextBlock>
  <TextBlock headerBlock={getTextByLang('headerBlockFirst', lang)}>
    {getTextByLang('textBlockFirst', lang)}
  </TextBlock>
  <TextBlock headerBlock={getTextByLang('headerBlockFirst', lang)}>
    {getTextByLang('textBlockFirst', lang)}
  </TextBlock>
</section>
