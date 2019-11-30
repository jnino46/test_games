import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Iterations from './components/Iterations';
import CreateIteration from './components/CreateIteration';
import EditIteration from './components/EditIteration';
import VideoGames from './components/VideoGames';
import HeaderNav from "./components/HeaderNav";


class Router extends Component {

    render(){
        return(
            <BrowserRouter>
                <HeaderNav />
                <Switch>
                    <Route exact path="/" component={VideoGames} />
                    <Route exact path="/iteration/read"  component={Iterations} />
                    <Route exact path="/iteration/edit/:id"  component={EditIteration} />
                    <Route exact path="/iteration/view/:id" render ={() =>(
                        <h1>dfasdf a</h1>
                    )} />
                    <Route exact path="/iteration/create" component ={CreateIteration} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;