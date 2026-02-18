type Step3Props = {
  onNext: () => void;
  onBack: () => void;
};


export const Step5 = (props: Step3Props) => {
  const { onNext, onBack } = props;
  return (
    <div className="auth__container">
      <p className="auth__back" onClick={onBack}><img src="/imgs/Chevron_Left_MD.svg" alt="" /> Back</p>
      <progress className="auth__progress" value={4} max={4}></progress>
      <h1 className="auth__page__title">
        Add your photo to profile
      </h1>
      <p className="auth__subtitle">
        Your photos helps other people see who you are and feel more comfortable starting a conversation 
      </p>
      <form action="" className="auth__form__photo" onSubmit={onNext}>
        {/*src поменять на нормальное когда будет*/}
        <img className="auth__photo" src="/imgs/Google.svg" alt="Photo" /> 

        <button className="auth__addPhoto">Add Photo</button>

        <button className="auth__submit auth__bottom">Next</button>
      </form>

      <p className="auth__subtitle">
        Choose a pictures where your face is well-lit and easy to see, without sunglasses or anything covering it. Make sure it’s just you in the photo.
      </p>
    </div>
  );
}