import { useRef } from "react"

export default function useCustomMemo(cb, dependecyArr) {
    const ref = useRef({
        memoizedValue: undefined,
        lastDependency: undefined,
    });

    if( !ref.current.memoizedValue || !isArrayEqual(ref.current.lastDependency, dependecyArr)) {
        ref.current.memoizedValue = cb();
        ref.current.lastDependency = dependecyArr;
    } 
    return ref.current.memoizedValue;
}

function isArrayEqual(prev, current) {
    if(!prev || !current || prev.length !== current.length) {
        return false;
    }

    for(let i = 0; i < prev.length; i++) {
        if(prev[i] !== current[i]) {
            return false;
        }
    }
 
    return true;
}