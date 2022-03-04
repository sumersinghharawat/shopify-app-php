import { DatePicker } from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";

export default function Calendar(props) {
            
    let d = new Date();
    let monthNumber = d.getMonth();
    let yearNumber = d.getFullYear();
    const [{month, year}, setDate] = useState({month: monthNumber, year: yearNumber});
    const [selectedDates, setSelectedDates] = useState({
      start: new Date(new Date().getTime()+(1*24*60*60*1000)),
      end: new Date(new Date().getTime()+(5*24*60*60*1000))
    });

    props.selectedDateRangeArg(selectedDates);

    const handleMonthChange = useCallback(
        (month, year) => setDate({month, year}),
      [],
    );

    return (
      <DatePicker
        month={month}
        year={year}
        onChange={setSelectedDates}
        onMonthChange={handleMonthChange}
        selected={selectedDates}
        disableDatesBefore={new Date()}
        // disableDatesAfter={new Date('Sun Feb 18 2018 00:00:00 GMT-0500 (EST)')}
        allowRange
      />
    );
}