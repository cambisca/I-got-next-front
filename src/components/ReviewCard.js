import React, {useState, useEffect} from 'react' 
import { Button, Card, Image, Modal, Icon, Form } from 'semantic-ui-react'


function ReviewCard({rev, user, currentUser, setCurrentUser, commentForm, onHandleUpdateComment, courtReviews, setCourtReviews}){
   
    const [editToggle, setEditToggle] = useState(false)
    const [updatedComment, setUpdatedComment] = useState(commentForm.comment)

    const { id, comment, court } = rev
  

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
                    <div class='review-card-buttons'>
                    <Modal
                        basic
                        onClose={() => editToggle(false)}
                        onOpen={() => setEditToggle(true)}
                        open={editToggle}
                        size='small'
                        dimmer='blurring'
                        trigger={
                            <button class="login-button review-button" onClick={handleEditToggle}> 
                                Edit 
                            </button>
                        }
                    > 
                        <Form class="comment-form" onSubmit={handleEditReviewSubmit}>
                            <label htmlFor="comment"></label>
                            <textarea
                                name="comment"
                                value={updatedComment}
                                onChange={e => setUpdatedComment(e.target.value)}
                                placeholder="Leave a comment"
                            />
                            <Button type="submit" color='green' inverted> <Icon name='checkmark' /> edit comment </Button>
                            <Button basic color='red' inverted onClick={() => setEditToggle(false)}>
                                <Icon name='remove' /> Close
                            </Button>
                        </Form>
                    </Modal>
                    <button class="login-button" onClick={handleDeleteComment}>
                        Delete
                    </button>
                    </div>
                </Card.Content> 
                : null   
      }

    return (
        <div class="court-item-wrapper">
            <div class="court-card-pic">   
                <img src={user.image} class="court-item-image"></img>
            </div>
            <div class="court-card-info">
                <div> {comment}</div>
                <div> - {user.username}</div>
                {renderCommentCards}
            </div>
            
        </div>
    )   
}

export default ReviewCard;