import React, { Component } from "react";
import axios from "axios";
import Global from '../Global';
import { Redirect } from "react-router-dom";
import swal from 'sweetalert';

//validacion de formulario y alertas

class EditIteration extends Component {

    url = Global.url;

    iterationId = null;
    videogameId = null;
    nameRef = React.createRef();
    descriptionRef = React.createRef();
    betaVerifRef = React.createRef();
    idRef = React.createRef();

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
                });
                this.videogameId = this.state.iteration.videogameId;
            });
    }

    componentWillMount(){
        this.iterationId = this.props.match.params.id;
        this.getIterations(this.iterationId);
    }
    changeState = () => {
        console.log(this.idRef.current.value);
        this.setState({
            iteration: {
                _id: this.idRef.current.value,
                name: this.nameRef.current.value,
                description: this.descriptionRef.current.value,
                betaVerificator: this.betaVerifRef.current.value,
            }
        });
        //console.log(this.state);
    }

    saveIteration = (e) => {
        e.preventDefault();
        this.changeState();
        axios.put(this.url+"iteration/update", this.state.iteration)
            .then(res => {
                if(res.data.ok == 1){
                    this.setState({
                        iteration: res.data,
                        status: 'success'
                    });
                    swal(
                        'Iteración',
                        'Iteración actualizada correctamente',
                        'success'
                    )
                }
                else {
                    this.setState({
                        status : 'failed'
                    })
                }
                console.log(res);
            });
    }
    render(){
        console.log(this.state);
        if(this.state.status === 'success'){
            return <Redirect to={"/iteration/readbyvideogame/"+this.videogameId}></Redirect>;
        }
        var iteration = this.state.iteration;
        //console.log(iteration);
        return(
            <div className="center">
                <section id="content">
                    <h1>Actualizar Iteración</h1>
                    <form className="mid-form" onSubmit={this.saveIteration} >   
                        <input type="hidden" name="_id" defaultValue={iteration._id} ref={this.idRef} onChange={this.changeState} ></input>
                        <div className="form-group row">
                            <label htmlFor="name" className="col-sm-2 col-form-label">Nombre</label>
                            <div className="col-sm-10">
                                <input type="text" name="name" defaultValue={iteration.name} ref={this.nameRef} onChange={this.changeState}  className="form-control"></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="description" className="col-sm-2 col-form-label">Descripción</label>
                            <div className="col-sm-10">
                                <input type="text" name="description" defaultValue={iteration.description} ref={this.descriptionRef} onChange={this.changeState}  className="form-control"></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="betaVerificator" className="col-sm-2 col-form-label">Verificador Beta</label>
                            <div className="col-sm-10">
                                <input type="number" name="betaVerificator" defaultValue={iteration.betaVerificator} ref={this.betaVerifRef} onChange={this.changeState}  className="form-control"></input>
                            </div>
                        </div>
                        <input type="submit" value="Guardar" className="btn btn-success" />

                    </form>
                </section>
            </div>
        )
    }
}

export default EditIteration;