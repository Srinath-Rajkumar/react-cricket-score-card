function OverUpdates({ oversData }) {
  function renderBalls(ballsArray, totalBalls = 6) {
    const tableDes = [];
    for (let i = 0; i < totalBalls; i++) {
      tableDes.push(
        <td key={i} className="p-2 border border-gray-400 text-center">
          {ballsArray[i] ?? ""}
        </td>
      );
    }
    return tableDes;
  }
  return (
    <div id="over-runs-table" className="mx-5 mt-10">
      <h3 className="text-lg font-semibold mb-3">Over update's</h3>
      <div className="flex">
        <table className="table-auto border-collapse border border-gray-400 w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border border-gray-400 text-left">Over</th>
              <th className="p-2 border border-gray-400 text-center">Ball 1</th>
              <th className="p-2 border border-gray-400 text-center">Ball 2</th>
              <th className="p-2 border border-gray-400 text-center">Ball 3</th>
              <th className="p-2 border border-gray-400 text-center">Ball 4</th>
              <th className="p-2 border border-gray-400 text-center">Ball 5</th>
              <th className="p-2 border border-gray-400 text-center">Ball 6</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(oversData).map((overNum) => (
              <tr key={overNum}>
                <td className="p-2 border border-gray-400">Over {overNum}</td>
                {renderBalls(oversData[overNum])}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OverUpdates;
