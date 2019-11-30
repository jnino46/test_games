import React, { Component } from "react";
import axios from "axios";
import Global from '../Global';
import { Link, Redirect } from "react-router-dom";
import swal from 'sweetalert';

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
        swal({
            title: "Estas Seguro?",
            text: "Si eliminas este registro no podra ser recuperado",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
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
                    });
                    swal("Iteracion Eliminada Correctamente", {
                      icon: "delete",
                    });
                });
            } 
          });
    }
    render(){
        if(this.state.status === 'delete'){
            return <Redirect to="/"></Redirect>;
        }
        var listIteration = this.state.iterations.map((it) =>{
            return(
                <tr key={it._id}>
                    <td>{it.name}</td>
                    <td>{it.description}</td>
                    <td>{it.betaVerificator}</td>
                    <td>
                        <Link to={'/iteration/view/' + it._id} className="btn btn-info" type="button">Detalle</Link>
                        <Link to={'/iteration/edit/' + it._id} className="btn btn-warning" type="button">Editar</Link>
                        <button onClick={
                            () => {
                                this.deleteIteration(it._id);
                            }
                        } className="btn btn-danger" type="button">Eliminar</button>
                    </td>
                </tr>
            );
        });
        return(
            <div id="iterations">
                <Link to={'/iteration/create'} className="btn btn-primary" type="button">Crear Iteración</Link>
                <table  className="table">
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