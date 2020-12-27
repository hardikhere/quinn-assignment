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

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

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
    const prevMonth = usePrevious(currentMonth);
    const [MaxReach, setMaxReach] = useState(0); //max number of times I scrolled up
    const [Loading, setLoading] = useState(false);

    useEffect(() => {
        if (yearArr.indexOf(prevMonth) > yearArr.indexOf(currentMonth)) {
            getNextData();
        }
    }, [currentMonth]);

    const insertPostsIntoPage = (posts) => {
        var calpages = CalPages;
        posts.forEach((post, postIndex) => {
            var dateOfPost = new Date(post.CalendarDateTime);
            var postYear = dateOfPost.getFullYear();
            var postMonth = dateOfPost.getMonth();
            var postDate = dateOfPost.getDate();
            calpages.forEach(page => {
                if (page.year === postYear && page.month === postMonth) {
                    page.tiles.forEach(tile => {
                        if (tile.day === postDate) {
                            tile.postDetails = post;
                            tile.hasPost = true;
                        }
                    })
                }
            });
        });
        console.log("new calpage is ", calpages)
        setCalPages(calpages);
    }

    const getNextData = () => {
        if (hasMore) {
            getTilesData(prevToken, 15).then(res => {
                const data = res.ResponseObjects[0];
                if (data.ContinuationToken === null) sethasMore(false);
                setprevToken(data.ContinuationToken);
                console.log(data);
                insertPostsIntoPage(data.Posts);
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
                    day: null,
                    hasPost: false
                })
            }
            for (let dayi = 0; dayi < numberOfDays; dayi++) {
                tiles.push({
                    day: dayi + 1,
                    hasPost: false
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
    };

    useEffect(() => {
        setLoading(true);
        var year = new Date().getFullYear();
        setcurrentYear(year);
        setCalPages(generateYearlyCalendar(year));
        window.onload = () => {
            // scroll to the current month
            
            var currentMonthDoc = document.getElementById(`month-${currentMonth}`);
            currentMonthDoc.scrollIntoView();
            yearArr.forEach((month, monthIndex) => {
                var doc = document.getElementById(`month-${month}`);
                var caldays = document.getElementById("caldays");
                var observer = new IntersectionObserver(function (entries) {
                    if (entries[0].isIntersecting === true) {
                        doc.scrollIntoView();
                        setcurrentMonth(month);
                    }
                });

                observer.observe(doc);
            })
        }
    }, []);

    return (
        <div className="flex flex-jc-center flex-ai-center" style={{ height: "100vh" }}>
            <button onClick={getNextData}>get nest</button>
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
                                                <Tiles day={tile.day} hasPost={tile.hasPost} postDetails={tile.postDetails} />
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
