const Toastr = ({handleClose, type, messageText = 'success', id}) => {
    return (
        <div className={`toast ${type}`}>
            {messageText} <span onClick={() => handleClose(id)}>x</span>
        </div>
    )
}

export default Toastr;