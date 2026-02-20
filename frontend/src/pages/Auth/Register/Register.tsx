import { useState } from "react";
import { Step1 } from "./Steps/Step1";
import { Step2 } from "./Steps/Step2";
import { Step4 } from "./Steps/Step4";
import { Step3 } from "./Steps/Step3";

export const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 onNext={() => setCurrentStep(2)}/>;
      case 2:
        return <Step2 onNext={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)}/>;
      case 3:
        return <Step3 onNext={() => setCurrentStep(4)} onBack={() => setCurrentStep(2)}/>;
      case 4:
        return <Step4 onNext={() => setCurrentStep(5)} onBack={() => setCurrentStep(3)}/>;
      default:
        return <h1>Unknown Step</h1>;
    }
  };
  return (
  <div className="auth">
    {renderStep()}
  </div>
  );
};