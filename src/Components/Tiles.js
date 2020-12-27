import React, { useEffect } from 'react'
import Star from './icons/Star'

const Tiles = (props) => {
    if (props.day === null) return <div className="tile"></div>;
    if (props.hasPost === false) return (
        <div className="tile flex" style={{ justifyContent: "flex-end" }}>
            <div className="tile-day">
                <h1>{props.day}</h1>
            </div>
        </div>);

    return (
        <div className="tile flex-col">
            <div className="tile-day flex flex-ai-center" style={{ justifyContent: "space-between" }}>
                <div className="flex">
                    <Star className="mystar filled" />
                    <Star className="mystar filled" />
                    <Star className="mystar filled" />
                    <Star className="mystar unfilled" />
                    <Star className="mystar unfilled" />
                </div>
                <div>
                    <h1>{props.day}</h1>
                </div>
            </div>
            <div className="tile-img">
                <img draggable={false} src={props.postDetails.Images[0].ImageUrl}
                    style={{ width: "60%", height: "90%", maxHeight: "12rem" }}
                    alt="" />
            </div>
            <div className="tile-legends flex flex-ai-center" style={{ justifyContent: "space-around" }}>
                <div className="bubble bubble-w flex flex-jc-center flex-ai-center ">w</div>
                <div className="bubble bubble-dc flex flex-jc-center flex-ai-center ">dc</div>
                <div className="bubble bubble-pr flex flex-jc-center flex-ai-center ">pr</div>
                <div className="bubble bubble-c flex flex-jc-center flex-ai-center ">c</div>
            </div>
        </div>
    )
}

export default Tiles
