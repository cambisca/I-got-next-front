import React, {useState, useEffect} from 'react' 
import { Button, Card, Image, Modal, Icon, Form } from 'semantic-ui-react'


function ReviewCard({rev, currentUser, setCurrentUser, commentForm, onHandleUpdateComment, courtReviews, setCourtReviews}){
   
    const [editToggle, setEditToggle] = useState(false)
    const [updatedComment, setUpdatedComment] = useState(commentForm.comment)

    const { id, comment, court, user } = rev
    console.log(user)
  

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

    function deleteCommentHelper(id) {
        console.log(id, "hello");
        const updatedArray = courtReviews.filter((review) => {
          return review.id !== id;
        });
        setCourtReviews(updatedArray);
      }

    function handleDeleteComment() {
        fetch(`http://localhost:3000/reviews/${id}`, {
          method: "DELETE",
        })
          .then((resp) => resp.json())
          .then(deleteCommentHelper(id));
      }

      let renderCommentCards;
      if (currentUser) {
          renderCommentCards = 
            (user.id === currentUser.id ) ? 
                <Card.Content extra>
                    <div className='ui two buttons'>
                    <Modal
                        basic
                        onClose={() => editToggle(false)}
                        onOpen={() => setEditToggle(true)}
                        open={editToggle}
                        size='small'
                        trigger={<Button basic color='green' onClick={handleEditToggle}> Edit </Button>}
                    > 
                        <Form class="comment-form" onSubmit={handleEditReviewSubmit}>
                            <label htmlFor="comment"></label>
                            <textarea
                                name="comment"
                                value={updatedComment}
                                onChange={e => setUpdatedComment(e.target.value)}
                                placeholder="Leave a comment"
                            />
                            <Button type="submit" color='green' inverted> <Icon name='checkmark' /> add comment </Button>
                            <Button basic color='red' inverted onClick={() => setEditToggle(false)}>
                                <Icon name='remove' /> Close
                            </Button>
                        </Form>
                    </Modal>
                    <Button basic color='red' onClick={handleDeleteComment}>
                        Delete
                    </Button>
                    </div>
                </Card.Content> 
                : null   
      }

    return (
        <div class="court-item-wrapper">
            <div class="court-card-pic">   
                <img src={user.img_url} class="court-item-image"></img>
            </div>
            <div class="court-card-info">
                <div> {user.username}</div>
                <div> {user.address}, {user.borough} {user.zip_code} </div>
                <div> {user.condition} </div>
            </div>
            
        </div>
        // <Card id="review-card">
        //     <Card.Content>
        //         <Image
        //         floated='right'
        //         size='mini'
        //         src={user.image}
        //         />
        //         <Card.Header>{user.username}</Card.Header>
        //         <Card.Meta>{user.location}</Card.Meta>
        //         <Card.Description>
        //             {rev.comment} 
        //         </Card.Description>
        //     </Card.Content>
        //     {/* {renderCommentCards} */}
                
        // </Card>
        // <Modal
        //     basic
        //     onClose={() => setOpen(false)}
        //     onOpen={() => setOpen(true)}
        //     open={open}
        //     size='small'
        //     trigger={<Button class="leave-comment" onClick={toggleLeaveComment}>Leave a comment</Button>}
        //     >
        //     <Form class="comment-form" onSubmit={handleCommentSubmit}>
        //         <label htmlFor="comment"></label>
        //         <textarea
        //             name="comment"
        //             value={commentForm.comment}
        //             onChange={handleCommentChange}
        //             placeholder="Leave a comment"
        //         />
        //         <Button type="submit" color='green' inverted> <Icon name='checkmark' /> add comment </Button>
        //         <Button basic color='red' inverted onClick={() => setOpen(false)}>
        //             <Icon name='remove' /> Close
        //         </Button>
        //     </Form>
        // </Modal> 

        // <Card>
        //     <Card.Content>
        //         <Image
        //         floated='right'
        //         size='mini'
        //         src='https://ca.slack-edge.com/T02MD9XTF-U01E67VB0LW-08103bfa46da-512'
        //         />
        //         <Card.Header>{user.username}</Card.Header>
        //         <Card.Meta>{user.location}</Card.Meta>
        //         <Card.Description>
        //             {rev.comment} 
        //         </Card.Description>
        //     </Card.Content>
        //     {user.id === currentUser.id ? 
        //         <Card.Content extra>
        //             <div className='ui two buttons'>
        //             <Button basic color='green' onClick={handleEditToggle}>
        //                 Edit
        //             </Button>
        //             <Button basic color='red'>
        //                 Delete
        //             </Button>
        //             </div>
        //         </Card.Content> 
        //         : null   
        //     }
                
        // </Card>
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