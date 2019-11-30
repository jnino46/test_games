import React, { Component } from "react";
import axios from "axios";
import Global from '../Global';
import { Link } from "react-router-dom";

export default class Iterations extends Component {
    url = Global.url;
    state = {
        iterations: [],
        status: null
    }

    componentWillMount(){
        this.getIterations();
    }
    getIterations = () => {
        axios.get(this.url + "iteration/read")
            .then(res =>{
                console.log(res.data);
                this.setState({
                    iterations: res.data,
                    status: 'success'
                })
            });
    }
    deleteIteration = (id) => {
        var it = {
            "iterationId": id
        };
        axios.delete(this.url + "iteration/delete", 
            {headers: {
                "Content-Type": "application/json"
            },
            data: it
            }
          )
          .then(res =>{
                console.log(res.data);
                this.setState({
                    iterations: res.data,
                    status: 'success'
                })
            });
    }
    render(){
        var listIteration = this.state.iterations.map((it) =>{
            return(
                <tr key={it._id}>
                    <td>{it.name}</td>
                    <td>{it.description}</td>
                    <td>{it.betaVerificator}</td>
                    <td>
                        <Link to={'/iteration/view/' + it._id}>Detalle</Link>
                        <Link to={'/iteration/edit/' + it._id}>Editar</Link>
                        <button onClick={
                            () => {
                                this.deleteIteration(it._id);
                            }
                        }>Eliminar</button>
                    </td>
                </tr>
            );
        });
        return(
            <div id="iterations">
                <Link to={'/iteration/create'}>Crear Iteración</Link>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripcion</th>
                            <th>Verificador Beta</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listIteration}
                    </tbody>
                </table>
            </div>
        );
    }
}