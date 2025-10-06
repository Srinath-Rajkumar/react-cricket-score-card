import { useState, useRef, useEffect } from "react";
import Button from "./Button";

function Navbar({ onTeamSelect, onStopMatch, isMatchStarted }) {
  const [isDialogBoxOpen, setIsDialogBoxOpen] = useState(false);
  // const [isButtonDiabled, setButtonDisabled] = useState(false);
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
      //setButtonDisabled(false);
    } else if (e.target.id === "team1") {
      onTeamSelect("CSK");
      handleTeamSelect();
    } else if (e.target.id === "team2") {
      onTeamSelect("MUMBAI");
      handleTeamSelect();
    }
  }

  function handleTeamSelect() {
    //setButtonDisabled(true);
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
          disabled={isMatchStarted}
        >
          Start Match
        </Button>
        {isMatchStarted && (
          <div className="flex place-content-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#EA3323"
            >
              <path d="m380-340 280-180-280-180v360Zm-60 220v-80H160q-33 0-56.5-23.5T80-280v-480q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v480q0 33-23.5 56.5T800-200H640v80H320ZM160-280h640v-480H160v480Zm0 0v-480 480Z" />
            </svg>
            <p className="text-sm font-medium flex place-content-center ml-1">
              Live
            </p>
          </div>
        )}

        <div className="grow">
          <p className="text-black/85 font-bold text-center">
            Cricket Live Update
          </p>
        </div>
        <Button
          className="common-start-stop-btn stop-btn"
          id="matchStopBtn"
          onClick={handleBtnClick}
          disabled={!isMatchStarted}
        >
          Stop Match
        </Button>
      </div>
      <dialog
        id="selectTeamModal"
        className="p-3 rounded-lg bg-white max-w-max absolute justify-self-center mt-10"
        ref={dialogRef}
      >
        <div className="mx-10">
          <div className="text-center font-bold text-sm mb-3">
            <p>Select Team :</p>
          </div>
          <div id="teamButtons" className="flex gap-10">
            <div className="flex flex-col">
              <div className="flex place-content-center">
                <Button
                  className="button-team bg-yellow-400 hover:bg-yellow-500"
                  id="team1"
                  onClick={handleBtnClick}
                  value="1"
                >
                  <div className=" flex place-content-center mb-2.5 pointer-events-none">
                    <img
                      src="src\assets\csk.png"
                      className="w-20 h-20 object-fill"
                    ></img>
                  </div>
                </Button>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex place-content-center">
                <Button
                  className="button-team bg-blue-500 hover:bg-blue-700"
                  id="team2"
                  onClick={handleBtnClick}
                  value="2"
                >
                  <div className=" flex place-content-center mb-2.5 pointer-events-none">
                    <img
                      src="src\assets\mi.png"
                      className="w-20 h-20 object-fill"
                    ></img>
                  </div>{" "}
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-2.5">
            <button
              type="button"
              className="button border hover:cursor-pointer text-black hover:bg-black/30"
              onClick={handleCloseModal}
            >
              {" "}
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default Navbar;

// test change
