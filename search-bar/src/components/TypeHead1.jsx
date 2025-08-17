import { useRef } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";

const STATUS = {
    LOADING: 'loading',
    ERROR: 'error',
    SUCCESS: 'success'
}

const CACHE_LIMIT = 5;

const TypeHead1 = () => {
    const [searchText, setSearchText] = useState(null);
    const [searchList, setSearchList] = useState([]);
    const [status, setStatus] = useState(STATUS.LOADING);
    
    const cacheData = useRef(new Map());

    const manageCaching = (value, data) => {
        cacheData.current.delete(value);

        cacheData.current.set(value, data);

        if(cacheData.current.size >= CACHE_LIMIT) {
            const firstItem = cacheData.current.keys().next().value;
            cacheData.current.delete(firstItem);
        }
    }

    const fetchList = useCallback( async(value, signal) => {
        try {

            if(cacheData.current.has(value)) {
              const data =  cacheData.current.get(value);
              setSearchList(data);
              manageCaching(value, data);
              console.log('from cache', value)
              return
            }

            setStatus(STATUS.LOADING);
            let data = await fetch(`https://dummyjson.com/products/search?q=${value}&limit=10`, { signal });
            if(data.ok) {
                data = await data.json();
                setSearchList(data.products);
                setStatus(STATUS.SUCCESS);
                manageCaching(value, data.products)

                console.log('from api', value)
            } else {
                throw new Error('Soemthing went wrong while fetching the list')
            }
        } catch(err) {
             console.error(err);
             setStatus(STATUS.ERROR);
        }
    }, [])

    useEffect(() => {
        if(!searchText || !searchText?.trim()) {
            setSearchText('')
            return;
        } 
        
        const abortController = new AbortController();
        const { signal } = abortController;
    
       const timeoutId = setTimeout(() => fetchList(searchText, signal), 300);

       return () => { 
            clearTimeout(timeoutId);
            abortController.abort();
            console.log('cleanup')
        };
    }, [searchText, fetchList])

    return (
        <div>
            <input type="text" value={searchText} placeholder="type something" onChange={(e) => setSearchText(e.target.value)}/>

             { status === STATUS.LOADING && ( <div>Loading...</div> )}

            { status === STATUS.SUCCESS && (
                <ul>
                    {(searchList || []).map((list) => (
                            <li key={list.id}>{list.title}</li>
                    ))}
                </ul>
            )}

            { status === STATUS.ERROR && ( <div>Something went wrong!!</div> )}
        </div>
    )
}

export default TypeHead1;