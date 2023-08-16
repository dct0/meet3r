import clsx from "clsx";
import type { HTMLAttributes, PropsWithChildren } from "react";

type BadgeProps = HTMLAttributes<HTMLDivElement>;

const Badge = ({ children, ...props }: PropsWithChildren<BadgeProps>) => {
  return (
    <div {...props} className={clsx("badge", props.className)}>
      {children}
    </div>
  );
};

export default Badge;
