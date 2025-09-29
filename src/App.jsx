
import BatsManScoreCard from "./components/BatsManScoreCard";
import BowlerScoreCard from "./components/BowlerScoreCard";
import LiveScoreCard from "./components/LiveScroeCard";
import Navabar from "./components/Navbar";
import OverUpdates from "./components/OverUpdates";

function App() {
  return (
    <>
      <Navabar />
      <LiveScoreCard />
      <BatsManScoreCard/>
      <BowlerScoreCard/>
      <OverUpdates/>
    </>
  );
}

export default App;
