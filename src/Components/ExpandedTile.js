import React from 'react'
import Star from './icons/Star'
import { legendNames } from './utils/constants';

const ExpandedTile = (props) => {
    const parseTime = (stringDate) => {
        const date = new Date(stringDate);
        return date.toDateString();
    };

    const getStars = (rating) => {
        return [1, 2, 3, 4, 5].map(el => {
            return <Star className={`mystar ${rating >= el ? "filled" : "unfilled"}`} />
        })
    };

    return (
        <div className="tile-bg xtile">
            <div className="xtile-img">
                <img src={props.postDetails.Images[0].ImageUrl} style={{height:"100%",backgroundSize:"auto",width:"100%"}} alt="" />
            </div>
            <div className="xtile-container">
                <div className="flex" style={{ justifyContent: "space-between" }}>
                    <div className="flex" style={{ width: "60%", justifyContent: "space-evenly" }}>
                        {
                            props.postDetails.TypeOfDay.map(type => {
                                return <div className={`bubble bubble-bg bubble-${legendNames[type]} flex flex-ai-center flex-jc-center `}>
                                    {legendNames[type]}
                                </div>
                            })
                        }


                    </div>
                    <div className="flex">
                        {getStars(props.postDetails.Rating)}
                    </div>
                </div>
                <div>
                    <div style={{ fontSize: "larger" }}>
                        <b>
                            {parseTime(props.postDetails.CalendarDateTime)}
                        </b>
                    </div>
                    <div className="xtile-desc">
                        {props.postDetails.Text}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExpandedTile
