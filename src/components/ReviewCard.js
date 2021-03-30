import React, {useState} from 'react' 
import { Button, Comment, Header, Form } from 'semantic-ui-react'

function ReviewCard({rev, user, currentUser, commentForm, onHandleUpdateComment}){
   
    const [editToggle, setEditToggle] = useState(false)
    const [updatedComment, setUpdatedComment] = useState(commentForm.comment)

    console.log(rev)
  

    function handleEditToggle(){
        setEditToggle(!editToggle)
    }

    function handleEditReviewSubmit(e){
        e.preventDefault()
        
        fetch(`http://localhost:3000/reviews/${rev.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment: updatedComment
            }),
        })
        .then(response => response.json())
        .then((data) => {
            onHandleUpdateComment(data)
            setEditToggle(!editToggle)
        })

    }

    return (
        // <Comment>
        //     <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
        //     <Comment.Content>
        //     <Comment.Author as='a'>{rev.user.username}</Comment.Author>
        //     <Comment.Metadata>
        //         <span>{rev.created_at}</span>
        //     </Comment.Metadata>
        //     <Comment.Text>{rev.comment}</Comment.Text>
            
        //     </Comment.Content>
        // </Comment>
        <div>
            {!editToggle ? 
                <div>
                    <h2>{rev.comment}</h2>
                    <h4>{user.username}</h4>
                    {rev.user.id === currentUser.id ? <button onClick={handleEditToggle}>Edit</button> : null } 
                </div>
            : 
                <form onSubmit={handleEditReviewSubmit}>
                    <label htmlFor="comment"></label>
                    <textarea 
                        name="comment"
                        value={updatedComment} 
                        onChange={e => setUpdatedComment(e.target.value)}
                    > 
                        {rev.comment} 
                    </textarea>
                    <button type="submit"> submit </button>
                </form>
                
            }
        </div>
    
    )
            
    
}

export default ReviewCard;