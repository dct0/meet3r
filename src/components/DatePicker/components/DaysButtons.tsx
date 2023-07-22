import type {
  DPCalendar,
  DPDay,
  DPPropGetter,
  DPPropsGetterConfig,
} from "@rehookify/datepicker";
import type { RefObject } from "react";
import { useEffect } from "react";
import type { DSCallback } from "~/hooks/useDragSelect";
import { useDragSelect } from "~/hooks/useDragSelect";
import { getDayClassName } from "../classNames";
import DayButton from "./DayButton";

interface DayButtonsProps {
  calendar: DPCalendar;
  daysRef: RefObject<HTMLElement>;
  dayButton: (
    day: DPDay,
    config?: DPPropsGetterConfig | undefined
  ) => DPPropGetter;
  selectedDates: Date[];
  onDatesChange: (dates: Date[]) => void;
}

const DayButtons = ({
  calendar,
  daysRef,
  dayButton,
  selectedDates,
  onDatesChange,
}: DayButtonsProps) => {
  const ds = useDragSelect();

  useEffect(() => {
    const id = ds?.subscribe("callback", (e: DSCallback) => {
      const newState = e.items.reduce((acc, item) => {
        const date = new Date(item.dataset.date as string);

        if (selectedDates.some((d) => d.getTime() === date.getTime())) {
          acc.splice(
            acc.findIndex((d) => d.getTime() === date.getTime()),
            1
          );
        } else {
          acc.push(date);
        }

        return acc;
      }, selectedDates);

      onDatesChange(newState.sort((a, b) => a.getTime() - b.getTime()));
    });

    return () => {
      ds?.unsubscribe("callback", undefined, id);
    };
  }, [ds, selectedDates, onDatesChange]);

  return (
    <section
      className="mb-2 grid grid-cols-7 justify-items-center gap-y-2"
      ref={daysRef}
    >
      {calendar.days.map((dpDay) => (
        <DayButton
          className={getDayClassName("w-8", dpDay)}
          key={dpDay.$date.getTime()}
          {...dayButton(dpDay)}
          data-date={dpDay.$date}
          onClick={undefined} // disable the default onClick passed by dayButton() so we can drag
        >
          {dpDay.day}
        </DayButton>
      ))}
    </section>
  );
};

export default DayButtons;
