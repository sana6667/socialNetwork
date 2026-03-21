/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
// src/context/DrawerContext.tsx
import { createContext, useContext, useState } from "react";
import classNames from 'classnames';
import { DrawerContent } from "../assets/DrawerContent/DraverContent";
// Типы
interface DrawerContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

// контекст
const DrawerContext = createContext<DrawerContextType | null>(null);

// Провайдер — здесь вся логика и UI дровера
export function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DrawerContext.Provider value={{
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }}>
      {children}

      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}
      <div className={`drawer ${isOpen ? 'open' : ''}`}>
        <DrawerContent />
      </div>
    </DrawerContext.Provider>
  );
}

// Хук для удобного использования
export function useDrawer() {
  const context = useContext(DrawerContext);
  if (!context) throw new Error("useDrawer must be used within DrawerProvider");
  return context;
}