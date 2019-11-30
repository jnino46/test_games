import React, { Component } from "react";
import axios from "axios";
import Global from '../Global';
import { Redirect } from "react-router-dom";
import swal from 'sweetalert';

//validacion de formulario y alertas

class CreateAspect extends Component {

    url = Global.url;
    iterationId = null;
    nameRef = React.createRef();
    descriptionRef = React.createRef();
    iterationIdRef = React.createRef();

    state = {
        aspect: {},
        status: null
    }

    componentWillMount(){
        this.iterationId = this.props.match.params.id;
    }

    changeState = () => {
        this.setState({
            aspect: {
                name: this.nameRef.current.value,
                description: this.descriptionRef.current.value,
                iterationId: this.iterationIdRef.current.value
            }
        });
    }

    saveAspect = (e) => {
        e.preventDefault();
        this.changeState();
        axios.post(this.url+"aspect/save", this.state.aspect)
            .then(res => {
                if(res.data._id){
                    this.setState({
                        aspect: res.data,
                        status: 'success'
                    });

                    swal(
                        'Aspecto Nuevo',
                        'Aspecto nuevo creado correctamente',
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
            return <Redirect to="/iteration/read"></Redirect>;
        }
        return(
            <div className="center">
                <section id="content">
                    <h1>Crear Aspecto</h1>
                    <form className="mid-form" onSubmit={this.saveAspect} >  
                        <input type="hidden" name="iterationId" defaultValue={this.iterationId} ref={this.iterationIdRef} onChange={this.changeState} ></input>
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

export default CreateAspect;