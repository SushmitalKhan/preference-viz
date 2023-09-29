import React from "react";
import {Row} from "react-bootstrap";
import { Link } from "react-router-dom";
import RightPanel from "./RightPanel";
import LeftPanel from "./LeftPanel";
import DialogB from "./DialogB";



class DcExp extends React.Component{
    constructor(props) {
        super(props);
        this.popupRef = React.createRef();
        this.state = {
            items: 
            {
                me: {},
                comm: {}
            },
            DataisLoaded: false,
            activeMovie: undefined,
            message: '',
        };
    }

    handleClick(num, text) {
        this.setState({
          count: this.state.count + num,
          message: text,
        });
      }

    movieClickHandler = (movie, text) =>{
    this.setState({
        activeMovie: movie,
        message: text,
    })
}

    componentDidMount() {
        fetch("https://rssa.recsys.dev/newrs/api/v1/movies/?skip=0&limit=20")
        // https://mockend.com/SushmitalKhan/demo/ratings"
            .then((res) => res.json())
            .then((json) => {
                const mlike = json.slice(0, 5);
                const mhate = json.slice(5, 10);
                const clike = json.slice(10, 15);
                const chate = json.slice(15, 20);

                console.log(mlike);
                console.log(mhate);
                console.log(clike);
                

                this.setState({
                    items: {
                        me: {
                            like: mlike,
                            dislike: mhate
                        },
                        comm: {
                            like: clike,
                            dislike: chate
                        }
                    },
                    DataisLoaded: true
                });
            })

            document.addEventListener('mousedown', this.handleClickOutside);
        }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        }

    openPopup = () => {
        this.setState({ isOpen: true });
      };
    
    closePopup = () => {
        this.setState({ isOpen: false });
      };
    
    handleClickOutside = (event) => {
        if (this.popupRef.current && !this.popupRef.current.contains(event.target)) {
          this.closePopup();
        }
      };

    render(){
        const { DataisLoaded, items, isOpen } = this.state;

        if (!DataisLoaded) 
        return 
        <div><h1> Please wait some time.... </h1></div>

        return(

        <div class = "container my-container">
            <div class = "row"> 
                <header><h1>Continuous Decoupled Visualization - Explicit</h1></header>
            </div>

            <div class = "row">
                <div class = "col-sm-2" style={{border: "1px solid #ccc"}}>
                    <LeftPanel/>
                </div>

                <div class = "col-sm-8">
                    <div class = "row-5 my-container">
                        <div class = "col">
                            <div class = "row my-container">
                                <div class = "col-6 my-container" style={{ borderRight: "1px solid #ccc"}}>
                                    <hr></hr>
                                    <h3 style={{ textAlign: "center" }}>Movie you Like but your Community Dislikes</h3>
                                <div class = "row">
                                    <div class = "col">
                                        <div class = "row">
                                        {items.me.like.map((movie) => (
                                            <div class = "col-3 my-container">
                                                <div key = {movie.id}>
                                                    <button onClick = {() => {this.movieClickHandler(movie, 'text')}}>
                                                        <img className="img" src = {movie.poster} alt = {movie.title} />
                                                    </button>
                                                </div>
                                            </div>
                                            )
                                        )}
                                        {items.comm.dislike.map((movie) => (
                                            <div class = "col-3 my-container">
                                                <div key = {movie.id}>
                                                    <button onClick = {() => {this.movieClickHandler(movie, 'text')}}>
                                                        <img className="img" src = {movie.poster} alt = {movie.title} />
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                        )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-6 my-container">
                                <hr></hr>
                                <h3 style={{textAlign: "center"}}>Movies You Dislike and Your Community Like</h3>
                            <div class = "row">
                                <div class = "col">
                                    <div class = "row">
                                    {items.me.dislike.map((movie) => (
                                                    <div class = "col-3 my-container">
                                                        <div key = {movie.id}>
                                                            <button onClick = {() => {this.movieClickHandler(movie, 'text')}}>
                                                                <img className="img" src = {movie.poster} alt = {movie.title} />
                                                            </button>
                                                        </div>
                                                    </div>
                                            )
                                        )}
                                        {items.comm.like.map((movie) => (
                                            <div class = "col-3 my-container">
                                                <div key = {movie.id}>
                                                    <button onClick = {() => {this.movieClickHandler(movie, 'text')}}>
                                                        <img className="img" src = {movie.poster} alt = {movie.title} />
                                                    </button>
                                                </div>
                                            </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6 my-container" style={{ borderRight: "1px solid #ccc"}}>
                            <h3 style={{textAlign: "center"}}>Movies Both You and Community Disike</h3>
                            <div class = "row">
                                <div class = "col">
                                    <div class = "row">
                                    {items.me.dislike.map((movie) => (
                                                    <div class = "col-3 my-container">
                                                        <div key = {movie.id}>
                                                            <button onClick = {() => {this.movieClickHandler(movie, 'text')}}>
                                                                <img className="img" src = {movie.poster} alt = {movie.title} />
                                                            </button>
                                                        </div>
                                                    </div>
                                            )
                                        )}
                                        {items.comm.dislike.map((movie) => (
                                            <div class = "col-3 my-container">
                                                <div key = {movie.id}>
                                                    <button onClick = {() => {this.movieClickHandler(movie, 'text')}}>
                                                        <img className="img" src = {movie.poster} alt = {movie.title} />
                                                    </button>
                                                </div>
                                            </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-6 my-container">
                            <h3 style={{textAlign: "center"}}>Movies You Dislike and Your Community Like</h3>
                            <div class = "row">
                                <div class = "col">
                                    <div class = "row">
                                    {items.me.dislike.map((movie) => (
                                                    <div class = "col-3 my-container">
                                                        <div key = {movie.id}>
                                                            <button onClick = {() => {this.movieClickHandler(movie, 'text')}}>
                                                                <img className="img" src = {movie.poster} alt = {movie.title} />
                                                            </button>
                                                        </div>
                                                    </div>
                                            )
                                        )}
                                        {items.comm.like.map((movie) => (
                                            <div class = "col-3 my-container">
                                                <div key = {movie.id}>
                                                    <button onClick = {() => {this.movieClickHandler(movie, 'text')}}>
                                                        <img className="img" src = {movie.poster} alt = {movie.title} />
                                                    </button>
                                                </div>
                                            </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class = "col-sm-2" style={{border: "1px solid #ccc"}}>
            <RightPanel movie={this.state.activeMovie} />
        </div>
        </div>

        <div class = "row">
            <header>
            <Link to = "/surveypage">
                <button type="button" class="btn btn-primary btn-light float-right">
                  Next Page
                </button>
              </Link>
            </header>
        </div>
    </div>
    )
    }
}

export default DcExp