import type { DPPropGetter } from "@rehookify/datepicker";
import clsx from "clsx";
import type { PropsWithChildren } from "react";

interface DayButtonProps extends DPPropGetter {
  className?: string;
}

const DayButton = ({
  children,
  className,
  ...props
}: PropsWithChildren<DayButtonProps>) => {
  return (
    <button
      className={clsx(
        "rounded p-1 text-base-content hover:bg-base-200",
        className
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

export default DayButton;
