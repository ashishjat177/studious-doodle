import { useRef } from "react"
import useClickOutsideClose from "../hooks/useClickOutsideClose";

export default function Modal({title, isOpen, handleClose}) {
    const modalRef = useRef(null);
    useClickOutsideClose(modalRef, handleClose)
 
    if(!isOpen) {
        return null
    }

    return (
        <>
        <div ref={modalRef} className="modal-container">
            <div className="modal-header">
                <h2>{title}</h2> <span tabIndex={0} role="button" aria-pressed="false" onClick={handleClose}>X</span>
            </div>
            <div className="modal-body">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras congue fermentum eros vel ornare. Ut neque arcu, mattis ut aliquam eu, gravida quis arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam egestas nibh in sapien tincidunt molestie. Cras nec lectus tortor. Nunc tellus diam, tincidunt accumsan enim vitae, euismod pulvinar nisi. Nam eu velit ac diam vestibulum pulvinar ac ut erat. Aliquam consequat interdum risus, eu auctor purus porta sed. Sed efficitur nisl et volutpat consequat. Maecenas ut volutpat neque.
                </p>
            </div>
            
        </div>

        <div className="modal-backdrop"></div>
        </>
    )
}