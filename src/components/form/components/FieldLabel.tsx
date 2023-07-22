import type { PropsWithChildren } from "react";

interface FieldLabelProps {
  htmlFor?: string;
  required?: boolean;
}

const FieldLabel = ({
  htmlFor,
  required,
  children,
}: PropsWithChildren<FieldLabelProps>) => {
  return (
    <label className="label" htmlFor={htmlFor}>
      <span className="label-text">
        {children}
        {required && <span className="font-bold text-primary">*</span>}
      </span>
    </label>
  );
};

export default FieldLabel;
