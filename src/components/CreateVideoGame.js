import React, { Component } from "react";
import axios from "axios";
import Global from '../Global';
import { Redirect } from "react-router-dom";
import swal from 'sweetalert';

//validacion de formulario y alertas

class CreateVideoGame extends Component {

    url = Global.url;

    nameRef = React.createRef();
    descriptionRef = React.createRef();

    state = {
        videogame: {},
        status: null
    }

    changeState = () => {
        this.setState({
            videogame: {
                name: this.nameRef.current.value,
                description: this.descriptionRef.current.value,
            }
        });
    }

    savevideogame = (e) => {
        e.preventDefault();
        this.changeState();
        axios.post(this.url+"videogame/save", this.state.videogame)
            .then(res => {
                if(res.data._id){
                    this.setState({
                        videogame: res.data,
                        status: 'success'
                    });

                    swal(
                        'Video Juego Nuevo',
                        'Video Juego creado correctamente',
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
                    <h1>Crear Video Juego</h1>
                    <form className="mid-form" onSubmit={this.savevideogame} >  
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
                        <input type="submit" value="Guardar" className="btn btn-success" />
                    </form>
                </section>
            </div>

        )
    }
}

export default CreateVideoGame;