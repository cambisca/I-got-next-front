import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlayerCard from "./PlayerCard";
import ReviewCard from "./ReviewCard";
import "semantic-ui-css/semantic.min.css";
import { Button, Modal, Icon, Popup, Form, Message, Card, Image } from "semantic-ui-react";
// import { Button, Comment, Header, Form } from 'semantic-ui-react'

function CourtDetail({ currentUser, setCurrentUser, courts, favorites, setFavorites, findCourt, setFindCourt, runs, setRuns }) {
  // const [runs, setRuns] = useState([]);
  const [activeFav, setActiveFav] = useState(false);
  const [activeAyo, setActiveAyo] = useState(false);
  const [toggleComment, setToggleComment] = useState(false);
  const [courtReviews, setCourtReviews] = useState([]);
  const [currentRun, setCurrentRun] = useState(0);
  const [open, setOpen] = useState(false)
  const [runErrorMessages, setRunErrorMessages] = useState(null)
  // const [commentSubmit, setCommentSubmit] = useState(false)

  const [commentForm, setCommentForm] = useState({
    comment: "",
  });

  console.log(runs)

  const params = useParams();
  const id = parseInt(params.id);

  useEffect(() => {
    fetch(`http://localhost:3000/courts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFindCourt(data);
      });
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:3000/runs`)
      .then((response) => response.json())
      .then((runsArr) => {
        let updatedRuns = runsArr.filter((run) => run.court_id === id);
        setRuns(updatedRuns);
      });
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:3000/reviews`)
      .then((response) => response.json())
      .then((reviewsArr) => {
        let updatedReviews = reviewsArr.filter((rev) => rev.court.id === id);
        setCourtReviews(updatedReviews);
      });
  }, [id]);

  function handleAyo(e) {
    e.preventDefault();
    setActiveAyo((activeAyo) => !activeAyo);
    fetch("http://localhost:3000/runs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: findCourt.name,
        court_id: findCourt.id,
        user_id: currentUser.id,
      }),
    })
      .then((response) => {
          if(response.ok) {
            setRunErrorMessages(null)
            return response.json()
          } else {
              return response.json().then(errorData => {throw errorData})
          }
        })
      .then((newRun) => {
        setRuns([...runs, newRun]);
        setCurrentRun(newRun.id);
      }).catch(errorData => { setRunErrorMessages(errorData.errors)})
  }

  function deleteAyoHelper(id) {
    console.log(id, "hello");
    const updatedArray = runs.filter((run) => {
      return run.id !== currentRun;
    });
    setRuns(updatedArray);
  }

  function handleDeleteAyo() {
    fetch(`http://localhost:3000/runs/${currentRun}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then(deleteAyoHelper(currentRun));
        setActiveAyo(!activeAyo);
  }

  let displayCourtsHoopers;
  if (findCourt.name !== "") {
    displayCourtsHoopers = runs.map((run) => {
      return <PlayerCard key={run.id} user={run.user} />;
    });
  }

  let nearbyCourts = courts.filter(
    (court) => court.zip_code === findCourt.zip_code
  );
  let uniqueNearbyCourts = nearbyCourts.filter(
    (court) => court.name !== findCourt.name
  );
  let displayNearbyCourts = uniqueNearbyCourts.map((court) => {
    return <h1> {court.name} </h1>;
  });

  let displayCourtReviews = courtReviews.map((rev) => {
    return (
      <ReviewCard
        rev={rev}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        paramsId={id}
        commentForm={commentForm}
        onHandleCommentChange={handleCommentChange}
        onHandleUpdateComment={handleUpdateComment}
        courtReviews={courtReviews} 
        setCourtReviews={setCourtReviews}
      />
    );
  });

  function handleFavOn(e) {
    e.preventDefault();
    setActiveFav(!activeFav);

    fetch("http://localhost:3000/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        court_id: findCourt.id,
        user_id: currentUser.id,
      }),
    })
      .then((response) => response.json())
      .then((newFavorite) => {
        setFavorites([...favorites, newFavorite]);
      });
  }

  function toggleLeaveComment() {
    setToggleComment(!toggleComment);
  }

  function handleCommentSubmit(e) {
    e.preventDefault();
    setOpen(false)

    const newReview = {
      rating: null,
      comment: commentForm.comment,
      user_id: currentUser.id,
      court_id: id,
    };

    fetch("http://localhost:3000/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((response) => response.json())
      .then((newComment) => {
        setCourtReviews([...courtReviews, newComment]);
      });
    setToggleComment(!toggleComment);
  }

  function handleCommentChange(e) {
    setCommentForm({ ...commentForm, [e.target.name]: e.target.value });
  }

  function handleUpdateComment(updatedComment) {
    let updatedCommentsArr = courtReviews.map((rev) => {
      if (rev.id === updatedComment.id) {
        return updatedComment;
      } else {
        return rev;
      }
    });
    setCourtReviews(updatedCommentsArr);
  }


    const style = {
        borderRadius: 0,
        opacity: 1.7,
        padding: '2em',
      }

  let displayTrains;
  if (findCourt.trains.length > 0) {
    displayTrains = findCourt.trains.map((train) => train).join(', ')
  }

  let courtDetailActivity;
  if (runs.length > 20 ) {
      courtDetailActivity = <h3 class="hot-indicator activity-indicator">hot</h3>
  } else if (runs.length > 10 && findCourt.runs.length < 20) {
      courtDetailActivity = <h3 class="decent-indicator activity-indicator">decent</h3>
  } else if (runs.length > 5 && findCourt.runs.length <= 10) {
      courtDetailActivity = <h3 class="chill-indicator activity-indicator">chill</h3>
  } else if (runs.length < 5) {
      courtDetailActivity = <h3 class="slow-indicator activity-indicator">slow</h3>
  }

  return (
    <div class="detail-wrapper">
      <div class="detail-image">
        <img src={findCourt.img_url} alt={findCourt.name} class="detail-image"></img>
      <div>
          
      <div class="court-details">
        <h1> {findCourt.name} </h1>

        <h3>
          {findCourt.address}, {findCourt.borough} {findCourt.zip_code}
        </h3>

          <h3> Condition: {findCourt.condition} </h3>

          <p> {courtDetailActivity} </p>

          <h3> <Icon name='train'/> {displayTrains} </h3>

            {
              activeAyo ? (
                <Popup
                    trigger={<Button icon='hand peace' onClick={handleDeleteAyo}/>}
                    content="Nevermind I'M OUT!"
                    style={style}
                    inverted
                />
              ) : (
                <Popup
                    trigger={<Button icon='basketball ball' onClick={handleAyo}/>}
                    content='AYO! I GOT NEXT!'
                    style={style}
                    inverted
                />
               )
            }

          <Button class="detail-icons" onClick={handleFavOn}> 🖤  </Button>

          <Modal
            basic
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size='small'
            trigger={<Button class="leave-comment" onClick={toggleLeaveComment}>Leave a comment</Button>}
            >
            <Form class="comment-form" onSubmit={handleCommentSubmit}>
                <label htmlFor="comment"></label>
                <textarea
                    name="comment"
                    value={commentForm.comment}
                    onChange={handleCommentChange}
                    placeholder="Leave a comment"
                />
                <Button type="submit" color='green' inverted> <Icon name='checkmark' /> add comment </Button>
                <Button basic color='red' inverted onClick={() => setOpen(false)}>
                    <Icon name='remove' /> Close
                </Button>
            </Form>
          </Modal> 
        </div> 
     
      </div>

      <div class="other-hoopers-box">
        <div class="other-hoopers-1">
          <h1 class="others-coming-through">Other Hoopers coming through</h1>
        </div>
        <div class="other-hoopers-2">
          {displayCourtsHoopers}
        </div>
      </div>

      <div class="box-8">
        {runErrorMessages && <Message warning list={runErrorMessages}>
          <Message.Header>We heard you the first time! </Message.Header>
        
        </Message>}
      </div>
    </div>

    {/* <div>
      {displayCourtReviews} 
    </div> */}
    </div>
  );
}

export default CourtDetail;
