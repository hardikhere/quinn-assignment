import React, { useEffect, useState } from 'react';
import "./style.scss";

const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
};
const getStartDay = (year, month) => {
    return new Date(year, month, 1).getDay();
};
const getEndDay = (year, month, nod) => {
    return new Date(year, month, nod).getDay();
};

const Calendar = () => {
    const [weeks, setWeeks] = useState([
        "sun", "mon", "tue", "wed", "thu", "fri", "sat"
    ]);
    const [currentDate, setcurrentDate] = useState(new Date());
    const [currentDatePage, setcurrentDatePage] = useState();
    const [Tiles, setTiles] = useState([])
    useEffect(() => {
        var today;
        var year = new Date().getFullYear();
        var month = new Date().getMonth();
        var numberOfDays = getDaysInMonth(year, month);
        var startDay = getStartDay(year, month);
        var endDay = getEndDay(year, month, numberOfDays);
        setcurrentDatePage({
            numberOfDays,
            startDay,
            endDay
        });
        var tiles = [];
        for (var i = 0; i < startDay; i++) {
            tiles.push({
                back: "b",
                day: -1
            });
        };
        for (var i = 0; i < numberOfDays; i++) {
            tiles.push({
                back: "o",
                day: i
            })
        };
        setTiles(tiles);
    }, []);

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
                        {Tiles.map((day, ind) => {
                            return <div className={`grid-item cal-days-${day.back}`}>
                                {
                                    day.back !== "b" ? day.day + 1 : null
                                }
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calendar
