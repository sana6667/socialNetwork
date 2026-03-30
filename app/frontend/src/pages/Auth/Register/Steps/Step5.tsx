import { useState } from 'react';
import type { RegisterData } from '../../../../types/auth';

type Step5Props = {
  onNext: () => void;
  onBack: () => void;
  onChange: (data: Partial<RegisterData>) => void;
};

type Interest = {
  id: number;
  name: string;
  icon: string;
};

export const Step5 = (props: Step5Props) => {
  const { onNext, onBack, onChange } = props;
  
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);

  const allInterests: Interest[] = [
    { id: 1, name: 'Music', icon: '🎵' },
    { id: 2, name: 'Sport', icon: '⚽' },
    { id: 3, name: 'Travel', icon: '✈️' },
    { id: 4, name: 'Cinema', icon: '🎬' },
    { id: 5, name: 'Games', icon: '🎮' },
    { id: 6, name: 'Books', icon: '📚' },
    { id: 7, name: 'Cooking', icon: '🍳' },
    { id: 8, name: 'Photography', icon: '📷' },
    { id: 9, name: 'Art', icon: '🎨' },
    { id: 10, name: 'Technology', icon: '💻' },
    { id: 11, name: 'Fashion', icon: '👗' },
    { id: 12, name: 'Pets', icon: '🐾' },
  ];

  const toggleInterest = (interestId: number) => {
    if (selectedInterests.includes(interestId)) {
      setSelectedInterests(selectedInterests.filter(id => id !== interestId));
    } else {
      setSelectedInterests([...selectedInterests, interestId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedInterests.length === 0) {
      alert('Please select at least one interest');
      return;
    }
    onChange({ intrestsId: selectedInterests });
    onNext();
  };

  return (
    <div className="auth__container">
      <a className="auth__back" onClick={onBack}><img src="/imgs/Chevron_Left_MD.svg" alt="" /> Back</a>
      <progress className="auth__progress" value={5} max={8}></progress>
      <h1 className="auth__page__title">
        What your interest?
      </h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        
        <div className="auth__interests__grid">
          {allInterests.map(interest => (
            <button
              key={interest.id}
              type="button"
              onClick={() => toggleInterest(interest.id)}
              className={`auth__interest__item ${selectedInterests.includes(interest.id) ? 'auth__interest__item--selected' : ''}`}
            >
              <span className="auth__interest__icon">{interest.icon}</span>
              <span className="auth__interest__name">{interest.name}</span>
            </button>
          ))}
        </div>

        <button className="auth__submit auth__bottom">Next</button>
      </form>
    </div>
  );
}