"use client";
import { ProgressProvider } from "@bprogress/next/app";

export const Providers = ({ children }) => {
  return (
    <ProgressProvider height="2px" color="#cd5632" options={{ showSpinner: false }} shallowRouting>
      {children}
    </ProgressProvider>
  );
};
