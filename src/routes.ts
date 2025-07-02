import Description from "./pages/Description.svelte";
import LeaderBoard from "./pages/LeaderBoard.svelte";
import NotFound from "./pages/NotFound.svelte";

 export default [
  {
    path: '/',
    component: Description
  },
  {
    path: "/leaderboard",
    component: LeaderBoard
  },
  {
    path: "*",
    component: NotFound
  }
 ]