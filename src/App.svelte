<script>
  import router from 'page';
  import NavigateButton from './components/NavigateButton.svelte';
  import HomeIcon from './assets/homeIcon.svg';
  import LeaderBoardIcon from './assets/leaderBoarIcon.svg';
  import routes from './routes';
  import ToggleSwitch from './components/ToggleSwitch.svelte';
  import { getContext, onDestroy, setContext } from 'svelte';
  import { language } from './store/languageStore';
  import { getTextByLang } from './utils/getTextByLang';
  let page;
  let params;

  setContext('language', language);

  const languageStore = getContext('language');
  let lang;

  const unsubscribe = languageStore.subscribe((value) => {
    lang = value;
  });

  onDestroy(unsubscribe);

  routes.forEach((route) => {
    router(
      route.path,
      (ctx, next) => {
        params = ctx.params;
        next();
      },

      () => {
        page = route.component;
      },
    );
  });

  router.start();
</script>

<header class="header">
  <h1 class="header__title">
    {getTextByLang('header', lang)}
  </h1>
  <nav class="header__navigate">
    <NavigateButton
      buttonText={getTextByLang('home', lang)}
      imgSrc={HomeIcon}
      link="/"
    />
    <NavigateButton
      buttonText={getTextByLang('leaderboard', lang)}
      imgSrc={LeaderBoardIcon}
      link="/leaderboard"
    />
  </nav>
</header>
<div class="toggle-wrapper">
  <ToggleSwitch
    bind:value={$language}
    design="multi"
    options={['ru', 'eng']}
    fontSize={14}
    label=""
  />
</div>
<main class="main-wrapper">
  <svelte:component this={page} {params} />
</main>

<style>
  .main-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 50px;
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 100px;
    max-width: 960px;
    text-align: center;
  }

  .header__title {
    width: 980px;
    height: 200px;
    margin-bottom: 20px;
    font-size: clamp(1.75rem, 1.2266rem + 1.9704vw, 3rem);
    font-weight: 800;
  }

  .header__navigate {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
  }

  .toggle-wrapper {
    position: absolute;
    top: 50px;
    right: 50px;
  }

  @media (max-width: 500px) {
    .header__title {
      width: 420px;
      height: 180px;
    }
  }
</style>
