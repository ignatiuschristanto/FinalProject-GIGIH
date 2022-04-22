import './App.css';
import Login from './pages/LoginPage';
import {BrowserRouter as Switch, Route} from 'react-router-dom';
import Home from './pages/HomePage';
import { useTypedSelector } from './redux/store';


const App = () => {
  const isLogin = useTypedSelector((state) => state.authToken.isLogin)

  return (
    <div className='App'>
    <Switch>
      {isLogin? 
      <> 
      <Route path="/create-playlist" exact component = {Home}/> 
      </>
      : null
      }
      <Route path="/" component={Login} />
  </Switch>
  </div>
  );
}

export default App;
