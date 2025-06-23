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
  import logoMera from '../public/logo.svg';
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
  <div class="toggle-wrapper">
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
    <ToggleSwitch
      bind:value={$language}
      design="multi"
      options={['ru', 'eng']}
      fontSize={14}
      label=""
    />
  </div>
</header>


<div class="intro-text">
  <img src={logoMera} alt="Логотип">
  <h1 class="intro__title">
    {getTextByLang('header', lang)}
  </h1>
</div>
<main class="main-wrapper">
  <svelte:component this={page} {params} />
</main>

<style>
  .main-wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 50px;
    margin-bottom: 50px;
  }

  .header {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 100vw;
    height: 80px;
    background: linear-gradient(
      135deg,
      rgb(102, 126, 234) 0%,
      rgb(118, 75, 162) 100%
    );
    border-radius: 0 0 20px 20px;
  }

  .intro-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 100px;
    max-width: 960px;
    text-align: center;
  }

  .intro__title {
    width: 980px;
    height: 120px;
    margin-bottom: 70px;
    font-size: clamp(1.75rem, 1.2266rem + 1.9704vw, 3rem);
    font-weight: 800;
  }

  .toggle-wrapper {
    display: flex;
    justify-content: space-between;
    width: 80%;
  }

  @media (max-width: 500px) {
    .intro__title {
      padding-left: 10px;
      padding-right: 10px;
      width: 410px;
      height: 180px;
    }

    .main-wrapper {
      width: 410px;
      margin-top: 10px;
      margin-bottom: 20px;
      max-height: 500px;
    }
  }
</style>
