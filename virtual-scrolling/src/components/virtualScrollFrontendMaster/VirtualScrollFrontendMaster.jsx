//https://www.youtube.com/watch?v=I40pArhtXWw&ab_channel=FrontendMaster

import { useState } from "react";

const VirtualScrollFrontendMaster = () => {
    const [data, setData] = useState([...new Array(40)]);
    const [scrollData, setScrollData] = useState({scrollTop: 0, clientHeight: 0, scrollHeight: 0, remainingHeight: 0});
    const [loading, setLoading] = useState(false)

    let threshould = 200;

    let timer;
    const loadMore = () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
                setData((prev) => ([...prev, ...new Array(40)]));
                setLoading(false)
        }, 1000)
     }

     const handleOnScroll = (e) => {
        const scrollTop = e.target.scrollTop;
        const clientHeight = e.target.clientHeight;
        const scrollHeight = e.target.scrollHeight;
        const remainingHeight = scrollHeight - (scrollTop + clientHeight);
        setScrollData((prev) => ({...prev, scrollTop, clientHeight, scrollHeight, remainingHeight}))
        if(remainingHeight < threshould) {
            setLoading(true);
            loadMore()
        }
        console.log(e)
     }


    return (
        <>
          <div>scrollTop:  {scrollData.scrollTop}</div>
          <div>clientHeight: {scrollData.clientHeight}</div>
        <div  onScroll={handleOnScroll} className="scroll-elements-container">
            {data.map((row, index) => (
               <div className="scroll-items" key={index}> {index + 1}</div>
            )) }  
            { loading && <div> loading...</div>    }      
        </div>
        <div>scroll Height: {scrollData.scrollHeight}</div>
        <div>remainingheight: {scrollData.remainingHeight}</div>
        </>
    )
}

export default VirtualScrollFrontendMaster;