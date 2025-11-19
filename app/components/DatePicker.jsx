'use client'
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useState} from "react";

export default function DatePicker(props)
{
    const after1Day = new Date();
    after1Day.setDate(after1Day.getDate() + 1);
    const [startDate, setStartDate] = useState(after1Day);

    const after3Days = new Date();
    after3Days.setDate(after3Days.getDate() + 3);
    const [endDate, setEndDate] = useState(after3Days);

    const onChange = (dates) =>
    {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    return (
        <ReactDatePicker {...props}
                         required
                         enableTabLoop={false}
                         portalId={'react-datepicker-portal'}
                         selectsRange
                         selected={startDate}
                         onChange={onChange}
                         onFocus={(e) => e.target.readOnly = true}
                         minDate={new Date()}
                         startDate={startDate}
                         endDate={endDate}/>
    );
}