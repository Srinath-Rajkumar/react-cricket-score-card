function DisplayMsg({ errorMsg, successMsg }) {
  return (
    <>
      {errorMsg && (
        <p id="error" className="text-red-500 text-center font-semibold">
          {errorMsg}
        </p>
      )}
      {successMsg && (
        <p id="successMsg" className="text-green-500 text-center font-semibold">
          {successMsg}
        </p>
      )}
    </>
  );
}
export default DisplayMsg;
