import { useEffect, useRef, useState } from "react";

const STATUS = {
    SUCCESS: 'SUCCESS',
    LOADING: 'LOADING',
    FAILED: 'FAILED',
}


const TypeAhead = () => {
    const [searchText, setSearchText] = useState('');
    const [searchList, setSearchList] = useState([]);
    const [status, setStatus] = useState(STATUS.LOADING);

    const cache = useRef(new Map())
    const CACHE_LIMIT = 5;

    // Cache is a Map object that stores the search results with the search text as the key.
    // The cache is limited to 5 items. When the cache reaches the limit, the oldest item is removed.
    // The manageCaching function is used to add new items to the cache and remove the oldest item if the limit is reached.
    const manageCaching = (key, data) => {
        if(cache.current.has(key)) {
            delete cache.current[key];
        }
        cache.current.set(key, data);

        if(cache.current.size >= CACHE_LIMIT ) {
           const firstElement = cache.current.keys().next().value[0];
           cache.current.delete(firstElement);
        }
    }
   
    const searchProducts = async(value, signal) => {
        try {

            if(cache.current.has(value)) {
                const cachedData = cache.current.get(value)
                setSearchList(cachedData);
                manageCaching(value, cachedData);
                setStatus(STATUS.SUCCESS);
                return;
            }

            setStatus(STATUS.LOADING);
            const response = await fetch(`https://dummyjson.com/products/search?q=${value}&limit=10`, {signal})
            const data  = await response.json();
            manageCaching(value, data);
            setSearchList(data);
            setStatus(STATUS.SUCCESS);
        } catch(err) {
            if(err.name === 'AbortError') {
                setStatus(STATUS.FAILED);
            }
        }
    }

    useEffect(() => {
        // don't search if there is no text and only space
       if(!searchText.trim()) {
        setSearchList([]);
        return;
       }
       const abortController = new AbortController(); 
       const {signal} = abortController;
       const timerId = setTimeout(() => searchProducts(searchText, signal), 300);
        return () => { 
            clearTimeout(timerId);
            abortController.abort();
        };
    }, [searchText])

    return (
        <div>
            <input value={searchText} type="text" onChange={(e) => setSearchText(e.target.value)} placeholder="type here"/>
            {status === STATUS.LOADING && <div>Loading...</div> }
            
            {status === STATUS.SUCCESS && (
                <ul className="search-content-container">
                    {(searchList?.products || []).map((item) => (
                        <li key={item.id}>{item.title}</li>
                    ))}
                </ul>
            )}

            {status === STATUS.FAILED && <div>Something went wrong</div>}
        </div>
    )
}

export default TypeAhead;