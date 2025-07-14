import { useContext, useState } from "react";
import Folder from "./Folder";
import { FileManagerContext } from "../App";

const FileManager = ({ data, fileData, parentId = null }) => {
    const [isOpen, setIsOpen] = useState(false);
 
    return (
        <>
            <Folder data={data} parentId={parentId} isOpen={isOpen} setIsOpen={setIsOpen}/>
            <div className="nested-container">
                {isOpen && data.children.map((childrenId) => (
                    <FileManager key={childrenId} parentId={data.id} fileData={fileData} data={fileData[childrenId]} />
                ))}
            </div>
        </>
        
    )
}

export default FileManager;