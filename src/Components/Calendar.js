import React, { useEffect, useRef, useState, useCallback } from 'react';
import debounce from "lodash.debounce"
import "./style.scss";
import { getTilesData } from './utils/endpoint';
import Tiles from './Tiles';

const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
};
const getStartDay = (year, month) => {
    return new Date(year, month, 1).getDay();
};
const getEndDay = (year, month, nod) => {
    return new Date(year, month, nod).getDay();
};

const yearArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const Calendar = () => {
    const [weeks, setWeeks] = useState([
        "sun", "mon", "tue", "wed", "thu", "fri", "sat"
    ]);
    const [years, setYears] = useState(yearArr);
    const [CalPages, setCalPages] = useState([]);
    const [currentYear, setcurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setcurrentMonth] = useState(yearArr[new Date().getMonth()]);
    const [currentPage, setcurrentPage] = useState(new Date().getMonth());
    const [prevToken, setprevToken] = useState(null);
    const [hasMore, sethasMore] = useState(true)

    const getNextData = () => {
        if (hasMore) {
            getTilesData(prevToken, 5).then(res => {
                const data = res.ResponseObjects[0];
                if (data.ContinuationToken === null) sethasMore(false);
                setprevToken(data.ContinuationToken);
                console.log(data);
            })
        }
    }


    const generateYearlyCalendar = (year) => {
        if (!year) return;
        var pages = [];
        for (let i = 0; i <= 11; i++) {//for each month
            var numberOfDays = getDaysInMonth(year, i);
            var startDay = getStartDay(year, i);
            var tiles = [];
            //push number of blank tiles
            for (var start = 0; start < startDay; start++) {
                tiles.push({
                    day: null
                })
            }
            for (let dayi = 0; dayi < numberOfDays; dayi++) {
                tiles.push({
                    day: dayi + 1
                })
            };
            pages.push({
                month: i,
                monthName: yearArr[i],
                year,
                tiles
            })
        }
        return pages;
    }

    useEffect(() => {
        var year = new Date().getFullYear();
        setcurrentYear(year);
        setCalPages(generateYearlyCalendar(year));
        window.onload = () => {
            // scroll to the current month
            var currentMonthDoc = document.getElementById(`month-${currentMonth}`);
            currentMonthDoc.scrollIntoView();
            yearArr.forEach(month => {
                var doc = document.getElementById(`month-${month}`);
                var caldays = document.getElementById("caldays");
                var observer = new IntersectionObserver(function (entries) {
                    if (entries[0].isIntersecting === true) {
                        doc.scrollIntoView();
                        setcurrentMonth(month);
                        //doc.classList.add("upanim");
                        console.log("new month is ", month)
                    }
                });

                observer.observe(doc);
            })
        }
    }, []);

    return (
        <div className="flex flex-jc-center flex-ai-center" style={{ height: "100vh" }}>

            <div className="cal-wrapper">
                <div className="header-wrapper">
                    <div className="cal-header">
                        <div className="cal-month">
                            <h2>{currentMonth} &nbsp; {currentYear}</h2>
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
                </div>
                <div className="header-wrapper-fake"></div>
                <div className="cal-days" id="caldays">

                    {CalPages.length > 0 && CalPages.map((page, pageIndex) => {
                        return (
                            <div style={{ paddingBottom: "1rem" }} key={`page${pageIndex}`}>
                                <div className="flex" >
                                    {page.monthName}
                                </div>
                                <div className="grid-container" id={`month-${page.monthName}`} >
                                    {
                                        page.tiles.map((tile, tileIndex) => {
                                            return <div className={`grid-item`}>
                                                <Tiles day={tile.day} />
                                            </div>
                                        })
                                    }
                                </div>
                            </div>)
                    })
                    }
                </div>
            </div>
        </div>
    )
}

export default Calendar
