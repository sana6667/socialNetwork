import { useState } from 'react';
import type { RegisterData } from '../../../../types/auth';

type Step5Props = {
  onNext: () => void;
  onBack: () => void;
  onChange: (data: Partial<RegisterData>) => void;
};

type Interest = {
  id: string;
  name: string;
  icon: string;
};

export const Step5 = (props: Step5Props) => {
  const { onNext, onBack, onChange } = props;
  
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const allInterests: Interest[] = [
    { id: 'music', name: 'Music', icon: '🎵' },
    { id: 'sport', name: 'Sport', icon: '⚽' },
    { id: 'travel', name: 'Travel', icon: '✈️' },
    { id: 'cinema', name: 'Cinema', icon: '🎬' },
    { id: 'games', name: 'Games', icon: '🎮' },
    { id: 'books', name: 'Books', icon: '📚' },
    { id: 'cooking', name: 'Cooking', icon: '🍳' },
    { id: 'photo', name: 'Photography', icon: '📷' },
    { id: 'art', name: 'Art', icon: '🎨' },
    { id: 'tech', name: 'Technology', icon: '💻' },
    { id: 'fashion', name: 'Fashion', icon: '👗' },
    { id: 'pets', name: 'Pets', icon: '🐾' },
  ];

  const toggleInterest = (interestId: string) => {
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