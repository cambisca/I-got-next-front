import '../App.css';
import {useState, useEffect} from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from './HomePage'
import Discover from './Discover'
import NavBar from './NavBar'
import Login from './Login'
import CourtDetail from './CourtDetail'


function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [courts, setCourts] = useState([])

  console.log(courts)
  useEffect(() => {

    const token = true;
    if (token)
    fetch('http://localhost:3000/me')
    .then((r) => r.json())
    .then((user) => {
      setCurrentUser(user)
    })
  }, [])


  return (
    <div class="wrapper">
      <Switch>
        <Route exact path="/">
          <NavBar currentUser={currentUser}/>
          <HomePage />
        </Route>
        <Route exact path="/discover">
          <NavBar currentUser={currentUser}/>
          <Discover 
            courts={courts}
            setCourts={setCourts}
          />
        </Route>
        <Route exact path="/login">
          <NavBar currentUser={currentUser}/>
          <Login setCurrentUser={setCurrentUser}/>
        </Route>
        <Route exact path="/courts/:id">
          <NavBar currentUser={currentUser}/>
          <CourtDetail 
            currentUser={currentUser}
            courts={courts}
            setCourts={setCourts}
          />
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
