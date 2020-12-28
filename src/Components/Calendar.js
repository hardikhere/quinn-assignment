import React, { useEffect, useRef, useState, useCallback } from 'react';
import "./style.scss";
import { getTilesData } from './utils/endpoint';
import Tiles from './Tiles';
import ExpandedTile from './ExpandedTile';
import CardsCarousel from './CardsCarousel';
import { useDispatch } from "react-redux";
import { _updatePosts } from '../redux/PostsReducer';

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
    const dispatch = useDispatch();
    const [weeks, setWeeks] = useState([
        "sun", "mon", "tue", "wed", "thu", "fri", "sat"
    ]);
    const [CalPages, setCalPages] = useState([]);
    const [currentYear, setcurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setcurrentMonth] = useState(yearArr[new Date().getMonth()]);
    const [prevToken, setprevToken] = useState(null);
    const [hasMore, sethasMore] = useState(true)
    const prevMonth = usePrevious(currentMonth);
    const [Loading, setLoading] = useState(false);

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
        return calpages;
    }

    const getNextData = () => {
        if (hasMore && CalPages.length > 0) {
            setLoading(true);
            console.log("going to get data")
            getTilesData(prevToken, 15).then(res => {
                const data = res.ResponseObjects[0];
                if (data.ContinuationToken === null) sethasMore(false);
                setprevToken(data.ContinuationToken);
                console.log("going to insert data")
                insertPostsIntoPage(data.Posts);
                dispatch(_updatePosts(data.Posts));
            })
        }
    }


    const generateYearlyCalendar = (year) => {
        if (!year) return;
        var pages = [];
        var curYear = new Date().getFullYear();
        var curMnth = new Date().getMonth();
        var curDate = new Date().getDate();
        for (let i = 0; i <= 11; i++) {//for each month
            var numberOfDays = getDaysInMonth(year, i);
            var startDay = getStartDay(year, i);
            var tiles = [];
            //push number of blank tiles
            for (var start = 0; start < startDay; start++) {
                tiles.push({
                    day: null,
                    hasPost: false,
                    isToday: false
                })
            }
            for (let dayi = 0; dayi < numberOfDays; dayi++) {
                tiles.push({
                    day: dayi + 1,
                    hasPost: false,
                    isToday: curDate === dayi && curMnth === i && year === curYear
                })
            };
            pages.push({
                month: i,
                monthName: yearArr[i],
                year,
                tiles
            })
        }
        setCalPages(pages);
    };

    useEffect(() => {
        const year = new Date().getFullYear();
        setcurrentYear(year);
        generateYearlyCalendar(year);
    }, []);

    const [hadFirstHit, sethadFirstHit] = useState(false);

    //to populate initial data
    useEffect(() => {
        console.log(CalPages);
        if (CalPages.length > 0 && !hadFirstHit) {
            const month = yearArr[new Date().getMonth()];
            const viewDoc = document.getElementById(`month-${month}`);
            if (viewDoc) {
                viewDoc.scrollIntoView();
            }
            setLoading(true);
            console.log("calpages is ", CalPages);
            getTilesData(null, 15).then(res => {
                const data = res.ResponseObjects[0];
                if (data.ContinuationToken === null) sethasMore(false);
                setprevToken(data.ContinuationToken);
                dispatch(_updatePosts(data.Posts));
                console.log("going to insert data");
                setCalPages(insertPostsIntoPage(data.Posts));
                sethadFirstHit(true);
                setLoading(false);
                yearArr.forEach((month, monthIndex) => {
                    var doc = document.getElementById(`month-${month}`);
                    var observer = new IntersectionObserver(function (entries) {
                        if (entries[0].isIntersecting === true) {
                            doc.scrollIntoView();
                            setcurrentMonth(month);
                        }
                    });

                    observer.observe(doc);
                });
            })
        }
    }, [CalPages, hadFirstHit]);

    useEffect(() => {
        if (yearArr.indexOf(prevMonth) > yearArr.indexOf(currentMonth)) {
            getNextData();
        }
    }, [currentMonth]);

    const [showModal, setshowModal] = useState(false);
    const toggleShowModal = () => setshowModal(!showModal);
    const [ActiveTile, setActiveTile] = useState()
    const handleTileClick = (post, haspost) => {
        if (!haspost) return;
        setActiveTile(post.CalendarDateTime);
        toggleShowModal();
    }
    return (
        <div className="flex flex-jc-center flex-ai-center" style={{ height: "100vh" }}>
            {showModal && <CardsCarousel toggle={toggleShowModal} active={ActiveTile} />}
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
                                            return <div className={`grid-item`} onClick={() => handleTileClick(tile.postDetails, tile.hasPost)}>
                                                <Tiles day={tile.day} hasPost={tile.hasPost}
                                                    isToday={tile.isToday}
                                                    postDetails={tile.postDetails} />
                                            </div>
                                        })
                                    }
                                </div>
                            </div>)
                    })
                    }
                </div>
            </div>
        </div >
    )
}

export default Calendar
