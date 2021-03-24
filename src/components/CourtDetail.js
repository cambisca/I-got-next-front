import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom"


function CourtDetail({currentUser, courts, favorites, setFavorites}){
    const [users, setUsers] = useState([]) // ==> findCourt.users
    const [runs, setRuns] = useState([])
    const [activeFav, setActiveFav] = useState(false)

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
            img_url: ""
        })


    const params = useParams()
    const id = params.id

    // if (courtsArray.length > 0) {
    //     setFindCourt(courtsArray.find(court => 
    //         court.id === parseInt(id)
    //     ))
    // }




    useEffect(() => {
        fetch(`http://localhost:3000/courts/${id}`)
        .then(response => response.json())
        .then( data => {setFindCourt(data)
            console.log(data)
            
        })
    },[id])



    useEffect(()=> {
        fetch(`http://localhost:3000/runs`)
        .then(response => response.json())
        .then((runsArr) => setRuns(runsArr))
      }, [])




    // const renderTrains = court.trains.map((train) => {
    //     return train
    // })

    // const nearbyCourts = courts.filter((court) => {
    //     return 

    // })

    // function addRun(newRun){
    //     setRuns([...runs, newRun])
    //   }

    function handleAyoClick(event){
        event.preventDefault()

        fetch('http://localhost:3000/runs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: findCourt.name,
                court: findCourt, 
                user: currentUser
            }),
          })
          .then(response => response.json())
          .then((newRun) => {
            setRuns([...runs, newRun]);
          })

          //fetch /users/${runs[-1].user_id}
          // [...users, fetchedUser]

        
    }

    let displayCourtsHoopers
    if (findCourt.name != ""){
        displayCourtsHoopers = findCourt.users.map((user) => {
        
            return (
                <div>
                    <h1> Player Cards</h1>
                    <h1> {user.name} </h1>
                </div>
            )

    })
    }
 

    // const displayNearbyCourts = courts.filter((kourt) => {
    //     return kourt.zip_code === findCourt.zip_code
    // })

    function handleFavClick(e){
        e.preventDefault()
        setActiveFav(!activeFav)
    
        fetch('http://localhost:3000/favorites', 
        {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                    },
            body: JSON.stringify({court_id: findCourt.id, user_id: currentUser.id }),
                })
            .then(response => response.json())
            .then((newFavorite) => {
                console.log(newFavorite)
            }) 
    }

    function handleDeleteFav(id){
        console.log(id)
        setActiveFav(!activeFav)
        const updatedFavs = favorites.filter(favorite => favorite.id !== id)
        setFavorites(updatedFavs)
        
    }

    function deleteFavRequest(id){
        fetch(`http://localhost:3000/favorites/${id}`,{
            method: 'DELETE',
        })
        .then(response => response.json())
        .then((favData) => {
            handleDeleteFav(favData.id)})
    }

    return (
        <div class="detail-wrapper">
            <div class="box-1"></div>
            <div class="box-2"></div>
            <div class="box-3"></div>
            <div class="box-4"></div>
            <div class="detail-box">
                <div class="detail-image">
                    <img src={findCourt.img_url} alt={findCourt.name}></img>
                </div>
                <div class="court-details">
                    <h1> {findCourt.name} </h1>
                    <h2> {findCourt.address}, {findCourt.borough} {findCourt.zip_code} </h2>
                    <h3> Condition: {findCourt.condition} </h3>
                    { <h3> Nearby trains: renderTrains </h3> }
                    <a class="ign-p detail-icons" onClick={handleAyoClick}> Ayo! </a>
                    {!activeFav ? <a class="detail-icons" onClick={handleFavClick}> Fav </a> : <a class="detail-icons" onClick={handleDeleteFav}> nvm </a>}
                    
                </div>
            </div>
            <div class="other-hoopers-box">
                <div class="other-hoopers-1">
                    <h1>Other Hoopers coming through</h1>
                </div>
                <div class="other-hoopers-2">
                    {displayCourtsHoopers}
                </div>
            </div>
            <div class="box-7"> 
                <img src="https://media4.giphy.com/media/fAQHjEYDT9GweWIcBq/giphy.gif"></img>
            </div>
            <div class="box-8"> 
                <h1>
                    Nearby Courts
                    {/* {displayNearbyCourts} */}
                </h1>
            </div>
            <div class="box-9"></div>
            
        </div>
    )
}

export default CourtDetail;