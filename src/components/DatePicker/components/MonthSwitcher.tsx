import type { DPCalendar, DPPropGetter } from "@rehookify/datepicker";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import MonthSwitchButton from "./MonthSwitchButton";

interface MonthSwitcherProps {
  previousMonthProps: DPPropGetter;
  nextMonthProps: DPPropGetter;
  calendar: DPCalendar;
}

const MonthSwitcher = ({
  previousMonthProps,
  nextMonthProps,
  calendar: { year, month },
}: MonthSwitcherProps) => {
  return (
    <header className="grid grid-cols-header items-center">
      <MonthSwitchButton {...previousMonthProps}>
        <BsChevronLeft />
      </MonthSwitchButton>
      <p className="text-center text-sm">
        {month} {year}
      </p>
      <MonthSwitchButton {...nextMonthProps}>
        <BsChevronRight />
      </MonthSwitchButton>
    </header>
  );
};

export default MonthSwitcher;
