import BatsManScoreCard from "../components/BatsManScoreCard";
import LiveScoreCard from "../components/LiveScroeCard";
import Navbar from "../components/Navbar";
import BowlerScoreCard from "../components/BowlerScoreCard";
import OverUpdates from "../components/OverUpdates";

function MainPage() {
  const [run, setRun] = useState(0);
  const [wicket, setWicket] = useState(0);
  const [over, setOver] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [team, setTeam] = useState(null);
  const [isMatchStarted, setIsMatchStarted] = useState(false);

  return (
    <>
      <Navbar />
      <LiveScoreCard
        run={run}
        wicket={wicket}
        over={over}
        errorMsg={errorMsg}
        successMsg={successMsg}
      />
      <BatsManScoreCard />
      <BowlerScoreCard />
      <OverUpdates />
    </>
  );
}

export default MainPage;
