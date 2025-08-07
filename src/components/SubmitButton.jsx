const SubmitButton = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mt-4 px-6 py-3 rounded-xl font-[Mokoto] tracking-wide bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-lg"
    >
      {label}
    </button>
  );
};

export default SubmitButton;
