import { useDatePicker } from "@rehookify/datepicker";
import clsx from "clsx";
import { useEffect, useState } from "react";
import type {
  FieldValues,
  Path,
  PathValue,
  UseControllerProps,
} from "react-hook-form";
import { useController } from "react-hook-form";
import { getDayClassName } from "./classNames";
import DayButton from "./components/DayButton";
import MonthSwitcher from "./components/MonthSwitcher";

interface DatePickerProps<T extends FieldValues> extends UseControllerProps<T> {
  className?: string;
}

const DatePicker = <T extends FieldValues>({
  className,
  ...props
}: DatePickerProps<T>) => {
  const { field } = useController(props);

  const [selectedDates, onDatesChange] = useState<Date[]>([]);
  const {
    data: { weekDays, calendars },
    propGetters: { dayButton, previousMonthButton, nextMonthButton },
  } = useDatePicker({
    selectedDates,
    onDatesChange,
    dates: {
      mode: "multiple",
      toggle: true,
    },
    calendar: {
      startDay: 1,
      offsets: [-1],
    },
    locale: {
      day: "numeric",
    },
  });

  // calendars[0] is always present, this is an initial calendar
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const calendar = calendars[0]!;

  useEffect(() => {
    // field must be a Date[]
    field.onChange(selectedDates as PathValue<T, Path<T>>);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDates]);

  return (
    <section className={clsx("bg-base w-fit rounded p-4", className)}>
      <MonthSwitcher
        previousMonthProps={previousMonthButton()}
        nextMonthProps={nextMonthButton()}
        calendar={calendar}
      />
      <ul className="mb-2 grid h-10 grid-cols-7 items-center gap-y-2">
        {weekDays.map((day) => (
          <li className="text-center text-xs" key={`${calendar.month}-${day}`}>
            {day}
          </li>
        ))}
      </ul>
      <main className="grid grid-cols-7 justify-items-center gap-y-2">
        {calendar.days.map((dpDay) => (
          <DayButton
            className={getDayClassName("w-8", dpDay)}
            key={dpDay.$date.toDateString()}
            {...dayButton(dpDay)}
          >
            {dpDay.day}
          </DayButton>
        ))}
      </main>
    </section>
  );
};

export default DatePicker;
