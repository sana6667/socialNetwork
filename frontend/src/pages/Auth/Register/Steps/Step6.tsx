import { useState } from "react";
import type { RegisterData } from "../../../../types/auth";
import { OPTIONS } from "../../../../types/auth";

type Step6Props = {
  onNext: () => void;
  onBack: () => void;
  onChange: (data: Partial<RegisterData>) => void;
};

export const Step6 = (props: Step6Props) => {
    const { onNext, onBack, onChange } = props;
  const [selected, setSelected] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) {
      alert('Please select an option');
      return;
    }
    onChange({ lookingForId: selected });
    onNext();
  };

  return (
    <div className="auth__container">
      <a className="auth__back" onClick={onBack}><img src="/imgs/Chevron_Left_MD.svg" alt="" /> Back</a>
      <progress className="auth__progress" value={6} max={8}></progress>
      <h1 className="auth__page__title">What are you looking for?</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__radio__list">
          {OPTIONS.map((option) => (
            <label key={option.id} className="auth__radio__item">
              <span>{option.value}</span>
              <input
                type="radio"
                name="lookingFor"
                value={option.value}
                className="auth__radio_check"
                checked={selected === option.id}
                onChange={() => setSelected(option.id)}
              />
            </label>
          ))}
        </div>
        <button className="auth__submit auth__bottom">Next</button>
      </form>
    </div>
  );
};