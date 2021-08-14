import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './views/Home';
import NewMovieForm from './views/NewMovie';
import DetailMovie from './views/DetailMovie';
import Login from './views/Login';
import NewRate from './views/addRate';

function App() {
  return (
    <div className="App">
      <Router>       
        <Switch>         
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/new">
            <NewMovieForm/>
          </Route>
          <Route exact path="/details/:id">
            <DetailMovie/>
          </Route>
          <Route exact path="/addRate/:id">
            <NewRate/>
          </Route>
          <Route exact path="/">
            <Login/>
          </Route>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
