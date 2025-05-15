import { useState } from "react";

const ReplyComment = ({setShowReplyInput, handleOnReplySubmit}) => {
    const [replyText, setReplyText] = useState('');

    const handleReply = () => {
        handleOnReplySubmit(replyText);
        setReplyText('');
        setShowReplyInput(false);
    }

    return (
        <div className="reply-container">
            <input className='reply-input' onChange={(e) => setReplyText(e.target.value)} placeholder="enter text" onKeyDown={(e) => {e.key === 'Enter' && handleReply(e.target.value)}}/>
            <button className="reply-post-btn" onClick={() => handleReply(replyText)}>Post</button>
        </div>
    )
}
export default ReplyComment;