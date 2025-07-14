import { useState } from "react";
import ReplyInput from "./ReplyInput";

const Comments = ({commentData, setCommentData, onReply, onDeleteComment}) => {
    const [showComment, setShowComment] = useState({});
    const [showReplyInput, setShowReplyInput] = useState();
    return (
        <div className="comment-container">
            {commentData?.map(({label, id, children}) => (
                <>
                <div key={id} className="comment" onClick={() => setShowComment((prev) => ({...prev, [id]: !prev[id]}))}> 
                    <span> {label} </span>
                    <span>
                        <button onClick={() => setShowReplyInput(id)} className="reply-btn">reply</button> 
                        <button onClick={() => onDeleteComment(id)} className="delete-btn">delete</button>
                    </span>
                </div>
                {showReplyInput === id && showComment[id] && <ReplyInput handleReply={(value) => {onReply(value, id); setShowReplyInput(0)} }/>}
                
                {children.length > 0 && showComment[id] && <Comments commentData={children} setCommentData={setCommentData} onReply={onReply} onDeleteComment={onDeleteComment}/>}
               </>
            ))}
        </div>
    )
}

export default Comments;