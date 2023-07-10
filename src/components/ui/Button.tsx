import type {
  HTMLAttributes,
  MouseEventHandler,
  PropsWithChildren,
} from "react";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  type = "button",
  onClick,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      {...props}
      className={`btn ${props.className ?? ""}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
