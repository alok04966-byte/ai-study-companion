import { useMemo, useState } from "react";
import Calendar from "react-calendar";
import RevisionList from "../components/revision/RevisionList";
import PageShell from "../components/common/PageShell";
import "react-calendar/dist/Calendar.css";

function Revision() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const selectedDateString = useMemo(
    () => selectedDate.toISOString().split("T")[0],
    [selectedDate]
  );

  return (
    <PageShell title="Revision Planner">
      <div className="panel panel-padded">
        <Calendar
          value={selectedDate}
          onChange={setSelectedDate}
          tileClassName={({ date }) =>
            date.toDateString() === selectedDate.toDateString() ? "selected-day" : ""
          }
        />
      </div>
      <p>Showing revisions for: {selectedDateString}</p>
      <RevisionList selectedDate={selectedDateString} />
    </PageShell>
  );
}

export default Revision;