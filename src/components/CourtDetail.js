import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom"


function CourtDetail({currentUser, courts}){
    const [users, setUsers] = useState([]) // ==> findCourt.users
    const [runs, setRuns] = useState([])
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


    // const [court, setCourt] = useState([])
    
    // const [zip, setZip] = useState([])
    console.log("courts", courts)
    // const [court, setCourt] = useState({
    //     id: 0,
    //     name: "", 
    //     address: "", 
    //     borough: "",
    //     zip_code: 0, 
    //     condition: "", 
    //     latitude: 0, 
    //     longitude: 0, 
    //     trains: [], 
    //     img_url: ""
    // })


    const params = useParams()
    const id = params.id

    console.log(params)

    // let findCourt = {
    //         id: 0,
    //         name: "", 
    //         address: "", 
    //         borough: "",
    //         zip_code: 0, 
    //         condition: "", 
    //         latitude: 0, 
    //         longitude: 0, 
    //         trains: [], 
    //         img_url: ""
    //     }

    
    
    // if (courtsArray.length > 0) {
    //     setFindCourt(courtsArray.find(court => 
    //         court.id === parseInt(id)
    //     ))
    // }


    // console.log("filter", findCourt)

    useEffect(() => {
        fetch(`http://localhost:3000/courts/${id}`)
        .then(response => response.json())
        .then( data => {setFindCourt(data)
        setUsers(data.users)
        })
    },[id])

    console.log("user", users)

    useEffect(()=> {
        fetch(`http://localhost:3000/runs`)
        .then(response => response.json())
        .then((runsArr) => setRuns(runsArr))
      }, [])

      console.log(runs)


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
                court_id: findCourt.id, 
                user_id: currentUser.id
            }),
          })
          .then(response => response.json())
          .then((newRun) => {
            setRuns([...runs, newRun]);
          })

          //fetch /users/${runs[-1].user_id}
          // [...users, fetchedUser]

        
    }

    console.log(runs)
    console.log(findCourt)

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
    console.log(displayCourtsHoopers)

    

    // const displayNearbyCourts = courts.filter((kourt) => {
    //     return kourt.zip_code === findCourt.zip_code
    // })

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
                    <a class="detail-icons"> Fav </a>
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