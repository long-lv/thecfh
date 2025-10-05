import React, { useState } from "react";
import ThecfhCalender from "./index";

export default function CalendarDemo() {
  const [singleDate, setSingleDate] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  return (
    <div style={{ padding: "20px", display: "flex", gap: "40px" }}>
      <div>
        <h3>Single Date Selection</h3>
        <ThecfhCalender
          mode="single"
          value={singleDate}
          onChange={setSingleDate}
        />
        <p>Selected: {singleDate?.toLocaleDateString() || "None"}</p>
      </div>

      <div>
        <h3>Date Range Selection</h3>
        <ThecfhCalender
          mode="range"
          valueRange={dateRange}
          onRangeChange={setDateRange}
        />
        <p>
          Range: {dateRange[0]?.toLocaleDateString() || "None"} - {dateRange[1]?.toLocaleDateString() || "None"}
        </p>
      </div>
    </div>
  );
}
