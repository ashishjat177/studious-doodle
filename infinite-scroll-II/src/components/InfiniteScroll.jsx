import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Post from "./Post";
import Virtualization from "./Virtualization";

const InfiniteScroll = ({ totalPages = 10 }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const loaderRef = useRef(null);
    const [list, setList] = useState([]);

    function loadMoreData(page) {
        fetch(`https://picsum.photos/v2/list?${page}&limit=3`)
        .then((response) => response.json())
        .then((data) => {
            setList((prev) => ([...prev, ...data]));
            setIsLoading(false);
        }).catch((err) => {
             console.error(err);
        })
    }

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            console.log('inside observer', entries);
            const target = entries[0];
            if(target.isIntersecting && !isLoading && (currentPage < totalPages)) {
                setCurrentPage((prev) => {
                    const newPage = prev + 1;
                    loadMoreData(newPage);
                    return newPage;
                });
                setIsLoading(true);
            }
        }, {
            rootMargin: '100px', // Load earlier, before user reaches bottom
            threshold: 0.1, // Trigger when even 10% of element is visible
        });
        
        console.log('inside observer', loaderRef.current);
        observer.observe(loaderRef.current);

        return () => {
            if(loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
            observer.disconnect(); // Properly cleanup all observations
        }
    }, [currentPage, isLoading, totalPages]); // Add missing dependencies

    return (
        <div className="infine-scroll-container">
            <Virtualization list={list} totalPages={totalPages}/>

            {isLoading && <div>Loading...</div>}
            <div style={{height: '80px'}} ref={loaderRef}></div>
        </div>
    )
}

export default InfiniteScroll;