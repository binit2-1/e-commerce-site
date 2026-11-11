import type { ReactNode } from "react";

const Container = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-page px-4 xl:px-0 ${className}`}>{children}</div>
);

export default Container;
