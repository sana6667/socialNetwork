import { useState, useRef } from "react";
import type { RegisterData } from "../../../../types/auth";

type Step6Props = {
  onNext: () => void;
  onBack: () => void;
  onChange: (data: Partial<RegisterData>) => void;
};

export const Step6 = (props: Step6Props) => {
  const { onNext, onBack, onChange } = props;
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange({ photo: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="auth__container">
      <a className="auth__back" onClick={onBack}><img src="/imgs/Chevron_Left_MD.svg" alt="" /> Back</a>
      <progress className="auth__progress" value={6} max={6}></progress>
      <h1 className="auth__page__title">Add your photo to profile</h1>
      <p className="auth__subtitle">
        Your photos helps other people see who you are and feel more comfortable starting a conversation
      </p>
      <form className="auth__form__photo" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <img
          className="auth__photo"
          src={preview ?? "/imgs/Group 142.svg"}
          alt="Photo"
        />

        <button type="button" className="auth__addPhoto" onClick={() => inputRef.current?.click()}>
          Add Photo
        </button>

        <button className="auth__submit auth__bottom">Done</button>
      </form>
      <p className="auth__subtitle">
        Choose a pictures where your face is well-lit and easy to see, without sunglasses or anything covering it. Make sure it's just you in the photo.
      </p>
    </div>
  );
};