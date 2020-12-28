import React, { useState } from 'react'
import { Carousel } from 'react-bootstrap'
import ExpandedTile from './ExpandedTile'
import { useSelector } from "react-redux";

const CardsCarousel = (props) => {
    const Posts = useSelector(state => state.Posts);
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <div className="flex flex-ai-center flex-jc-center modalback">
            <div className="close-btn" onClick={props.toggle}>&times;</div>
            <Carousel style={{ width: "50%" }} indicators={false} activeIndex={index} onSelect={handleSelect}>
                {
                    Posts.map(el => {
                        return <Carousel.Item style={{ paddingLeft: "35%" }}>
                            <ExpandedTile postDetails={el} />
                        </Carousel.Item>
                    })
                }
            </Carousel>
        </div>
    )
}

export default CardsCarousel
