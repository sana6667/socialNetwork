import { useState } from "react";
import type { RegisterData } from "../../../../types/auth";

type Step2Props = {
  onNext: () => void;
  onBack: () => void;
  onChange: (data: Partial<RegisterData>) => void;
};

export const Step2 = (props: Step2Props) => {
  const { onNext, onChange, onBack } = props;
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === '') {
      alert('Please enter your name');
      return;
    }
    onChange({ password });
    onNext();
  }
  return (
    <div className="auth__container">
      <a onClick={onBack} className="auth__back"><img src="/imgs/Chevron_Left_MD.svg" alt="" /> Back</a>
      <progress className="auth__progress" value={2} max={8}></progress>
      <h1 className="auth__page__title">
        What’s your name?
      </h1>
      <form action="" className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__input__container">
          <input value={password} type="password" className="auth__input__field" placeholder="password" id="auth-password" onChange={(e) => setPassword(e.target.value)}/>
        </div>

        <button className="auth__submit auth__bottom">Next</button>
      </form>
    </div>
  );
}