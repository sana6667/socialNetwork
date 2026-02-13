import { useState } from "react";
import { Step1 } from "./Steps/Step1";
import { Step2 } from "./Steps/Step2";
import { Step3 } from "./Steps/Step3";

export const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const newStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      default:
        return <h1>Unknown Step</h1>;
    }
  };
  return (
  <div className="Register-container">
    {renderStep()}
    <button onClick={prevStep} disabled={currentStep === 1}>
      Previous
    </button>
    <button onClick={newStep} disabled={currentStep === 3}>
      Next
    </button>
  </div>
  );
};