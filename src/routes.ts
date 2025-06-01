import Description from "./pages/Description.svelte";
import LeaderBoard from "./pages/LeaderBoard.svelte";
import NotFound from "./pages/NotFound.svelte";
import TableLeaderBoard from "./pages/TableLeaderBoard.svelte";

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
    path: '/table',
    component: TableLeaderBoard
  },
  {
    path: "*",
    component: NotFound
  }
 ]