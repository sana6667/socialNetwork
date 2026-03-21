//#region Imports
import { useState } from "react";
import { BASE_URL } from "../../../api/fetchClent";
import { register } from "../../../api/auth";
import { useNavigate } from "react-router-dom";
import type { RegisterData, RegisterRequest } from "../../../types/auth";
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
  const trueFinish = false // place true if u need test code on server
  const [registerData, setRegisterData] = useState<RegisterData>({
    email: '',
    password: '',
    name: '',
    city: '',
    intrestsId: [],
    lookingFor: '',
    geolocation: null,
    photo: null,
  });

  const handleFinish = async () => {
    const data: RegisterRequest = {
      email: registerData.email,
      password: registerData.password,
      name: registerData.name,
      city: registerData.city,
      intrestsId: registerData.intrestsId,
      lookingFor: registerData.lookingFor,
      geolocation: registerData.geolocation,
    };

    const response = await register(data);

    if (registerData.photo) {
      const formData = new FormData();
      formData.append('photo', registerData.photo);

      await fetch(`${BASE_URL}/api/user/${response.user.id}/photo`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${response.token}`,
        },
        body: formData,
      });
    }

    navigate('/');
  };

  const handleFinishMock = () => {
    console.log('Mock register data:', registerData);
    navigate('/');
  };

  const chooseFinish = trueFinish ? handleFinish : handleFinishMock;

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
        return <Step8 onNext={chooseFinish} onBack={() => setCurrentStep(5)} onChange={updateRegisterData}/>;
    }
  };
  return (
  <div className="auth">
    {renderStep()}
  </div>  
  );
};