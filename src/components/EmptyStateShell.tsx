import { ReactNode } from "react";

const EmptyStateShell = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full flex flex-col items-center pt-20">{children}</div>
  );
};

export default EmptyStateShell;
