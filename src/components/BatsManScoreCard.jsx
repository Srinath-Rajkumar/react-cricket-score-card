function BatsManScoreCard({ batsman1, batsman2, currentStriker }) {
  return (
    <div id="score-table-batting" className="mx-5">
      <div className="flex">
        <table className="table-auto border-collapse border border-gray-400 w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border border-gray-400 text-left min-w-40">
                Batter
              </th>
              <th className="p-2 border border-gray-400 text-left">
                Dismissal
              </th>
              <th className="table-head">R</th>
              <th className="table-head">B</th>
              <th className="table-head">4s</th>
              <th className="table-head">6s</th>
            </tr>
          </thead>
          <tbody id="score-card-body">
            <tr id="batman-1">
              {/* <td className="p-2 border border-gray-400">{batsman1.name}</td> */}
              <td className="p-2 border border-gray-400" id="table-player2-name">
                {batsman1.name}
                <span>{currentStriker === 1 ? "*" : ""}</span>
              </td>
              <td className="p-2 border border-gray-400">{batsman1.status}</td>
              <td className="table-row-right" id="table-player-run">
                {batsman1.runs}
              </td>
              <td className="table-row-right">
                <span id="table-no-of-balls">{batsman1.balls}</span>
              </td>
              <td className="table-row-right" id="table-player-fours">
                {batsman1.fours}
              </td>
              <td className="table-row-right" id="table-player-sixes">
                {batsman1.sixes}
              </td>
            </tr>
            <tr id="batman-2">
              <td className="p-2 border border-gray-400">
                {batsman2.name}
                <span>{currentStriker === 2 ? "*" : ""}</span>
              </td>
              <td className="p-2 border border-gray-400">{batsman2.status}</td>
              <td className="table-row-right" id="table-player2-run">
                {batsman2.runs}
              </td>
              <td className="table-row-right">
                <span id="table-player2-balls">{batsman2.balls}</span>
              </td>
              <td className="table-row-right" id="table-player2-fours">
                {batsman2.fours}
              </td>
              <td className="table-row-right" id="table-player2-sixes">
                {batsman2.sixes}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default BatsManScoreCard;
