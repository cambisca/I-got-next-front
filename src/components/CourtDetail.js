import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlayerCard from "./PlayerCard";
import ReviewCard from "./ReviewCard";
import "semantic-ui-css/semantic.min.css";
import { Modal, Button } from "semantic-ui-react";
// import { Button, Comment, Header, Form } from 'semantic-ui-react'

function CourtDetail({ currentUser, courts, favorites, setFavorites }) {
  const [runs, setRuns] = useState([]);
  const [activeFav, setActiveFav] = useState(false);
  const [activeAyo, setActiveAyo] = useState(false);
  const [toggleComment, setToggleComment] = useState(false);
  const [courtReviews, setCourtReviews] = useState([]);
  const [currentRun, setCurrentRun] = useState(0);
  const [open, setOpen] = useState(false);
  // const [commentSubmit, setCommentSubmit] = useState(false)

  const [commentForm, setCommentForm] = useState({
    comment: "",
  });

  console.log(currentRun);

  const [findCourt, setFindCourt] = useState({
    id: 0,
    name: "",
    address: "",
    borough: "",
    zip_code: 0,
    condition: "",
    latitude: 0,
    longitude: 0,
    trains: [],
    img_url: "",
  });

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
    console.log(currentUser);
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
      .then((response) => response.json())
      .then((newRun) => {
        setRuns([...runs, newRun]);
        setCurrentRun(newRun.id);
      });
  }

  console.log(currentRun);

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
    // history.push("/")
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
        paramsId={id}
        commentForm={commentForm}
        onHandleCommentChange={handleCommentChange}
        onHandleUpdateComment={handleUpdateComment}
      />
    );
  });

  // let renderReviews = findCourt.reviews.map((review) => {
  //     return <ReviewCard review={review}/>
  // })

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
    console.log("hit");
    setToggleComment(!toggleComment);
  }

  function handleCommentSubmit(e) {
    e.preventDefault();

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
    // history.push(`/courts/${id}`)
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
  // function handleDeleteFav(id){
  //     console.log(id)
  //     setActiveFav(!activeFav)
  //     const updatedFavs = favorites.filter(favorite => favorite.id !== id)
  //     setFavorites(updatedFavs)

  // }

  // function deleteFavRequest(id){
  //     fetch(`http://localhost:3000/favorites/${id}`,{
  //         method: 'DELETE',
  //     })
  //     .then(response => response.json())
  //     .then((favData) => {
  //         handleDeleteFav(favData.id)})
  // }

  console.log(!activeAyo);

  // setTimeout(function(){ if open ? setOpen(false)}, 3000)

  return (
    <div class="detail-wrapper">
      <div class="box-1"></div>

      <div class="box-2"></div>

      <div class="box-3"></div>

      <div class="box-4">
        <div class="review-card-container">{displayCourtReviews}</div>
      </div>

      <div class="detail-box">
        {/* <div class="detail-image"> */}
        <img
          src={findCourt.img_url}
          alt={findCourt.name}
          class="detail-image"
        ></img>
        {/* </div> */}
        {/* {!modalState ?  */}
        <div class="court-details">
          <h1> {findCourt.name} </h1>

          <h2>
            {" "}
            {findCourt.address}, {findCourt.borough} {findCourt.zip_code}{" "}
          </h2>

          <h3> Condition: {findCourt.condition} </h3>

          <h3> Nearby trains: </h3>

          <Modal
            basic
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size="small"
            trigger={
              activeAyo ? (
                <Button class="ign-p detail-icons" onClick={handleDeleteAyo}>
                  {" "}
                  Nvm{" "}
                </Button>
              ) : (
                <Button class="ign-p detail-icons" onClick={handleAyo}>
                  {" "}
                  Ayo!{" "}
                </Button>
              )
            }
          >
            {activeAyo ? "AYO! I GOT NEXT" : "NAH IM OUT"}
          </Modal>

          <Button class="detail-icons" onClick={handleFavOn}>
            {" "}
            Fav{" "}
          </Button>

          {!toggleComment ? (
            <Button class="leave-comment" onClick={toggleLeaveComment}>
              Leave a comment
            </Button>
          ) : (
            <form class="comment-form" onSubmit={handleCommentSubmit}>
              <label htmlFor="comment"></label>
              <textarea
                name="comment"
                value={commentForm.comment}
                onChange={handleCommentChange}
                placeholder="Leave a comment"
              />
              <Button type="submit"> add comment </Button>
            </form>
          )}
        </div>
        {/* :  */}
        {/* <div className="modal-wrapper"> 
                     <div className={`modal-background modalShowing-${modalState}`}>
                         <div className="modal-inner"> 
                             <h1> AYO! </h1>
                             <h1> I GOT NEXT </h1>
                         </div> 
                    </div>
                </div> */}
        {/* // } */}
      </div>

      <div class="other-hoopers-box">
        <div class="other-hoopers-1">
          <h1>Other Hoopers coming through</h1>
        </div>
        <div class="other-hoopers-2">{displayCourtsHoopers}</div>
      </div>

      <div class="box-7"></div>

      <div class="box-8">
        <h1>
          Nearby Courts
          {displayNearbyCourts}
        </h1>
      </div>

      <div class="box-9"></div>
    </div>
  );
}

export default CourtDetail;
