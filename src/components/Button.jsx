export default function Button({ text, onClick, disabled }) {
  return (
    <button
      className="btn f6 link dim br2 ba ph3 pv2 black bg-white"
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {text}
    </button>
  );
}
