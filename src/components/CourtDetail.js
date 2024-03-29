import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlayerCard from "./PlayerCard";
import ReviewCard from "./ReviewCard";
import Header from './Header'
import "semantic-ui-css/semantic.min.css";
import { Button, Modal, Icon, Popup, Form, Message } from "semantic-ui-react";
// import { Button, Comment, Header, Form } from 'semantic-ui-react'

function CourtDetail({ currentUser, setCurrentUser, courts, favorites, setFavorites, findCourt, setFindCourt, runs, setRuns}) {
  // const [runs, setRuns] = useState([]);
  const [activeFav, setActiveFav] = useState(false);
  const [activeAyo, setActiveAyo] = useState(false);
  const [toggleComment, setToggleComment] = useState(false);
  const [courtReviews, setCourtReviews] = useState([]);
  const [currentRun, setCurrentRun] = useState(0);
  const [openCommentForm, setOpenCommentForm] = useState(false)
  const [openOtherHoopers, setOpenOtherHoopers] = useState(false)
  const [openReviews, setOpenReviews] = useState(false)
  const [runErrorMessages, setRunErrorMessages] = useState(null)


  const [commentForm, setCommentForm] = useState({
    comment: "",
  });


  const params = useParams();
  const id = parseInt(params.id);

  const getCurrentRun = runs.find(run => run.user.id === currentUser.id && run.court_id === id)

  useEffect(() => {
    if (favorites.find(fav => fav.user.id === currentUser.id && fav.court.id === id)) {
      setActiveFav(true)
    } else {
      setActiveFav(false)
    }
  }, [])

  useEffect(() => {
    if (getCurrentRun) {
      setCurrentRun(getCurrentRun.id)
    } else {
      setCurrentRun(null)
    }
  }, [])
  

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
        user={rev.user}
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

  let displayTrains;
  if (findCourt.trains.length > 0) {
    displayTrains = findCourt.trains.map((train) => train).join('  ,  ')
  }

  function handleFav(e) {
    e.preventDefault();
    if (!activeFav) {
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
    } else {
      let deleteId = favorites.find(fav => fav.user.id === currentUser.id && fav.court.id === id).id
      fetch(`http://localhost:3000/favorites/${deleteId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(deleteFav(deleteId))
    }
    setActiveFav(!activeFav);
  }

  function deleteFav(id){
    const updatedFavs = favorites.filter(fav => fav.id !== id)
    setFavorites(updatedFavs)
}

  function toggleLeaveComment() {
    setToggleComment(!toggleComment);
  }

  function handleCommentSubmit(e) {
    e.preventDefault();
    setOpenCommentForm(false)

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


  let courtDetailActivity;
  if (runs.length > 10 && findCourt.runs.length < 20) {
      courtDetailActivity = <span class="hot-indicator activity-indicator">HOT</span>
  } else if (runs.length > 5 && findCourt.runs.length <= 10) {
      courtDetailActivity = <span class="chill-indicator activity-indicator">CHILL</span>
  } else if (runs.length < 5) {
      courtDetailActivity = <span class="slow-indicator activity-indicator">SLOW</span>
  }

  const cantReview = courtReviews.filter(rev => rev.user.id === currentUser.id )


  return (
    <div class="detail-wrapper">
      <Header />
      <div class='detail-container'>
        <img src={findCourt.img_url} alt={findCourt.name} class="detail-image"/>

        <h1 class="court-name"> {findCourt.name} </h1>
        <div class="court-specs">
          <h3 class="court-address court-specs-items"> 
            <Icon name='point'/> 
              {findCourt.address}, {findCourt.borough} {findCourt.zip_code} 
          </h3>

          <p class="court-detail-trains court-specs-items">{findCourt.condition} </p>

          <p class="court-detail-trains court-specs-items"> <Icon color='teal' name='train'/> {displayTrains} </p>

          <p class="court-detail-trains court-specs-items"> {courtDetailActivity} </p>
            
        </div>

          <div class="interact-with-court">
            {
              !activeAyo ? 
                <button id="comment-button" class="court-interactions" onClick={handleAyo}> AYO! </button>
              :
                <button id="comment-button" class="court-interactions" onClick={handleDeleteAyo}> Im out </button>
            }

            { !activeFav ? 
              <button id="comment-button" class="court-interactions" class="detail-icons court-interactions" onClick={handleFav}> 
                <Icon color='white' name='heart'/> 
              </button> 
            : 
              <button id="comment-button" class="court-interactions" onClick={handleFav}> 
                <Icon color='red' name='heart'/> 
              </button> 
            }

              <Modal
                basic
                onClose={() => setOpenCommentForm(false)}
                onOpen={() => setOpenCommentForm(true)}
                open={openCommentForm}
                size='small'
                dimmer='blurring'
                trigger={<button id="comment-button" class="court-interactions" onClick={toggleLeaveComment}><Icon name='comment'/></button>}
                >
                <Form class="comment-form" onSubmit={handleCommentSubmit}>
                    <label htmlFor="comment"></label>
                    <textarea
                        name="comment"
                        value={commentForm.comment}
                        onChange={handleCommentChange}
                        placeholder="Leave a comment"
                    />
                    <Button type="submit" color='blue' inverted> 
                      <Icon name='checkmark' /> add comment 
                    </Button>
                    <Button basic color='orange' inverted onClick={() => setOpenCommentForm(false)}>
                        <Icon name='remove' /> Close
                    </Button>
                </Form>
              </Modal> 
          </div>
        
        <div class="court-detail-hoopers-reviews">
          <div class="other-hoopers-header"> 
              

              <Modal
                basic
                onClose={() => setOpenOtherHoopers(false)}
                onOpen={() => setOpenOtherHoopers(true)}
                open={openOtherHoopers}
                size='small'
                dimmer='blurring'
                mouseEnterDelay={1000}
                on='active'
                trigger={
                  <a class="hoopers-reviews-button hoopers"> 
                    Hoopers
                  </a>  
                }
              >
                <div class="court-modal-container">
                  <div class="other-hoopers-2">
                    {displayCourtsHoopers}
                  </div>
                  <Button  id="close-reviews-btn"basic color='white' inverted onClick={() => setOpenOtherHoopers(false)}>
                    <Icon name='remove' /> Close
                  </Button>
                </div>
                
              </Modal>
          </div>

          <div class="review-box">
            <div class="review-header" align="center">
              <Modal
                  basic
                  onClose={() => setOpenReviews(false)}
                  onOpen={() => setOpenReviews(true)}
                  open={openReviews}
                  size='large'
                  dimmer='blurring'
                  scrolling='true'
                  centered='true'
                  trigger={
                    <div class="hoopers-reviews-button reviews">
                      Reviews
                    </div>
                        
                  }
              >
                
                  <div class="review-list">
                    {displayCourtReviews}
                  </div>
                  <Button id="close-reviews-btn" basic color='orange' inverted onClick={() => setOpenReviews(false)}>
                    <Icon name='remove' /> Close
                  </Button>
                
              </Modal>
            
            </div>
          </div>
        </div>
        <div class="box-8">
          {runErrorMessages && <Message warning list={runErrorMessages}>
            <Message.Header>We heard you the first time! </Message.Header>
          
          </Message>}
        </div>
      </div>
    </div>
  );
}

export default CourtDetail;


