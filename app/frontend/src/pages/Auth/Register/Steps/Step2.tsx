import { useState } from "react";
import type { RegisterData } from "../../../../types/auth";

type Step2Props = {
  onNext: () => void;
  onBack: () => void;
  onChange: (data: Partial<RegisterData>) => void;
};


export const Step2 = (props: Step2Props) => {
  const { onNext, onBack, onChange } = props;
  const [city, setCity] = useState('');

  const hadleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim() === '') {
      alert('Please enter your city');
      return;
    }
    onChange({ city });
    onNext();
  };
  return (
    <div className="auth__container">
      <a className="auth__back" onClick={onBack}><img src="/imgs/Chevron_Left_MD.svg" alt="" /> Back</a>
      <progress className="auth__progress" value={2} max={6}></progress>
      <h1 className="auth__page__title">
        Which city do you live in?
      </h1>
      <form action="" className="auth__form" onSubmit={hadleSubmit}>
        <div className="auth__input__container">
          <input value={city} type="text" className="auth__input__field" placeholder="City" id="auth-city" onChange={(e) => setCity(e.target.value)}/>
        </div>

        <button className="auth__submit auth__bottom">Next</button>
      </form>
    </div>
  );
}