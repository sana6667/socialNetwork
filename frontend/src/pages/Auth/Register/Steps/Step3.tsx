type Step3Props = {
  onNext: () => void;
  onBack: () => void;
};


export const Step3 = (props: Step3Props) => {
  const { onNext, onBack } = props;
  return (
    <div className="auth__container">
      <p className="auth__back" onClick={onBack}><img src="/imgs/Chevron_Left_MD.svg" alt="" /> Back</p>
      <progress className="auth__progress" value={2} max={4}></progress>
      <h1 className="auth__page__title">
        Which city do you live in?
      </h1>
      <form action="" className="auth__form" onSubmit={onNext}>
        <div className="auth__input__container">
          <input type="text" className="auth__input__field" placeholder="City" id="auth-city"/>
        </div>

        <button className="auth__submit auth__bottom">Next</button>
      </form>
    </div>
  );
}