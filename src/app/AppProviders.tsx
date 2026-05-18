import type { PropsWithChildren } from "react";
import { AppStateProvider } from "../hooks/useAppState";

export function AppProviders({ children }: PropsWithChildren) {
  return <AppStateProvider>{children}</AppStateProvider>;
}

