//#region Imports
import { useState } from "react";
import { registerFormData } from "../../../api/auth";
import { useNavigate } from "react-router-dom";
import type { RegisterData } from "../../../types/auth";
import { Step3 } from "./Steps/Step3";
import { Step4 } from "./Steps/Step4";
import { Step5 } from "./Steps/Step5";
import { Step8 } from "./Steps/Step8";
import { Step7 } from "./Steps/Step7";
import { Step6 } from "./Steps/Step6";
import { Step2 } from "./Steps/Step2";
import { Step1 } from "./Steps/Step1";
//#endregion

export const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState<RegisterData>({
    username: '',
    password: '',
    city: '',
    name: '',
    intrestsId: [],
    lookingForId: 0,
    Latitude: 0,
    Longitude: 0,
    photo: null,
  });

  const handleFinish = async () => {
    const formData = new FormData();

    formData.append('Username', registerData.username);
    formData.append('Password', registerData.password);
    formData.append('Name', registerData.name);
    formData.append('City', registerData.city);

    formData.append('Latitude', registerData.Latitude.toFixed(6));
    formData.append('Longitude', registerData.Longitude.toFixed(6));
    

    registerData.intrestsId.forEach(id => {
      formData.append('InterestIds', String(id));
    });

    formData.append('PriorityIds', String(registerData.lookingForId));

    if (registerData.photo) {
      formData.append('Image', registerData.photo);
    }

    const response = await registerFormData(formData);
    console.log('Server response:', response);
    navigate('/');
  };

  const updateRegisterData = (data: Partial<RegisterData>) => {
    setRegisterData(prev => ({ ...prev, ...data }));
  }



  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 onNext={() => setCurrentStep(2)} onChange={updateRegisterData}/>;
      case 2:
        return <Step2 onNext={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)} onChange={updateRegisterData}/>;
      case 3:
        return <Step3 onNext={() => setCurrentStep(4)} onBack={() => setCurrentStep(2)} onChange={updateRegisterData}/>;
      case 4:
        return <Step4 onNext={() => setCurrentStep(5)} onBack={() => setCurrentStep(3)} onChange={updateRegisterData}/>;
      case 5:
        return <Step5 onNext={() => setCurrentStep(6)} onBack={() => setCurrentStep(4)} onChange={updateRegisterData}/>;
      case 6:
        return <Step6 onNext={() => setCurrentStep(7)} onBack={() => setCurrentStep(5)} onChange={updateRegisterData}/>;
      case 7:
        return <Step7 onNext={() => setCurrentStep(8)} onBack={() => setCurrentStep(6)} onChange={updateRegisterData}/>;
      case 8:
        return <Step8 onNext={handleFinish} onBack={() => setCurrentStep(5)} onChange={updateRegisterData}/>;
    }
  };
  return (
  <div className="auth">
    {renderStep()}
  </div>  
  );
};