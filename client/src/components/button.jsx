const Button = ({ text }) => {
  return (
    <button
      type="submit"
      className="bg-blue-900 text-white py-2.5 rounded-md text-lg font-medium"
    >
      {text}
    </button>
  );
};

export default Button;
