function BowlerScoreCard({ bowlerName, over=0, wicket=0, run }) {
  return (
    <div id="score-table-bowling" className="mx-5 mt-10">
      <div className="flex">
        <table className="table-auto border-collapse border border-gray-400 w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border border-gray-400 text-left min-w-40">
                Bowler
              </th>
              <th className="table-head">O</th>
              <th className="table-head">W</th>
              <th className="table-head">R</th>
            </tr>
          </thead>
          <tbody id="score-card-body-bowl">
            <tr>
              <td className="p-2 border border-gray-400" id="bowler-name-table">
                {bowlerName}
              </td>
              <td className="table-row-right" id="table-bowler-over">
                {over}
              </td>
              <td className="table-row-right" id="table-bowler-wicket">
                {wicket}
              </td>
              <td className="table-row-right">
                <span id="table-bowler-run">{run}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default BowlerScoreCard;
