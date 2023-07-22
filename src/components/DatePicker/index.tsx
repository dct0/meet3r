import { useDatePicker } from "@rehookify/datepicker";
import clsx from "clsx";
import { useRef, useState } from "react";
import type {
  FieldValues,
  Path,
  PathValue,
  UseControllerProps,
} from "react-hook-form";
import { useController } from "react-hook-form";
import { DragSelectProvider } from "~/hooks/useDragSelect";
import FieldError from "../form/components/FieldError";
import DayButtons from "./components/DaysButtons";
import MonthSwitcher from "./components/MonthSwitcher";

interface DatePickerProps<T extends FieldValues> extends UseControllerProps<T> {
  className?: string;
}
const DatePicker = <T extends FieldValues>({
  className,
  ...props
}: DatePickerProps<T>) => {
  const daysRef = useRef<HTMLElement>(null);
  const { field, fieldState } = useController(props);

  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const onDatesChange = (dates: Date[]) => {
    setSelectedDates(dates);
    field.onChange(dates as PathValue<T, Path<T>>);
  };

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

  return (
    <>
      <article
        className={clsx(
          "bg-base field-container flex w-fit select-none flex-col gap-2 p-4 shadow",
          className
        )}
        id={props.name}
      >
        <div>
          <MonthSwitcher
            previousMonthProps={previousMonthButton()}
            nextMonthProps={nextMonthButton()}
            calendar={calendar}
          />
          <ul className="grid h-10 grid-cols-7 items-center gap-y-2">
            {weekDays.map((day) => (
              <li
                className="text-center text-xs"
                key={`${calendar.month}-${day}`}
              >
                {day}
              </li>
            ))}
          </ul>
        </div>
        <DragSelectProvider
          settings={{ draggability: false, area: daysRef.current ?? undefined }}
        >
          <DayButtons
            calendar={calendar}
            daysRef={daysRef}
            dayButton={dayButton}
            selectedDates={selectedDates}
            onDatesChange={onDatesChange}
          />
        </DragSelectProvider>
      </article>
      {fieldState.error && (
        <FieldError name={props.name}>{fieldState.error.message}</FieldError>
      )}
    </>
  );
};

export default DatePicker;
