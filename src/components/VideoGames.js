import React, { Component } from "react";
import axios from "axios";
import Global from '../Global';
import { Link } from "react-router-dom";

export default class VideoGames extends Component {
    url = Global.url;
    state = {
        videogames: [],
        status: null
    }

    componentWillMount(){
        this.getVideoGames();
    }
    getVideoGames = () => {
        axios.get(this.url + "videogame/read")
            .then(res =>{
                console.log(res.data);
                this.setState({
                    videogames: res.data,
                    status: 'success'
                })
            });
    }
    
    render(){
        var listVideoGame = this.state.videogames.map((it) =>{
            return(
                <tr key={it._id}>
                    <td>{it.name}</td>
                    <td>{it.description}</td>
                    <td>
                        <Link to={'/iteration/read'}>Iteraciones</Link>
                    </td>
                </tr>
            );
        });
        return(
            <div id="iterations">
                <Link to={'/videogame/create'}>Crear Video Juego</Link>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripcion</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listVideoGame}
                    </tbody>
                </table>
            </div>
        );
    }
}