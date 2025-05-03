import { createContext, useContext, useRef, useState } from "react"
import { createPortal } from 'react-dom';
import './style.scss';

const PopoverContext = createContext();

const Popover = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const contentRef = useRef(null);
    const btnRef = useRef(null)

    const  togglePopover = () => {
        setIsOpen((prev) => !prev);

        const {height } = contentRef.current.getBoundingClientRect();

        const {top: bTop, left: bLeft, height: bHeight} = btnRef.current.getBoundingClientRect(); 

        contentRef.current.style.top = `${bTop + bHeight}px`;
        contentRef.current.style.left = `${bLeft}px`;

        const innerHeight = window.innerHeight;
        const contentPosition = bTop + height;

        if(contentPosition >= innerHeight) {
            contentRef.current.style.top = `${bTop - height}px`;
        }
    }

    return (
        <PopoverContext.Provider value={{isOpen, contentRef, btnRef, togglePopover}}>
            <div className="popover">
                {children}
            </div>
        </PopoverContext.Provider>
    )
}


const Action = ({ label, node, children }) => {
    const { togglePopover, btnRef } = useContext(PopoverContext);
    if(node) {
        return (
            <button ref={btnRef} onClick={togglePopover}>{node}</button>
        )
    }
    if(children) {
        return (
            <button ref={btnRef} onClick={togglePopover}>{children}</button>
        )
    }

    return (
        <button ref={btnRef} onClick={togglePopover}>{label}</button>
    )
}

const Content = ({children}) => {
    const { isOpen, contentRef } = useContext(PopoverContext);
    const className = isOpen ? 'content' : 'content-hidden';

    return (
        createPortal(
            <div ref={contentRef} className={className}>{children}</div>,
            document.body
        )
    )
}

Popover.Action = Action;
Popover.Content = Content;

export default Popover;
