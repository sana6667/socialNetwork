import { useState } from "react";
import type { RegisterData } from "../../../../types/auth";

type Step3Props = {
  onNext: () => void;
  onChange: (data: Partial<RegisterData>) => void;
};

export const Step1 = (props: Step3Props) => {
  const { onNext, onChange } = props;
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === '') {
      alert('Please enter your name');
      return;
    }
    onChange({ username });
    onNext();
  }
  return (
    <div className="auth__container">
      <a onClick={() => window.history.back()} className="auth__back"><img src="/imgs/Chevron_Left_MD.svg" alt="" /> Back</a>
      <progress className="auth__progress" value={1} max={8}></progress>
      <h1 className="auth__page__title">
        What’s your name?
      </h1>
      <form action="" className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__input__container">
          <input value={username} type="email" className="auth__input__field" placeholder="Name" id="auth-name" onChange={(e) => setUsername(e.target.value)}/>
        </div>

        <button className="auth__submit auth__bottom">Next</button>
      </form>
    </div>
  );
}