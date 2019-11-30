import React, { Component } from "react";
import axios from "axios";

export default class Iteration extends Component {
    state = {
        iterations: {},
        status: null
    }
    render(){
        axios.get("http://ec2-3-18-102-131.us-east-2.compute.amazonaws.com/iteration/read")
            .then(res =>{
                console.log(res.data);
                this.setState({
                    iterations: res.data,
                    status: 'success'
                })
            });
        return(
            <div id="iterations">
                {this.state.status === 'success' &&
                    <div>
                        {this.state.iterations.map((it) =>{
                            return(<h1>{it.name}</h1>);
                        })}
                    </div>
                }
            </div>
        );
    }
}