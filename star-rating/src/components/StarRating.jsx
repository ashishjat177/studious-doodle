import { useState } from "react";

const StarRating = ({starCount}) => {
    const [starValue, setStarValue] = useState(0);
    const [hoverIndex, setHoverIndex] = useState(null);

    return (
        <div className="star-container">
            {Array.from({ length: starCount }, (_, index) => (
                <div key={index} 
                    role="checkbox"
                    aria-checked={index < starValue}
                    tabIndex={0}
                    onMouseEnter={() => setHoverIndex(index + 1)}
                    onKeyDown={(e) => {(e.key === 'Enter' || e.key === ' ') && setStarValue(index + 1)}} 
                    onMouseLeave={() => setHoverIndex(null)} 
                    onClick={() => setStarValue(index + 1)} 
                    className={`star ${index < (hoverIndex ?? starValue ) ? 'active' : ''}`}>
                    &#9733;
                </div>
            ))}
        </div>
    )
}

export default StarRating;