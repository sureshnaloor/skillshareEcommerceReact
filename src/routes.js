import React from 'react'

import Phones from './containers/phones'
import Phone from './containers/phone'
import Basket from './containers/basket'
import {Switch, Route} from 'react-router'

export default (
  <Switch>
    <Route path="/" component={Phones} exact></Route>
    <Route path="/basket" component={Basket}></Route>
    <Route path="/categories/:id" component={Phones} />
    <Route path="/phones/:id" component={Phone}></Route>
  </Switch>
)
