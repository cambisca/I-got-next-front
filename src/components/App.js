import '../App.css';
import { Route, Switch } from 'react-router-dom'
import HomePage from './HomePage'
import Discover from './Discover'
import NavBar from './NavBar'
import Login from './Login'


function App() {
  return (
    <div class="wrapper">
      <Switch>
        <Route exact path="/">
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
      </Switch>
      
    </div>
  );
}

export default App;
