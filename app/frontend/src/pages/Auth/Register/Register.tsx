//#region Imports
import { useState } from "react";
import { Step1 } from "./Steps/Step1";
import { Step2 } from "./Steps/Step2";
import { Step4 } from "./Steps/Step4";
import { Step3 } from "./Steps/Step3";
import { Step5 } from "./Steps/Step5";
import { Step6 } from "./Steps/Step6";
import { useNavigate } from "react-router-dom";

import { register } from "../../../api/auth";
import type { RegisterData } from "../../../types/auth";
//#endregion

export const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState<RegisterData>({
    username: "smth@gmail.com",
    password: "123321@OADas",
    name: "",
    city: "",
    intrestsId: [],          // front stores strings, but backend expects numbers → FIXED BELOW
    priorityIds: [],         // backend expects this field → ADDED
    lookingFor: "",
    geolocation: null,
    photo: null,
  });

  const updateRegisterData = (data: Partial<RegisterData>) => {
    setRegisterData((prev) => ({ ...prev, ...data }));
  };

  const handleFinish = async () => {
    // 🔥 BACKEND EXPECTS RegisterDto:
    // { username, password, name, city, interestIds: number[], priorityIds: number[] }

    // Convert interests from strings → numeric IDs (example: "travel" → 1)
    const convertInterest = (item: string) => {
      const map: Record<string, number> = {
        travel: 1,
        cooking: 2,
        sport: 3,
      };
      return map[item] ?? 0;
    };

    const payload = {
      username: registerData.username,
      password: registerData.password,
      name: registerData.name,
      city: registerData.city,

      // FIXED: correct name & convert to numbers
      interestIds: registerData.intrestsId.map(convertInterest),

      // FIXED: required by backend
      priorityIds: registerData.priorityIds,
    };

    const response = await register(payload);

    if (registerData.photo) {
      const formData = new FormData();
      formData.append("photo", registerData.photo);

      await fetch(`${BASE_URL}/api/user/${response.user.id}/photo`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${response.token}`,
        },
        body: formData,
      });
    }

    navigate("/mainpage");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 onNext={() => setCurrentStep(2)} onChange={updateRegisterData} />;
      case 2:
        return <Step2 onNext={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)} onChange={updateRegisterData} />;
      case 3:
        return <Step3 onNext={() => setCurrentStep(4)} onBack={() => setCurrentStep(2)} onChange={updateRegisterData} />;
      case 4:
        return <Step4 onNext={() => setCurrentStep(5)} onBack={() => setCurrentStep(3)} onChange={updateRegisterData} />;
      case 5:
        return <Step5 onNext={() => setCurrentStep(6)} onBack={() => setCurrentStep(4)} onChange={updateRegisterData} />;
      case 6:
        return <Step6 onNext={handleFinish} onBack={() => setCurrentStep(5)} onChange={updateRegisterData} />;
    }
  };

  return <div className="auth">{renderStep()}</div>;
};

