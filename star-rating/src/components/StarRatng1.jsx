import { useState } from "react";

const StartRating1 = ({ starCount }) => {
    const [activeIndex, setActiveIndex] = useState(null)
    const [hoverIndex, setOnMouseOver] = useState(null)
    const starArr = Array.from({length: starCount}, (_, index) => index);

    return (
        <div className="star-container">
            { starArr.map((_, index) => (
                <span 
                    key={index} 
                    tabIndex={0}
                    aria-checked={activeIndex < index}
                    onClick={() => setActiveIndex(index + 1)}
                    onKeyDown={(e) => {(e.key === 'Enter' || e.key === ' ') && setActiveIndex(index + 1) }}
                    onMouseOver={() => setOnMouseOver(index + 1)}
                    onMouseLeave={() => setOnMouseOver(null)}
                    className={`star ${ index < ( hoverIndex ?? activeIndex ) ? 'active' : ''}`}
                    >
                    &#9733;
                </span>
            ))}
        </div>
    )
}

export default StartRating1;