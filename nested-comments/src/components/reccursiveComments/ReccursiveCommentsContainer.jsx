import { useState } from "react";
import Comments from './Comments'

const ReccursiveCommentsContainer = ({data}) => {
    const [commentData, setCommentData] = useState(data);

    const onReply = (value, id) => {
        const iterateReplies = (data) => {
          return data.map((item) => {
            if(item.id === id) {
             return {...item, children: [...item.children, {label: value, id: new Date().getTime(), children: []}]}
            } else {
              if('children' in item && Array.isArray(item.children) && item.children.length) {
                  const result = {...item, children: iterateReplies(item.children) } 
                  if(result) {
                    return result;
                  }
              }
              return item;
            } 
    
          })
        }
    
        setCommentData((prev) => iterateReplies(prev))
     }
    
     const onDeleteComment = (id) => {
        
        const deleteComment = (data) => {
          return data.filter((node) => node.id !== id).map((childrenNode) => {
               if('children' in childrenNode && Array.isArray(childrenNode.children) && childrenNode.children.length) {
                return {...childrenNode, children: deleteComment(childrenNode.children)}
               }
               return childrenNode;
            })
        }
    
        setCommentData((prev) => deleteComment(prev))
     }
    
      return (
        <>
          <Comments commentData={commentData} setCommentData={setCommentData} onReply={onReply} onDeleteComment={onDeleteComment}/>
        </>
      )
}

export default ReccursiveCommentsContainer;
