import { TOASTR_TYPE } from "../constant";

const Toastr = ({ toast, handleClose }) => {
    const { type = TOASTR_TYPE.SUCCESS, text = 'hello', id } = toast;
    return (
        <div className={`toastr ${type}`}>
            <span className="content">{text}</span><button onClick={() => handleClose(id)}>X</button>
        </div>
    )
}

export default Toastr;