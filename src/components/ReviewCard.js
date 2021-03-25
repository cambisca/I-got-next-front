import React, {useState} from 'react' 

function ReviewCard({rev, user, currentUser, commentForm}){
   
    const [editToggle, setEditToggle] = useState(false)
    const [updatedComment, setUpdatedComment] = useState(commentForm.comment)
  

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
        .then(data => console.log(data))

    }

    return (
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