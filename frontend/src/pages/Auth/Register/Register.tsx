/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Step1 } from "./Steps/Step1";
import { Step2 } from "./Steps/Step2";
import { Step4 } from "./Steps/Step4";
import { Step3 } from "./Steps/Step3";
import type { RegisterData } from "../../../types/auth";
import { Step5 } from "./Steps/Step5";
import { Step6 } from "./Steps/Step6";

export const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [registerData, setRegisterData] = useState<RegisterData>({
    name: '',
    city: '',
    intrests: [],
    photo: null,
  });

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
      case 5:
        return <Step5 onNext={() => setCurrentStep(6)} onBack={() => setCurrentStep(4)}/>;
      case 6:
        return <Step6 onNext={() => setCurrentStep(7)} onBack={() => setCurrentStep(5)}/>;
    }
  };
  return (
  <div className="auth">
    {renderStep()}
  </div>
  );
};