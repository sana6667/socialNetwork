import { DrawerProvider } from "./DrawerProvider";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <DrawerProvider>
      {children}
    </DrawerProvider>
  );
}