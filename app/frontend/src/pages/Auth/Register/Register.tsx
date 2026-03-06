//#region Imports
import { useState } from "react";
import { Step1 } from "./Steps/Step1";
import { Step2 } from "./Steps/Step2";
import { Step4 } from "./Steps/Step4";
import { Step3 } from "./Steps/Step3";
import { Step5 } from "./Steps/Step5";
import { Step6 } from "./Steps/Step6";
import { BASE_URL } from "../../../api/fetchClent";
import { useNavigate } from "react-router-dom";
import { register } from "../../../api/auth";

import type { RegisterData, RegisterRequest } from "../../../types/auth";
import { mapInterestKeysToIds } from "../../../types/auth";
//#endregion

export const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  // Оставляем все поля UI как просил — НИЧЕГО НЕ ВЫКИДЫВАЕМ
  const [registerData, setRegisterData] = useState<RegisterData>({
    email: "smth@gmail.com",         // TODO: удалить дефолт
    password: "123321@OADas",        // TODO: удалить дефолт
    name: "",
    city: "",
    intrestsId: [],                  // UI хранит строковые ключи интересов (напр. 'travel')
    geolocation: null,
    lookingFor: "",
    photo: null,
    prioriryIds: [],                 // как у тебя в типе (опечатка сохранена)
  });

  const updateRegisterData = (data: Partial<RegisterData>) => {
    setRegisterData((prev) => ({ ...prev, ...data }));
  };

  const handleFinish = async () => {
    // БЭКЕНД ЖДЁТ RegisterDto:
    // { username, password, name, city, interestIds: number[], priorityIds: number[] }

    // Конвертируем string-ключи интересов → числовые id
    const interestIds = mapInterestKeysToIds(registerData.intrestsId);

    // Собираем payload ИМЕННО ТАК, как нужно бэкенду
    const payload: RegisterRequest = {
      username: registerData.email,         // бэку нужен username (email/телефон)
      password: registerData.password,
      name: registerData.name,
      city: registerData.city,
      interestIds,                          // number[]
      priorityIds: registerData.prioriryIds // из UI-такого же поля (с опечаткой)
    };

    const response = await register(payload);

    // Загрузка фото (оставил функционал как был)
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
      default:
        return null;
    }
  };

  return <div className="auth">{renderStep()}</div>;
};