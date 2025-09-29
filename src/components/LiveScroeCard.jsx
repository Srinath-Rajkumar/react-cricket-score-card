function LiveScoreCard({ run = 0, wicket = 0, over = 0}) {
  return (
    <div id="live-score" className="m-5">
      <div className="flex justify-center items-center">
        <p className="font-semibold text-2xl">
          <span id="runs">{run}</span> / <span id="wickets">{wicket}</span>{" "}
        </p>
        <p className="ml-1">
          {" "}
          (<span id="overs">{over}</span>)
        </p>
        <p id="currentRunRate" className="place-items-end text-xs ml-1.5"></p>
      </div>
    </div>
  );
}
export default LiveScoreCard;
