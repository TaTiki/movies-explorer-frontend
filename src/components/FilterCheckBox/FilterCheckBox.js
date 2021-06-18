import './FilterCheckBox.css';

export default function FilterCheckBox({ isChecked, setIsChecked, disabled}) {
  return (
    <>
      <input
        checked={isChecked}
        className="react-switch__checkbox"
        type="checkbox"
        id="react-switch-new"
        onChange={() => setIsChecked(!isChecked)}
        disabled={disabled}
      />
      <label
        style={{ background: isChecked && '#06D6A0' }}
        className="react-switch__label"
        htmlFor="react-switch-new"
      >
        <span className="react-switch__button" />
      </label>
    </>
  );
}
