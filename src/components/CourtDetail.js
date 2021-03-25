import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom"
import PlayerCard from './PlayerCard'


function CourtDetail({currentUser, courts, favorites, setFavorites, rerender, setRerender}){
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


    useEffect(() => {
        fetch(`http://localhost:3000/courts/${id}`)
        .then(response => response.json())
        .then( data => {setFindCourt(data)
        })
    },[id])

    

    useEffect(()=> {
        fetch(`http://localhost:3000/runs`)
        .then(response => response.json())
        .then((runsArr) => {
            console.log(findCourt)
            let updatedRuns = runsArr.filter((run) => {
                return run.court_id === findCourt.id
            })
            setRuns(updatedRuns)
        })
      }, [])

    console.log(runs)


    function handleAyo(e){
    e.preventDefault()
    fetch('http://localhost:3000/runs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: findCourt.name,
            court_id: findCourt.id, 
            user_id: currentUser.id
        }),
        })
        .then(response => response.json())
        .then((newRun) => {
            setRuns([...runs, newRun])
        })

    }


    //       //fetch /users/${runs[-1].user_id}
    //       // [...users, fetchedUser]


    console.log(runs)
   
    let displayCourtsHoopers
    if (findCourt.name != ""){
        displayCourtsHoopers = runs.map((run) => {
            console.log(run.user)
            return <PlayerCard user={run.user}/>
    })
    }
 
    let nearbyCourts = courts.filter((court) => court.zip_code === findCourt.zip_code)
    let uniqueNearbyCourts = nearbyCourts.filter((court) => court.name !== findCourt.name)
    console.log(uniqueNearbyCourts)
    let displayNearbyCourts = uniqueNearbyCourts.map((court) => {
        return <h1> {court.name} </h1>
    })
    
    

    // function handleFavClick(e){
    //     e.preventDefault()
    //     setActiveFav(!activeFav)
    
    //     fetch('http://localhost:3000/favorites', 
    //     {
    //         method: 'POST', 
    //         headers: {
    //             'Content-Type': 'application/json',
    //                 },
    //         body: JSON.stringify({court_id: findCourt.id, user_id: currentUser.id }),
    //     })
    //     .then(response => response.json())
    //     .then((newFavorite) => {
    //         console.log(newFavorite)
    //     }) 
    // }

    console.log(currentUser)
    function handleFavOn(e){
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

    return (
        <div class="detail-wrapper">
            <div class="box-1"></div>
            <div class="box-2"></div>
            <div class="box-3"></div>
            <div class="box-4">
                <h1> Court Reviews </h1>
            </div>
            <div class="detail-box">
                <div class="detail-image">
                    <img src={findCourt.img_url} alt={findCourt.name}></img>
                </div>
                <div class="court-details">
                    <h1> {findCourt.name} </h1>
                    <h2> {findCourt.address}, {findCourt.borough} {findCourt.zip_code} </h2>
                    <h3> Condition: {findCourt.condition} </h3>
                    { <h3> Nearby trains: renderTrains </h3> }
                    <button class="ign-p detail-icons" onClick={handleAyo}> Ayo! </button>
                    {!activeFav ? <button class="detail-icons" onClick={handleFavOn}> Fav </button> : <button class="detail-icons" > nvm </button>}
                    
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
                    {displayNearbyCourts}
                </h1>
            </div>
            <div class="box-9"></div>
            
        </div>
    )
}

export default CourtDetail;