import { useState } from "react";
import Post from "./Post";

const Virtualization = ({ list, itemHeight = 300, height = 1100, totalPage = 10 }) => {
    const [indices, setIndices] = useState([0, Math.floor(height/itemHeight)]);
    const dataList = JSON.parse(JSON.stringify(list)); 
    const visualList = dataList?.splice(indices[0], indices[1]);

    const handleScroll = (e) => {
        const scrollTop = e.scrollTop;
        const startIndex = Math.floor(scrollTop/itemHeight);
        const endIndex = startIndex + Math.floor(height/itemHeight); 
        setIndices([startIndex, endIndex]);
    }

    return (
        <div style={{height: height, overflow: 'auto', background: 'gray'}} className="virutalization-container" onScroll={handleScroll}>
            <div  style={{width: '1000px', height: `${ height* totalPage}px` }}>
                <div style={{transform: `translateY(${indices[0]*itemHeight}px)`}}>
                    <Post list={visualList ?? []}/>
                </div>
            </div>
        </div>
    )
}

export default Virtualization;