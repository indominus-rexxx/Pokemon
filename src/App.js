import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import EvolutionChain from './components/evolution-chain';
import { PokemonItem } from './components/pokemon-item';
import PokemonList from './components/pokemon-list';
import store from './redux/store';

export default class App extends Component {
    render() {
        return (
            <Provider store = {store}>
                <Router>
                      <Switch>
                          <Route exact path="/">
                              <Redirect to="/pokemon-list"/>
                          </Route>
                          <Route exact path="/pokemon-list" component={PokemonList}/>
                          <Route exact path="/pokemon-list/:id" component={PokemonItem}/>
                          <Route path="/pokemon-list/:id/evolution-chain" component={EvolutionChain}/>
                    </Switch>
                </Router>
            </Provider>
        )
    }
}