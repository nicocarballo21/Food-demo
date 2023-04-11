import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import RecipesCreate from './components/RecipesCreate';
import DetailPage from "./components/DetailPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={HomePage} />
          <Route exact path="/recipes" component={RecipesCreate} />
          <Route path="/recipes/:id" component={DetailPage}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
