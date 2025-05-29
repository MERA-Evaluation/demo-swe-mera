<script>
  import router from 'page';
  import NavigateButton from './components/NavigateButton.svelte';
  import HomeIcon from './assets/homeIcon.svg';
  import LeaderBoardIcon from './assets/leaderBoarIcon.svg';
  import routes from './routes';
  let page;
  let params;

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
    Mera-rebench: A Continuously Evolving and Decontaminated Benchmark for
    Software Engineering LLMs
  </h1>
  <nav class="header__navigate">
    <NavigateButton buttonText="Home" imgSrc={HomeIcon} link="/" />
    <NavigateButton
      buttonText="Leaderboard"
      imgSrc={LeaderBoardIcon}
      link="/leaderboard"
    />
  </nav>
</header>

<main class="main-wrapper">
  <svelte:component this={page} {params} />
</main>

<style>
  .main-wrapper {
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
    font-size: clamp(1.75rem, 1.2266rem + 1.9704vw, 3rem);
    font-weight: 800;
  }

  .header__navigate {
    display: flex;
    gap: 10px;
  }
</style>
