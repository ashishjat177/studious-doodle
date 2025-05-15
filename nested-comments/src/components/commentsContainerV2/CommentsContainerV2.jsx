import { useState } from "react";
import CommentBox from "./components/CommentBox";

const CommentsContainerV2 = ({data}) => {
    const [commentsData, setCommentsData] = useState(data.comments);

    const handleOnReplySubmit = (value, parentId) => {
        const newId =  new Date().getTime();
        const newComment = {parentId, label: value, id: newId, children: [] }
        setCommentsData((prev) => ({...prev, [newId]: newComment}, prev[parentId].children.push(newId)))
    }

    const onDeleteComment = (id) => {
        const parentId = commentsData[id].parentId;
        setCommentsData((previousComments) => {
            const updatedComment = {...previousComments};
            // remove the item from parent's children.
            updatedComment[parentId].children = updatedComment[parentId].children.filter(childId => childId !== id);
            
            // delete the children of that node.
            const queue = [id];
            while(queue.length > 0) {
                const nodeToBeDeleted = queue.shift();
                if(updatedComment[nodeToBeDeleted].children.length > 0) {
                 queue.push(...updatedComment[nodeToBeDeleted].children);
                }
                delete updatedComment[nodeToBeDeleted];
            }
            return updatedComment;
        });
    }

    return (
        <div>
            <CommentBox comment={commentsData[1]} allComments={commentsData} onDeleteComment={onDeleteComment} handleOnReplySubmit={handleOnReplySubmit}/>
        </div>
    )
}

export default CommentsContainerV2;