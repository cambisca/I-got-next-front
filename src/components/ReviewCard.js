import React, {useState} from 'react' 
import { Button, Card, Image } from 'semantic-ui-react'
// import { Button, Comment, Header, Form } from 'semantic-ui-react'

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
        <Card>
            <Card.Content>
                <Image
                floated='right'
                size='mini'
                src='https://ca.slack-edge.com/T02MD9XTF-U01E67VB0LW-08103bfa46da-512'
                />
                <Card.Header>{user.username}</Card.Header>
                <Card.Meta>{user.location}</Card.Meta>
                <Card.Description>
                    {rev.comment} 
                </Card.Description>
            </Card.Content>
            {user.id === currentUser.id ? 
                <Card.Content extra>
                    <div className='ui two buttons'>
                    <Button basic color='green'>
                        Edit
                    </Button>
                    <Button basic color='red'>
                        Delete
                    </Button>
                    </div>
                </Card.Content> 
                : null   
            }
                
        </Card>
        // <div>
        //     {!editToggle ? 
        //         <div>
        //             <h2>{rev.comment}</h2>
        //             <h4>{user.username}</h4>
        //             {rev.user.id === currentUser.id ? <button onClick={handleEditToggle}>Edit</button> : null } 
        //         </div>
        //     : 
        //         <form onSubmit={handleEditReviewSubmit}>
        //             <label htmlFor="comment"></label>
        //             <textarea 
        //                 name="comment"
        //                 value={updatedComment} 
        //                 onChange={e => setUpdatedComment(e.target.value)}
        //             > 
        //                 {rev.comment} 
        //             </textarea>
        //             <button type="submit"> submit </button>
        //         </form>
                
        //     }
        // </div>
    
    )
            
    
}

export default ReviewCard;