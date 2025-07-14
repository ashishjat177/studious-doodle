import { useEffect, useRef, useState } from "react";

const Input = ({ onEnter, onCancel }) => {
    const [value, setValue] = useState(null);
    const inputRef = useRef(null);

    const handleFileNameChange = (e) => {
        const inputValue = e.target.value;
        setValue(inputValue);
    }

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    return  (
        <div className="input-field"> 
            <input ref={inputRef} value={value} type="text" onChange={handleFileNameChange} onKeyDown={(e) => {e.key === 'Enter' && onEnter(value)}}/>
            <button onClick={() => onEnter(value)}>✅</button>
            <button onClick={onCancel}>❌</button>
        </div>
    )
}

export default Input;