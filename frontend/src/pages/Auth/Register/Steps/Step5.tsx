import { useState } from "react";
import type { RegisterData } from "../../../../types/auth";

type Step5Props = {
  onNext: () => void;
  onBack: () => void;
  onChange: (data: Partial<RegisterData>) => void;
};


export const Step5 = (props: Step5Props) => {
  const { onNext, onBack, onChange } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAllow = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        onChange({
          geolocation: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
        });
        setLoading(false);
        onNext();
      },
      () => {
        setError('Could not get location. Please allow access.');
        setLoading(false);
      }
    );
  };
  return (
    <div className="auth__container">
      <a className="auth__back" onClick={onBack}><img src="/imgs/Chevron_Left_MD.svg" alt="" /> Back</a>
      <progress className="auth__progress" value={5} max={6}></progress>
      <h1 className="auth__page__title">You're almost there!</h1>
      <p>We've found 1,459 people with similar interests who are looking for a place to stay.</p>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={handleAllow} disabled={loading} className="auth__submit auth__bottom">
        {loading ? 'Getting location...' : 'Next'}
      </button>
    </div>
  );
}