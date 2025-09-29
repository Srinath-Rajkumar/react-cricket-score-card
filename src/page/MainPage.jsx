import { useState, useEffect, useRef } from "react";
import BatsManScoreCard from "../components/BatsManScoreCard";
import LiveScoreCard from "../components/LiveScroeCard";
import Navbar from "../components/Navbar";
import BowlerScoreCard from "../components/BowlerScoreCard";
import OverUpdates from "../components/OverUpdates";
import DisplayMsg from "../components/DisplayMsg";
import PlayerList from "../db/playerList";

function MainPage() {
  const [run, setRun] = useState(0);
  const [wicket, setWicket] = useState(0);
  const [over, setOver] = useState(0);
  const [runRate, setRunRate] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [team, setTeam] = useState(null);
  const [isMatchStarted, setIsMatchStarted] = useState(false);

  const [currentStriker, setCurrentStriker] = useState(1);

  const usedBatsmenRef = useRef([]);

  const runRef = useRef(0);
  const ballsRef = useRef(0);
  const wicketRef = useRef(0);
  const intervalRef = useRef(null);
  const strikerRef = useRef(1);

  const [batsman1, setBatsman1] = useState({
    id: 0,
    runs: 0,
    balls: 0,
    fours: 0,
    sixes: 0,
    name: "NA",
    status: "NA",
  });

  const [batsman2, setBatsman2] = useState({
    id: 0,
    runs: 0,
    balls: 0,
    fours: 0,
    sixes: 0,
    name: "NA",
    status: "NA",
  });

  const [bowler, setBowler] = useState({
    id: 0,
    runs: 0,
    wicket: 0,
    over: 0,
    name: "NA",
    status: "NA",
  });

  const battingTeamRef = useRef(null);
  const bowlingTeamRef = useRef(null);

  const handleStartMatch = (teamName) => {
    if (!intervalRef.current) {
      setTeam(teamName);
      setErrorMsg("");
      setSuccessMsg(`Selected Team ${teamName}!`);
      const teamValue = teamName === "CSK" ? 1 : 2;
      const battingTeam =
        teamValue === 1 ? [...PlayerList.team1] : [...PlayerList.team2];
      const bowlingTeam =
        teamValue === 1 ? [...PlayerList.team2] : [...PlayerList.team1];

      console.log("Batting team :", battingTeam[0]);
      console.log("Batting team :", bowlingTeam[0]);

      battingTeamRef.current = battingTeam;
      bowlingTeamRef.current = bowlingTeam;

      let batsman1 = selectRandomPlayer(battingTeam);
      let batsman2 = selectRandomPlayer(battingTeam);

      while (batsman1.id === batsman2.id) {
        batsman2 = selectRandomPlayer(battingTeam);
      }

      let bowlerPlayer = selectRandomPlayer(bowlingTeam);

      console.log("Selected Team:", teamName);
      console.log("Batsman 1:", batsman1.playerName);
      console.log("Batsman 2:", batsman2.playerName);
      console.log("Bowler:", bowlerPlayer.playerName);

      setRun(0);
      setWicket(0);
      setOver(0);
      setRunRate(0);
      runRef.current = 0;
      ballsRef.current = 0;
      wicketRef.current = 0;
      setCurrentStriker(1);

      setBatsman1({
        id: batsman1.id,
        runs: 0,
        balls: 0,
        fours: 0,
        sixes: 0,
        name: batsman1.playerName,
        status: "Batting",
      });
      setBatsman2({
        id: batsman2.id,
        runs: 0,
        balls: 0,
        fours: 0,
        sixes: 0,
        name: batsman2.playerName,
        status: "Batting",
      });

      setBowler({
        id: bowlerPlayer.id,
        name: bowlerPlayer.playerName,
        runs: 0,
        overs: 0,
        wickets: 0,
        balls: 0,
      });
      usedBatsmenRef.current = [batsman1.id, batsman2.id];
      console.log("Used batsmen IDs:", usedBatsmenRef.current);
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

    //const isWicket = Math.floor(Math.random() * 5) === 0;

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

    let striker = strikerRef.current;
    console.log("current striker:", striker);
    updatePlayerStats(randomNumber);

    if (randomNumber % 2 === 1) {
      changeStrike();
    }

    if (ballsInOver === 0 && ballsRef.current > 0) {
      changeStrike();
    }
  }

  function selectRandomPlayer(team) {
    const randomIndex = Math.floor(Math.random() * team.length);
    return team[randomIndex];
  }

  function updatePlayerStats(runs) {
    if (strikerRef.current === 1) {
      console.log("Updating batsman 1");
      setBatsman1((p) => ({
        ...p,
        runs: p.runs + runs,
        balls: p.balls + 1,
        fours: runs === 4 ? p.fours + 1 : p.fours,
        sixes: runs === 6 ? p.sixes + 1 : p.sixes,
      }));
      //   console.log("After update - Batsman1");
    } else {
      console.log("Updating batsman 2");
      setBatsman2((p) => ({
        ...p,
        runs: p.runs + runs,
        balls: p.balls + 1,
        fours: runs === 4 ? p.fours + 1 : p.fours,
        sixes: runs === 6 ? p.sixes + 1 : p.sixes,
      }));
      //   console.log("After update - Batsman2");
    }
  }

  function changeStrike() {
    strikerRef.current = strikerRef.current === 1 ? 2 : 1;
    setCurrentStriker(strikerRef.current);
  }
  //   function handleWicket(){
  //     wicketRef.current++;
  //     setWicket(wicketRef.current);

  //     setBowler(bow=>({

  //     })
  //   }

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
      <BatsManScoreCard
        batsman1={batsman1}
        batsman2={batsman2}
        currentStriker={currentStriker}
      />
      <BowlerScoreCard bowler={bowler} />
      <OverUpdates />
    </>
  );
}

export default MainPage;
