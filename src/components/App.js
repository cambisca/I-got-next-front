import '../App.css';
import {useState, useEffect} from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from './HomePage'
import Discover from './Discover'
import NavBar from './NavBar'
import Login from './Login'
import CourtDetail from './CourtDetail'
import Favorites from './Favorites'
import Signup from './Signup'


function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [courts, setCourts] = useState([])
  const [favorites, setFavorites] = useState([])
  const [rerender, setRerender] = useState(false)
  const [runs, setRuns] = useState([]);
  const [boroughSelect, setBoroughSelect] = useState("All")
  const [search, setSearch] = useState("")

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


  useEffect(()=>{
    fetch(`http://localhost:3000/courts`)
    .then((response) => response.json())
    .then(data => {
        setCourts(data)
    })
  },[])


  useEffect(() => {

    const token = localStorage.getItem("token")
    if (token) {
      fetch('http://localhost:3000/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    })
    .then((r) => r.json())
    .then((user) => {
      setCurrentUser(user)
    })
    }
  }, [])

  let courtActivity;
    if (runs.length > 40) {
        courtActivity = "🔥🔥🔥🔥🔥"
    } else if (runs.length > 20 && findCourt.runs.length < 30) {
        courtActivity = "🔥🔥🔥🔥"
    } else if (runs.length > 10 && findCourt.runs.length < 20) {
        courtActivity = "🔥🔥🔥"
    } else if (runs.length > 5 && findCourt.runs.length <= 10) {
        courtActivity = "🔥🔥"
    } else if (runs.length < 5) {
        courtActivity = "🔥"
    }

    // const wholeCourtObj = courts.filter(court => key)

    const filteredBorough = courts.filter((court) => {
      if (boroughSelect === "All") {
        return courts
      } else if (boroughSelect === "Brooklyn") {
        return court.borough === "Brooklyn"
      } else if (boroughSelect === "Queens") {
        return court.borough === "Queens"
      } else if (boroughSelect === "New York") {
        return court.borough === "New York"
      } else if (boroughSelect === "Bronx") {
          return court.borough === "Bronx"
      } else if (boroughSelect === "Staten Island") {
          return court.borough === "Staten Island"
      }
    });

  const courtSearch = filteredBorough.filter((court) => {
      return court.name.includes(search)
  })


  return (
    <div class="wrapper">
      <Switch>
        <Route exact path="/">
          <HomePage currentUser={currentUser}/>
          {currentUser ? <NavBar 
            setCurrentUser={setCurrentUser}
            currentUser={currentUser}
          /> : null }
        </Route>
        <Route exact path="/discover">
          <Discover 
            courts={courts}
            setCourts={setCourts}
            courtActivity={courtActivity}
            search={search}
            setSearch={setSearch}
            setBoroughSelect={setBoroughSelect}
            courtSearch={courtSearch}
          />
          <NavBar 
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route exact path="/login">
          <Login 
            setCurrentUser={setCurrentUser}
          />
          <NavBar 
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route exact path="/signup">
          <Signup 
            setUser={setCurrentUser}
          />
          <NavBar 
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route exact path="/courts/:id">
          <CourtDetail 
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            courts={courts}
            setCourts={setCourts}
            favorites={favorites}
            setFavorites={setFavorites}
            setRerender={setRerender}
            rerender={rerender}
            findCourt={findCourt}
            setFindCourt={setFindCourt}
            runs={runs} 
            setRuns={setRuns}
          />
          <NavBar 
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route exact path="/favorites">
          <Favorites 
            courts={courts}
            favorites={favorites}
            setFavorites={setFavorites}
            currentUser={currentUser}
          />
          <NavBar 
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
