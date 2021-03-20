// Third party
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// Projects
import HomeScreen from './containers/home'
import CreatePoint from './containers/createPoint'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={HomeScreen}/>
        <Route path='/create-point' component={CreatePoint} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes