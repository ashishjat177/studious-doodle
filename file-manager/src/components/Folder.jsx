import { useContext, useEffect, useRef, useState } from "react";
import { FileManagerContext } from "../App";
import Input from "./Input";

const Folder = ({ data, parentId, isOpen, setIsOpen }) => {
    const [showInput, setShowInput] = useState({show: false, isFolder: true});
    const [isEdit, setIsEdit] = useState(false);
    const { label, id, children, isFolder } = data;

    const {addFolder, removeFolder, handleEdit} = useContext(FileManagerContext)

    const onEnter = (value) => {
        const newId = Date.now();
        const newFolder = { label: value, id: newId, children: [], isFolder: showInput.isFolder }
        addFolder(newFolder, id);
        setShowInput(false);
        setIsOpen(true);
    }

    const onEdit = (value) => {
        handleEdit(value, id);
        setIsEdit(false);
    }

  return  (
        <div className="parent-container">
            {isEdit ? <Input onCancel={() => setIsEdit(false)} onEnter={onEdit}/> : (
                <>
                    <label key={id}> 
                        {children.length > 0 && <button onClick={() => setIsOpen((prev) => !prev)} className={`arrow ${isOpen ? 'arrow-down' : ''}`}>
                            {'>'}</button> } 
                            {label}
                    </label>
                    <div className="action-btns"> 
                        <button onClick={() => setIsEdit((prev) => !prev)}>🖋️</button>
                        {isFolder && (
                            <>
                            <button onClick={() => setShowInput((prev) => ({...prev, show: !prev.show, isFolder: true}))}>+🗂️</button>
                            <button onClick={() => setShowInput((prev) => ({...prev, show: !prev.show, isFolder: false}))}>+📄</button>
                        </>
                        )}
                        <button onClick={() => removeFolder(id, parentId)}>-</button> 
                    </div>
                    {showInput.show && <div> <Input onEnter={onEnter} onCancel={() => setShowInput((prev) => ({...prev, show: false}))}/> </div>}
                </>
            )}
        </div>
  )
}

export default Folder;