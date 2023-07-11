import type { DPDay } from "@rehookify/datepicker";
import clsx from "clsx";

export const getDayClassName = (
  className: string,
  { selected, disabled, inCurrentMonth, now }: DPDay
) =>
  clsx(className, {
    "bg-accent hover:bg-accent-focus text-accent-content opacity-100": selected,
    "opacity-25 cursor-not-allowed": disabled,
    "opacity-50": !inCurrentMonth,
    "border border-accent": now,
  });
