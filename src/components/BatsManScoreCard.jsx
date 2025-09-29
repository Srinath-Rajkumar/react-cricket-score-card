function BatsManScoreCard() {
  return (
    <div id="score-table-batting" className="mx-5">
      <div className="flex">
        <table className="table-auto border-collapse border border-gray-400 w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border border-gray-400 text-left min-w-40">
                Batter
              </th>
              <th className="p-2 border border-gray-400 text-left">Dismissal</th>
              <th className="table-head">R</th>
              <th className="table-head">B</th>
              <th className="table-head">4s</th>
              <th className="table-head">6s</th>
            </tr>
          </thead>
          <tbody id="score-card-body">
            <tr id="batman-1">
              <td className="p-2 border border-gray-400">NA</td>
              <td className="p-2 border border-gray-400">NA</td>
              <td className="table-row-right" id="table-player-run">
                0
              </td>
              <td className="table-row-right">
                <span id="table-no-of-balls">0</span>
              </td>
              <td className="table-row-right" id="table-player-fours">
                0
              </td>
              <td className="table-row-right" id="table-player-sixes">
                0
              </td>
            </tr>
            <tr id="batman-2">
              <td className="p-2 border border-gray-400">NA</td>
              <td className="p-2 border border-gray-400">NA</td>
              <td className="table-row-right" id="table-player2-run">
                0
              </td>
              <td className="table-row-right">
                <span id="table-player2-balls">0</span>
              </td>
              <td className="table-row-right" id="table-player2-fours">
                0
              </td>
              <td className="table-row-right" id="table-player2-sixes">
                0
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default BatsManScoreCard;
