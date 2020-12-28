import React, { useEffect } from 'react'
import Star from './icons/Star'
import { legendNames } from './utils/constants';

const Tiles = (props) => {
    if (props.day === null) return <div className="tile"></div>;
    if (props.hasPost === false) return (
        <div className="tile flex" style={{ justifyContent: "flex-end" }}>
            <div className={`tile-day ${props.isToday ? "today" : ""}`} style={{ fontSize: "16px" }}>
                {props.day}
            </div>
        </div>
    );

    const getStars = (rating) => {
        return [1, 2, 3, 4, 5].map(el => {
            return <Star className={`mystar ${rating >= el ? "filled" : "unfilled"}`} />
        })
    }

    return (
        <div className="tile flex-col">
            <div className="tile-day flex flex-ai-center" style={{ justifyContent: "space-between" }}>
                <div className="flex">
                    {getStars(props.postDetails.Rating)}
                </div>
                <div style={{ fontSize: "16px" }} className={`${props.isToday ? "today" : ""}`}>
                    {props.day}
                </div>
            </div>
            <div className="tile-img">
                <img draggable={false} src={props.postDetails.Images[0].ImageUrl}
                    style={{ width: "60%", height: "90%", maxHeight: "12rem" }}
                    alt="" />
            </div>
            <div className="tile-legends flex flex-ai-center" style={{ justifyContent: "space-evenly", width: "66%" }}>
                {
                    props.postDetails.TypeOfDay.map(type => {
                        return <div className={`bubble flex flex-ai-center flex-jc-center bubble-${legendNames[type]}`}>
                            {legendNames[type]}
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Tiles
