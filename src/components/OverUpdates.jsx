function OverUpdates() {
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
          <tbody id="over-runs-body"></tbody>
        </table>
      </div>
    </div>
  );
}

export default OverUpdates;
