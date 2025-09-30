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
  const [isWaitingForNewBatsman, setIsWaitingForNewBatsman] = useState(false);
  const [oversData, setOversData] = useState({});

  const usedBatsmenRef = useRef([]);
  const bowlerStatsRef = useRef({});

  const runRef = useRef(0);
  const ballsRef = useRef(0);
  const wicketRef = useRef(0);
  const intervalRef = useRef(null);
  const strikerRef = useRef(1);
  const isWaitingForNewBatsmanRef = useRef(false);
  const battingTeamRef = useRef(null);
  const bowlingTeamRef = useRef(null);
  const currentBowlerRef = useRef(null);

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
    wickets: 0,
    over: 0,
    name: "NA",
    status: "NA",
  });

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

      let currentBowler = bowlerPlayer;

      currentBowlerRef.current = currentBowler;
      bowlerStatsRef.current=currentBowler;

      console.log("Selected Team:", teamName);
      console.log("Batsman 1:", batsman1.playerName);
      console.log("Batsman 2:", batsman2.playerName);
      console.log("Bowler:", bowlerPlayer.playerName);
      console.log("Current bowler:", currentBowler);
      console.log("bowler status :", bowlerStatsRef);

      setRun(0);
      setWicket(0);
      setOver(0);
      setRunRate(0);
      runRef.current = 0;
      ballsRef.current = 0;
      wicketRef.current = 0;
      setOversData({});
      //bowlerStatsRef.current = 0;
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

      createBowler(currentBowler);
      updateBowlerDisplay();

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
    if (isWaitingForNewBatsmanRef.current) {
      console.log("Waiting for new batsman... ball not allowed yet.");
      return;
    }
    let isWicket = Math.floor(Math.random() * 5);
    let strikerId = currentStriker === 1 ? batsman1.id : batsman2.id;
    console.log("wicket gone:", isWicket);
    console.log("current striker id:", strikerId);

    if (isWicket === strikerId) {
      handleWicket();
      let ballResult = "W";
      ballsRef.current++;
      let overs = Math.floor(ballsRef.current / 6);
      let ballsInOver = ballsRef.current % 6;
      let overNumber = ballsInOver === 0 ? overs : overs + 1;
      const displayOvers = `${overs}.${ballsInOver}`;
      setOver(displayOvers);
      setOversData((data) => {
        const newOversData = { ...data };
        newOversData[overNumber] = [
          ...(newOversData[overNumber] || []),
          ballResult,
        ];

        console.log("over data :", newOversData);
        return newOversData;
      });
      updateBowlerStats(ballResult);
      return;
    }

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

    // let striker = strikerRef.current;
    // console.log("current striker:", striker);

    updatePlayerStats(randomNumber);
    updateBowlerStats(randomNumber);

    setOversData((data) => {
      const newOversData = { ...data };
      newOversData[overNumber] = [
        ...(newOversData[overNumber] || []),
        randomNumber,
      ];

      console.log("over data :", newOversData);
      return newOversData;
    });

    console.log("overs:", overs);
    console.log("no of balls in over:", ballsInOver);

    if (randomNumber % 2 === 1) {
      changeStrike();
    }

    if (ballsInOver === 0 && ballsRef.current > 0) {
      changeStrike();
      let newBowler = selectRandomPlayer(bowlingTeamRef.current);
      while (newBowler.id === currentBowlerRef.current.id) {
        newBowler = selectRandomPlayer(bowlingTeamRef.current);
      }
      currentBowlerRef.current = newBowler;
      // setBowler((p)=>({...p,name:p.name}));
      createBowler(newBowler);
      updateBowlerDisplay();
      console.log("new bowler :", currentBowlerRef.current);
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

  function handleWicket() {
    wicketRef.current++;
    setWicket(wicketRef.current);

    if (currentStriker === 1) {
      setBatsman1((p) => ({ ...p, status: "OUT" }));
    } else {
      setBatsman2((p) => ({ ...p, status: "OUT" }));
    }
    isWaitingForNewBatsmanRef.current = true;
    setIsWaitingForNewBatsman(true);
    setBowler((p) => ({
      ...p,
      wickets: p.wickets + 1,
    }));

    const availableBatsmen = battingTeamRef.current.filter(
      (player) =>
        !usedBatsmenRef.current.includes(player.id) &&
        player.id !== batsman1.id &&
        player.id !== batsman2.id
    );

    if (availableBatsmen.length === 0) {
      handleStopMatch();
      setErrorMsg("All out! Innings over.");
      setSuccessMsg("");
      setIsWaitingForNewBatsman(false);

      return;
    }
    console.log("Used batsmen IDs:", usedBatsmenRef.current);
    console.log("Available batsmen:", availableBatsmen);

    const newBatsman =
      availableBatsmen[Math.floor(Math.random() * availableBatsmen.length)];

    setErrorMsg("Wicketttt !!!");
    setSuccessMsg(`New player: ${newBatsman.playerName}`);

    console.log("New batsman:", newBatsman.playerName);

    setTimeout(() => {
      if (currentStriker === 1) {
        setBatsman1({
          id: newBatsman.id,
          runs: 0,
          balls: 0,
          fours: 0,
          sixes: 0,
          name: newBatsman.playerName,
          status: "batting",
        });
      } else {
        setBatsman2({
          id: newBatsman.id,
          runs: 0,
          balls: 0,
          fours: 0,
          sixes: 0,
          name: newBatsman.playerName,
          status: "batting",
        });
      }

      usedBatsmenRef.current.push(newBatsman.id);
      console.log("Updated used batsmen IDs:", usedBatsmenRef.current);

      isWaitingForNewBatsmanRef.current = false;
      setIsWaitingForNewBatsman(false);

      setErrorMsg("");
      setSuccessMsg("");
    }, 7000);
  }

  function createBowler(bowler) {
    console.log("bowler id :", bowler.id);
    if (!bowlerStatsRef.current[bowler.id]) {
      bowlerStatsRef.current[bowler.id] = {
        name: bowler.playerName,
        runs: 0,
        balls: 0,
        overs: 0,
        wickets: 0,
      };
    }
    console.log("bowler id after if:", bowler.id);
    return bowlerStatsRef.current[bowler.id];
  }

  function updateBowlerStats(run) {
    let runs = run === "W" ? 0 : run;
    let bowlerId = currentBowlerRef.current.id;

    if (!bowlerStatsRef.current[bowlerId]) {
      bowlerStatsRef.current[bowlerId] = {
        name: currentBowlerRef.current.playerName,
        runs: 0,
        balls: 0,
        overs: 0,
        wickets: 0,
      };
    }
    const stats = bowlerStatsRef.current[bowlerId];
    stats.runs += runs;
    stats.balls += 1;

    if (run === "W") {
      stats.wickets += 1;
    }
    const bowlerCompleteOvers = Math.floor(stats.balls / 6);
    const bowlerBallsInOver = stats.balls % 6;
    stats.overs = bowlerCompleteOvers + bowlerBallsInOver / 10;

    bowlerStatsRef.current[bowlerId] = stats;
    console.log("Current bowler stats:", stats);
    updateBowlerDisplay();
  }

  function updateBowlerDisplay() {
    const bowlerId = currentBowlerRef.current.id;
    const stats = bowlerStatsRef.current[bowlerId];
    if (!stats) {
      console.error("No stats found for bowler:", bowlerId);
      return;
    }
    const bowlerCompleteOvers = Math.floor(stats.balls / 6);
    const bowlerBallsInOver = stats.balls % 6;

    setBowler({
      id: bowlerId,
      name: currentBowlerRef.current.playerName,
      runs: stats.runs,
      wickets: stats.wickets,
      balls: stats.balls,
      over: `${bowlerCompleteOvers}.${bowlerBallsInOver}`,
    });
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
      <BatsManScoreCard
        batsman1={batsman1}
        batsman2={batsman2}
        currentStriker={currentStriker}
      />
      <BowlerScoreCard
        bowlerName={bowler.name}
        over={bowler.over}
        wicket={bowler.wickets}
        run={bowler.runs}
      />
      <OverUpdates oversData={oversData} />
    </>
  );
}

export default MainPage;
