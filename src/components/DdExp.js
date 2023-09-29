import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import RightPanel from "./RightPanel";
import DialogB from "./DialogB"

class DdExp extends React.Component{
    constructor(props) {
        super(props);
   
        this.state = {
            items: {
                me: {},
                comm: {}
            },
            DataisLoaded: false,
            activeMovie: undefined
        };
    }
    movieClickHandler = (movie) =>{
    this.setState({
        activeMovie: movie
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
        }

    render(){
        const { DataisLoaded, items } = this.state;

        if (!DataisLoaded) 
        return 
        <div><h1> Please wait some time.... </h1></div>
        
        return(
            <div className="row">
                <div className = "header">
                    <h4 className="header">Preference Visualizations</h4>
                </div>
                
                <div className="column middle">
                    <div style={{padding: "1em"}}>
                        <div>
                            <Row>
                                <div className="col-md-auto"> </div>
                                <Col>
                                    <div className="mydataholder"> {
                                        items.me.like.map((movie) => 
                                            <p className="dataholderitem">
                                                <button onClick={() => {this.movieClickHandler(movie)}}>
                                                    <img className = "img" src={movie.poster} alt={movie.title}/>
                                                </button>
                                            </p>
                                        )}
                                    </div> 
                                    <p className="xLabels">My Dislkes</p>
                                </Col>

                                <div className="col-md-auto"></div>
                                <Col>
                                    <div className="mydataholder">{
                                        items.me.dislike.map((movie) => 
                                        <p className="dataholderitem">
                                            <button onClick={() => this.movieClickHandler(movie)}>
                                                <img className = "img" src = {movie.poster} alt={movie.title}/>
                                            </button>
                                        </p>
                                        )} 
                                    </div>
                                    {/* <div className="col-sm-auto"></div> */}
                                    <p className="xLabels">My Likes</p>
                                </Col>
                            </Row>
                            
                            <Row>
                                <div className="col-md-auto"></div>
                                    <Col>
                                        <div className="commsdataholder">{
                                            items.comm.like.map((movie) => 
                                            <p className="dataholderitem">
                                                <button onClick = {() => this.movieClickHandler(movie)}>
                                                    <img className = "img" src = {movie.poster} alt = {movie.title}/>
                                                </button>
                                            </p>
                                            )}
                                        </div>
                                
                                        <p className="xLabels">Community's Dislike</p>
                                    </Col>

                                    <div className="col-md-auto"></div>

                                    <Col>
                                        <div className="commsdataholder">
                                            {items.comm.dislike.map((movie) => 
                                            <p className="dataholderitem">
                                                <button onClick={() => this.movieClickHandler(movie)}>
                                                    <img className="img"src = {movie.poster} alt={Image.title}/>
                                            </button>
                                            </p>
                                            )}
                                        </div>

                                        <p className="xLabels">Community's Like</p>
                                    </Col>
                            </Row>
                        </div> 
                    </div>

                </div>

        <div className = "column side">
            <RightPanel movie={this.state.activeMovie} />
        </div>

        <div className="footer">
            <DialogB>
                <Link to = "/"></Link>
            </DialogB>
            
                {/* <button type="button" class="btn btn-primary btn-light float-right">
                    Next Page
                </button> */}
        </div>
    </div>

        )
    }
}

export default DdExp