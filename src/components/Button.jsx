function Button({ id, className, onClick, btnName,disabled = false }) {
  return (
    <button
      type="button"
      // className={`common-start-stop-btn ${className}`}
       className={className}
      id={id}
      onClick={onClick}
      disabled={disabled}
    >
      {btnName} Match
    </button>
  );
}
export default Button;
