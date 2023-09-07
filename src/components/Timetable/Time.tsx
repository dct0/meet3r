import {
  useContextCalendars,
  useContextDays,
  useContextMonths,
  useContextTime,
  useContextTimePropGetters,
} from "@rehookify/datepicker";

const Time = () => {
  const { calendars } = useContextCalendars();
  const { time } = useContextTime();
  const { timeButton } = useContextTimePropGetters();

  const { days } = calendars[0]!;

  return (
    <>
      {time.map((t) => (
        <tr key={t.time}>
          {days.map((d) => (
            <td key={`${d.$date.getTime()}${t.time}`}>
              <button {...timeButton}>{t.time}</button>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default Time;
