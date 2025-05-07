import { useRef } from "react";
import { STATUS } from "../../constant";
import { useEffect } from "react";

 const CheckBox = ({label, status, id, handleOnChange}) => {
    const checkBoxRef = useRef(null);

    useEffect(() => {
        if(status === STATUS.INDETERMINATE) {
            checkBoxRef.current.indeterminate = true; 
        } else {
            checkBoxRef.current.indeterminate = false; 
        }
    }, [status]);

    return (
        <div style={{marginBottom: '10px', marginLeft: '10px'}}>
            <input onChange={(e) => handleOnChange(e, id)} ref={checkBoxRef} type="checkbox" checked={status === STATUS.CHECKED} />
            <label>{label}</label>
        </div>
    )
}

export default CheckBox;