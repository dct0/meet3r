import type { DPPropGetter } from "@rehookify/datepicker";
import clsx from "clsx";
import type { PropsWithChildren } from "react";
import { useEffect, useRef } from "react";
import { useDragSelect } from "~/hooks/useDragSelect";

interface DayButtonProps extends DPPropGetter {
  className?: string;
}

const DayButton = ({
  children,
  className,
  ...props
}: PropsWithChildren<DayButtonProps>) => {
  const ds = useDragSelect();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const element = buttonRef.current;
    if (!element || !ds) return;
    ds.addSelectables(element);
  }, [ds, buttonRef]);

  return (
    <button
      className={clsx(
        "rounded p-1 text-base-content hover:bg-base-200",
        className
      )}
      ref={buttonRef}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

export default DayButton;
