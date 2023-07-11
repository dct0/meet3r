import { useDatePicker } from "@rehookify/datepicker";
import { useState, type MouseEvent } from "react";
import DayButton from "./components/DayButton";
import MonthSwitcher from "./components/MonthSwitcher";
import { getDayClassName } from "./classNames";

const DatePicker = () => {
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

  const onDayClick = (evt: MouseEvent<HTMLElement>, date: Date) => {
    // In case you need any action with evt
    evt.stopPropagation();

    // In case you need any additional action with date
    console.log(date);
  };

  return (
    <section className="bg-base w-fit rounded p-4">
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
            {...dayButton(dpDay, { onClick: onDayClick })}
          >
            {dpDay.day}
          </DayButton>
        ))}
      </main>
    </section>
  );
};

export default DatePicker;
