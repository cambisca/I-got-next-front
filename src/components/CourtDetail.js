import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom"


function CourtDetail({currentUser}){
    const [court, setCourt] = useState([])
    const [runs, setRuns] = useState([])

    console.log(court)
    console.log(runs)
    console.log(currentUser)

    const params = useParams()
    const id = params.id

    useEffect(() => {
        fetch(`http://localhost:3000/courts/${id}`)
        .then(response => response.json())
        .then((courtData)=> {
            setCourt(courtData)
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

    function addRun(newRun){
        // console.log(newFav)
        setRuns([...runs, newRun])
      }

    function handleAyoClick(event){
        event.preventDefault()

        fetch('http://localhost:3000/runs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: court.name,
                court_id: court.id, 
                user_id: currentUser.id
            }),
          })
          .then(response => response.json())
          .then((newRun) => {
              console.log(newRun)
            addRun(newRun);
          })
    }


    const displayCourtsHoopers = runs.filter((run) => {
        return run.name === court.name
    }).map((run) => {
        console.log(run.user)
        return <h1> {run.user} </h1>
    })


    return (
        <div class="detail-wrapper">
            <div class="box-1"></div>
            <div class="box-2"></div>
            <div class="box-3"></div>
            <div class="box-4"></div>
            <div class="detail-box">
                <div class="detail-image">
                    <img src={court.img_url} alt={court.name}></img>
                </div>
                <div class="court-details">
                    <h1> {court.name} </h1>
                    <h2> {court.address}, {court.borough} {court.zip_code} </h2>
                    <h3> Condition: {court.condition} </h3>
                    { <h3> Nearby trains: renderTrains </h3> }
                    <a class="ign-p detail-icons" onClick={handleAyoClick}> Ayo! </a>
                    <a class="detail-icons"> Fav </a>
                </div>
            </div>
            <div class="other-hoopers-box">
                {displayCourtsHoopers}
            </div>
            <div class="box-7"> 
                <img src="https://media4.giphy.com/media/fAQHjEYDT9GweWIcBq/giphy.gif"></img>
            </div>
            <div class="box-8"></div>
            <div class="box-9"></div>
            
        </div>
    )
}

export default CourtDetail;