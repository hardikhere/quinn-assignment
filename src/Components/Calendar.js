import React, { useEffect, useState } from 'react';
import "./style.scss";

const Calendar = () => {
    const [weeks, setWeeks] = useState([
        "sun", "mon", "tue", "wed", "thu", "fri", "sat"
    ]);
    const [currentDate, setcurrentDate] = useState(new Date());
    const [currentDatePage, setcurrentDatePage] = useState({
        numberOfDays: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate(),
        startDay: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(),
        endDay: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.numberOfDays).getDay()
    })

    useEffect(()=>{
        console.log(currentDatePage);
    },[]);

    return (
        <div className="flex flex-jc-center flex-ai-center" style={{ height: "100vh" }}>
            <div className="cal-wrapper">
                <div className="cal-header">
                    <div className="cal-month">
                        <h2>December &nbsp; 2020</h2>
                    </div>
                </div>

                <div className="cal-weeks flex">
                    {
                        weeks.map((week, wind) => {
                            return <div key={week} className="cal-weeks-box flex flex-jc-center">
                                {week}
                            </div>
                        })
                    }
                </div>
                <div className="cal-days">
                    <div className="grid-container">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map(day => {
                            return <div className="grid-item">{day}</div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calendar
