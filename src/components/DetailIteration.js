import React, { Component } from "react";
import axios from "axios";
import Global from '../Global';
import { Redirect } from "react-router-dom";

class DetailIteration extends Component {
    url = Global.url;

    state = {
        iteration: {},
        status: null
    }

    
    getIterations = (id) => {
        axios.get(this.url + "iteration/read")
            .then(res =>{
                console.log(res.data);
                this.setState({
                    iteration: res.data.filter(it => it._id == id)[0],
                })
            });
    }

    componentWillMount(){
        this.iterationId = this.props.match.params.id;
        console.log("id: ", this.iterationId);
        this.getIterations(this.iterationId);
    }

    render(){
        console.log(this.state);
        return(
            <div>
                <h1>Detalle Iteracion</h1>
                <h1>{this.state.iteration.name}</h1>
                <h1>{this.state.iteration.description}</h1>
                <h1>{this.state.iteration.betaVerificador}</h1>

            </div>
        );
    }
}

export default DetailIteration;