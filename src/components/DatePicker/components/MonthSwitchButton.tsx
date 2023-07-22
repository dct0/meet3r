import type { DPPropGetter } from "@rehookify/datepicker";
import type { PropsWithChildren } from "react";

type MonthSwitchButtonProps = DPPropGetter;

const MonthSwitchButton = ({
  children,
  ...props
}: PropsWithChildren<MonthSwitchButtonProps>) => {
  return (
    <button
      className="flex h-10 items-center justify-center rounded text-base-content hover:bg-base-200 disabled:cursor-not-allowed disabled:opacity-50"
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

export default MonthSwitchButton;
