import { useState, useEffect, useRef } from "react";
import BatsManScoreCard from "../components/BatsManScoreCard";
import LiveScoreCard from "../components/LiveScroeCard";
import Navbar from "../components/Navbar";
import BowlerScoreCard from "../components/BowlerScoreCard";
import OverUpdates from "../components/OverUpdates";
import DisplayMsg from "../components/DisplayMsg";

function MainPage() {
  const [run, setRun] = useState(0);
  const [wicket, setWicket] = useState(0);
  const [over, setOver] = useState(0);
  const [runRate, setRunRate] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [team, setTeam] = useState(null);
  const [isMatchStarted, setIsMatchStarted] = useState(false);

  const runRef = useRef(0);
  const ballsRef = useRef(0);
  const intervalRef = useRef(null);

  const handleStartMatch = (teamName) => {
    if (!intervalRef.current) {
      setTeam(teamName);
      setErrorMsg("");
      setSuccessMsg(`Selected Team ${teamName}!`);
      setRun(0);
      setWicket(0);
      setOver(0);
      setRunRate(0);
      runRef.current = 0;
      ballsRef.current = 0;
      intervalRef.current = setInterval(updateRun, 2000);
      setIsMatchStarted(true);
    }
  };

  const handleStopMatch = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsMatchStarted(false);
    setErrorMsg("Match stopped!");
    setSuccessMsg("");
  };

  useEffect(() => {
    if (successMsg || (errorMsg && errorMsg !== "Match stopped!")) {
      const timer = setTimeout(() => {
        setSuccessMsg("");
        if (errorMsg !== "Match stopped!") setErrorMsg("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMsg, errorMsg]);

  function updateRun() {
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    console.log("runs :", randomNumber);
    runRef.current += randomNumber;
    // setRun(runRef.current);

    ballsRef.current++;
    console.log("balls :", ballsRef.current);
    let overs = Math.floor(ballsRef.current / 6);
    let ballsInOver = ballsRef.current % 6;
    const displayOvers = `${overs}.${ballsInOver}`;
    console.log("total over :", displayOvers);
    // setOver(displayOvers);

    let overNumber = ballsInOver === 0 ? overs : overs + 1;
    console.log("overNumber :", overNumber);
    const totalOvers = overs + ballsInOver / 6;
    const currentRunRate =
      totalOvers > 0 ? (runRef.current / totalOvers).toFixed(2) : 0;
    console.log("run rate :", currentRunRate);

    setRun(runRef.current);
    setOver(displayOvers);
    setRunRate(currentRunRate);
  }

  return (
    <>
      <Navbar onTeamSelect={handleStartMatch} onStopMatch={handleStopMatch} />
      <DisplayMsg errorMsg={errorMsg} successMsg={successMsg} />
      <LiveScoreCard
        run={run}
        wicket={wicket}
        over={over}
        runRate={runRate}
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
