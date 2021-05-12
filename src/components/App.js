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


  return (
    <div class="wrapper">
      <Switch>
        <Route exact path="/">
          <HomePage />
          <NavBar 
            setCurrentUser={setCurrentUser}
            currentUser={currentUser}
          />
        </Route>
        <Route exact path="/discover">
          <Discover 
            courts={courts}
            setCourts={setCourts}
          />
          <NavBar 
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route exact path="/login">
          <NavBar 
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
          <Login 
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route exact path="/signup">
          <NavBar 
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
          <Signup 
            setUser={setCurrentUser}
          />
        </Route>
        <Route exact path="/courts/:id">
          <NavBar 
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
          <CourtDetail 
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            courts={courts}
            setCourts={setCourts}
            favorites={favorites}
            setFavorites={setFavorites}
            setRerender={setRerender}
            rerender={rerender}
          />
        </Route>
        <Route exact path="/favorites">
          <NavBar 
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
          <Favorites 
            favorites={favorites}
            setFavorites={setFavorites}
            currentUser={currentUser}
          />
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
