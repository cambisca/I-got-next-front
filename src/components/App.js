import '../App.css';
import { Route, Switch } from 'react-router-dom'
import HomePage from './HomePage'
import Discover from './Discover'
import NavBar from './NavBar'
import Login from './Login'
import CourtDetail from './CourtDetail'


function App() {
  return (
    <div class="wrapper">
      <Switch>
        <Route exact path="/">
          <NavBar />
          <HomePage />
        </Route>
        <Route exact path="/discover">
          <NavBar />
          <Discover />
        </Route>
        <Route exact path="/login">
          <NavBar />
          <Login />
        </Route>
        <Route exact path="/courts/:id">
          <NavBar />
          <CourtDetail />
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
