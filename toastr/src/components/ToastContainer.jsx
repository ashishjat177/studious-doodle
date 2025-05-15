import { useState } from "react";
import { useRef } from "react";
import Toastr from "./Toastr";
import { ToastContext } from "../constant";
import { useContext } from "react";

// Custom Hook for Global Access
export const useToast = () => useContext(ToastContext);

const ToastContainer = ({children}) => {
    const [toastList, setToastList] = useState([])
    const toastRef = useRef({});
    
  
    const handleClose = (id) => {
      setToastList((prev) => prev.filter((item) => item.id !== id));
      clearTimeout(toastRef.current[id]);
      delete toastRef.current[id];
    }
  
    const showToast = (type = 'success', message = 'toast message', delay = 3000) => {
      const id = new Date().getTime();
      setToastList((prev) => [...prev, {id, type, message: message}]);
      toastRef.current[id] = setTimeout(() => {
        handleClose(id)
      }, delay);
    }
  
    return (
        <ToastContext.Provider value={{ showToast }}>
            <div>
                {children}
                <div className='toast-container'>
                    {toastList?.map(({type, message, id}) => (
                        <Toastr id={id} type={type} messagText={message} handleClose={handleClose}/>
                    ))}
                </div>
            </div>
      </ToastContext.Provider>
    )
}

export default ToastContainer;