import { useState } from "react";
import type { RegisterData } from "../../../../types/auth";
import { OPTIONS } from "../../../../types/auth";

type Step4Props = {
  onNext: () => void;
  onBack: () => void;
  onChange: (data: Partial<RegisterData>) => void;
};

export const Step4 = (props: Step4Props) => {
    const { onNext, onBack, onChange } = props;
  const [selected, setSelected] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) {
      alert('Please select an option');
      return;
    }
    onChange({ lookingFor: selected });
    onNext();
  };
  return (
    <div className="auth__container">
      <a className="auth__back" onClick={onBack}><img src="/imgs/Chevron_Left_MD.svg" alt="" /> Back</a>
      <progress className="auth__progress" value={4} max={6}></progress>
      <h1 className="auth__page__title">What are you looking for?</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__radio__list">
          {OPTIONS.map((option) => (
            <label key={option} className="auth__radio__item">
              <span>{option}</span>
              <input
                type="radio"
                name="lookingFor"
                value={option}
                checked={selected === option}
                onChange={() => setSelected(option)}
              />
            </label>
          ))}
        </div>
        <button className="auth__submit auth__bottom">Next</button>
      </form>
    </div>
  );
};