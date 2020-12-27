import React from 'react'
import Star from './icons/Star'

const Tiles = (props) => {
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
                <img draggable={false} src="https://ik.imagekit.io/bj96n986jb/dev/Screenshot_2020-12-05_at_12.00.43_AM_3XTnZB8Hr.png"
                    style={{ width: "inherit", height: "80%", maxHeight: "12rem" }}
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
