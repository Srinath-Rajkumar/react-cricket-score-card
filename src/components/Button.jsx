function Button({ id, className, onClick, disabled = false, children }) {
  return (
    <button
      type="button"
      className={className}
      id={id}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
export default Button;
