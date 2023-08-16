import clsx from "clsx";
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
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button {...props} className={clsx("btn", props.className)} type={type}>
      {children}
    </button>
  );
};

export default Button;
