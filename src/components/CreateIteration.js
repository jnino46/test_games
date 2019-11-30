import React, { Component } from "react";
import axios from "axios";
import Global from '../Global';
import { Redirect } from "react-router-dom";
import swal from 'sweetalert';

//validacion de formulario y alertas

class CreateIteration extends Component {

    url = Global.url;

    nameRef = React.createRef();
    descriptionRef = React.createRef();
    betaVerifRef = React.createRef();
    videogameIdRef = React.createRef();

    state = {
        iteration: {},
        status: null
    }

    changeState = () => {
        this.setState({
            iteration: {
                name: this.nameRef.current.value,
                description: this.descriptionRef.current.value,
                betaVerificator: this.betaVerifRef.current.value,
                videogameId: this.videogameIdRef.current.value
            }
        });
    }

    saveIteration = (e) => {
        e.preventDefault();
        this.changeState();
        axios.post(this.url+"iteration/save", this.state.iteration)
            .then(res => {
                if(res.data._id){
                    this.setState({
                        iteration: res.data,
                        status: 'success'
                    });

                    swal(
                        'Iteracion Nueva',
                        'Iteracion creada correctamente',
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
        if(this.state.status === 'success'){
            return <Redirect to="/"></Redirect>;
        }
        return(
            <div className="center">
                <section id="content">
                    <h1>Crear Iteracion</h1>
                    <form className="mid-form" onSubmit={this.saveIteration} >  
                        <input type="hidden" name="videogameId" value="10" ref={this.videogameIdRef} onChange={this.changeState} ></input>
                        <div className="form-group row">
                            <label htmlFor="name" className="col-sm-2 col-form-label">Nombre</label>
                            <div className="col-sm-10">
                                <input type="text" name="name" ref={this.nameRef} onChange={this.changeState}  className="form-control"></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="description" className="col-sm-2 col-form-label">Descripción</label>
                            <div className="col-sm-10">
                                <input type="text" name="description" ref={this.descriptionRef} onChange={this.changeState}  className="form-control"></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="betaVerificator" className="col-sm-2 col-form-label">Verificador Beta</label>
                            <div className="col-sm-10">
                                <input type="number" name="betaVerificator" ref={this.betaVerifRef} onChange={this.changeState}  className="form-control"></input>
                            </div>
                        </div>
                        <input type="submit" value="Guardar" className="btn btn-success" />
                    </form>
                </section>
            </div>

        )
    }
}

export default CreateIteration;