import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Iterations from './components/Iterations';
import CreateIteration from './components/CreateIteration';
import EditIteration from './components/EditIteration';


class Router extends Component {

    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Iterations} />
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