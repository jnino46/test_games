import React, { Component } from "react";
import axios from "axios";
import Global from '../Global';
import { Link, Redirect } from "react-router-dom";

class DetailIteration extends Component {
    url = Global.url;

    state = {
        iteration: {},
        aspects: [],
        status: null
    }


    getIterations = (id) => {
        axios.get(this.url + "iteration/read")
            .then(res => {
                console.log(res.data);
                this.setState({
                    iteration: res.data.filter(it => it._id == id)[0],
                })
            });
    }
    getAspects = (id) => {
        axios.get(this.url + "aspect/read")
            .then(res => {
                console.log(res.data);
                this.setState({
                    aspects: res.data.filter(as => as.iterationId == id),
                })
            });
    }

    componentWillMount() {
        this.iterationId = this.props.match.params.id;
        console.log("id: ", this.iterationId);
        this.getIterations(this.iterationId);
        this.getAspects(this.iterationId);
    }

    render() {
        console.log(this.state);
        var listAspects = this.state.aspects.map((asp) => {
            return (
                <tr key={asp._id}>
                    <td>{asp.name}</td>
                    <td>{asp.description}</td>
                </tr>
            );
        });
        return (
            <div>
                <Link to={'/iteration/readbyvideogame/'+this.state.iteration.videogameId} className="btn btn-primary" type="button">Volver</Link>
                <h1>Detalle Iteracion</h1>
                <div className="card" >
                    <div className="card-body">
                        <h5 className="card-title">{this.state.iteration.name}</h5>
                        <p className="card-text">{this.state.iteration.description}</p>
                        <h6 className="card-subtitle mb-2 text-muted">{this.state.iteration.betaVerificador}</h6>
                    </div>
                </div>

                <div id="aspects">
                    <h2>Detalle Aspectos</h2>
                    <Link to={'/aspect/create/'+this.iterationId} className="btn btn-primary" type="button">Crear Aspecto</Link>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripcion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listAspects}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default DetailIteration;