import { useState, useRef, useEffect } from "react";
import Button from "./Button";

function Navbar({ onTeamSelect, onStopMatch }) {
  const [isDialogBoxOpen, setIsDialogBoxOpen] = useState(false);
  const [isButtonDiabled, setButtonDisabled] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isDialogBoxOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [isDialogBoxOpen]);

  function handleBtnClick(e) {
    console.log(e.target.id);
    if (e.target.id === "matchStartBtn") {
      setIsDialogBoxOpen(true);
    } else if (e.target.id === "matchStopBtn") {
      setIsDialogBoxOpen(false);
      onStopMatch();
      setButtonDisabled(false);
    } else if (e.target.id === "team1") {
      onTeamSelect("CSK");
      handleTeamSelect();
    } else if (e.target.id === "team2") {
      onTeamSelect("MUMBAI");
      handleTeamSelect();
    }
  }

  function handleTeamSelect() {
    setButtonDisabled(true);
    handleCloseModal();
  }
  function handleCloseModal() {
    setIsDialogBoxOpen(false);
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isDialogBoxOpen) {
        setIsDialogBoxOpen(false);
        console.log("Escape click while modal open");
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDialogBoxOpen]);

  return (
    <>
      <div id="header" className="flex bg-amber-300 p-2.5 items-center">
        <Button
          className="common-start-stop-btn start-btn"
          id="matchStartBtn"
          onClick={handleBtnClick}
          disabled={isButtonDiabled}
        >
          Start Match
        </Button>
        <div className="grow">
          <p className="text-black/85 font-bold text-center">
            Cricket Live Update
          </p>
        </div>
        <Button
          className="common-start-stop-btn stop-btn"
          id="matchStopBtn"
          onClick={handleBtnClick}
        >
          Stop Match
        </Button>
      </div>
      <dialog
        id="selectTeamModal"
        className="p-3 rounded-lg bg-white max-w-max absolute justify-self-center mt-10 "
        ref={dialogRef}
      >
        <div id="teamButtons" className="flex gap-2">
          <Button
            className="button-team bg-yellow-400"
            id="team1"
            onClick={handleBtnClick}
            value="1"
          >
            CSK
          </Button>
          <Button
            className="button-team bg-blue-500"
            id="team2"
            onClick={handleBtnClick}
            value="2"
          >
            MUMBAI
          </Button>
        </div>
        <div className="flex justify-center mt-2.5">
          <button
            type="button"
            className="button border hover:cursor-pointer text-black"
            onClick={handleCloseModal}
          >
            {" "}
            Close
          </button>
        </div>
      </dialog>
    </>
  );
}

export default Navbar;

// test change
