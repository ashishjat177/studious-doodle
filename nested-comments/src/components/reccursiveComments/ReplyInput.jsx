import { useState } from "react";

const ReplyInput = ({handleReply}) => {
    const [replyText, setReplyText] = useState('');

    return (
        <div className="reply-container">
            <input className='reply-input' onChange={(e) => setReplyText(e.target.value)} placeholder="enter text" onKeyDown={(e) => {e.key === 'Enter' && handleReply(e.target.value)}}/>
            <button className="reply-post-btn" onClick={() => handleReply(replyText)}>Post</button>
        </div>
    )
}
export default ReplyInput;