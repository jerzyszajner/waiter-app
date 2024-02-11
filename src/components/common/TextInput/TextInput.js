const TextInput = ({ value, onChange, className }) => {
  return (
    <input
      className={className} // Apply className prop
      type="number"
      value={value}
      onChange={onChange}
    />
  );
};

export default TextInput;