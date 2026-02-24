type Step1Props = {
  onNext: () => void;
};

export const Step1 = (props: Step1Props) => {
  const { onNext } = props;
  return (
    <div className="auth__container">
      <a onClick={() => window.history.back()} className="auth__back"><img src="/imgs/Chevron_Left_MD.svg" alt="" /> Back</a>
      <progress className="auth__progress" value={1} max={6}></progress>
      <h1 className="auth__page__title">
        What’s your name?
      </h1>
      <form action="" className="auth__form" onSubmit={onNext}>
        <div className="auth__input__container">
          <input type="text" className="auth__input__field" placeholder="Name" id="auth-name"/>
        </div>

        <button className="auth__submit auth__bottom">Next</button>
      </form>
    </div>
  );
}