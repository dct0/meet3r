import type { PropsWithChildren } from "react";

interface FieldErrorProps {
  name: string;
}

const FieldError = ({ name, children }: PropsWithChildren<FieldErrorProps>) => {
  return (
    <span id={`${name}-error`} role="alert">
      {children}
    </span>
  );
};

export default FieldError;
