import Button from "./Button";

function Navabar() {
  function handleBtnClick(e){
    console.log(e.target.id)
  }
  return (
    <>
    <div id="header" className="flex bg-amber-300 p-2.5 items-center">
      <Button
        className="common-start-stop-btn start-btn"
        id="matchStartBtn"
        onClick={handleBtnClick}
        btnName="Start"
      />
      <div className="grow">
        <p className="text-black/85 font-bold text-center">
          Cricket Live Update
        </p>
      </div>
      <Button
        className="stop-btn"
        id="matchStopBtn"
        onClick={handleBtnClick}
        btnName="Stop"
      />
    </div>
      <dialog id="selectTeamModal" class="p-3 rounded-lg bg-white max-w-max absolute justify-self-center mt-10 ">
            <div id="teamButtons">
                <button type="button" value="1" class="button bg-yellow-400">CSK</button>
                <button type="button" value="2" class="button bg-blue-500 ">MUMBAI</button>
            </div>
        </dialog>
        </>
  );
}

export default Navabar;
