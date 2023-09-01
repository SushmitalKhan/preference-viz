import React from "react";
import { Link } from "react-router-dom";
import RightPanel from "../components/RightPanel";

class DiscreteDecoupled extends React.Component {
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
    movieClickHandler = (movie) => {
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

    render() {
        const { DataisLoaded, items } = this.state;

        if (!DataisLoaded)
            return
        <div><h1> Please wait some time.... </h1></div>

        return (
            <div class="container my-container">
                {/**header */}
                <div class="row">
                    <header><h1>Discrete Decoupled Visualization - Implicit</h1></header>
                </div>

                {/**entire body*/}
                <div class="row">
                    {/**movie visualizations */}
                    <div class="col-lg-9 col-md-8 col-sm-12" style={{ borderBottom: "1px solid #ccc" }}>
                        <h3 style={{ textAlign: "center" }}> Movie You Likes and Dislikes</h3>

                        {/**movies you like and dislike */}
                        <div class="row" style={{ border: "1px solid #ccc" }}>
                            {/**movies you dislike */}
                            <div class="col-5" style={{ borderRight: "1px solid #ccc" }} >
                                <div class="row">
                                    {items.me.dislike.map((movie) => (
                                        <div class="col-4 my-container">
                                            <div key={movie.id}>
                                                <button onClick={() => { this.movieClickHandler(movie, 'text') }}>
                                                    <img className="img" src={movie.poster} alt={movie.title} />
                                                </button>
                                            </div>
                                        </div>
                                    )
                                    )}
                                    <h4 style={{ textAlign: "center" }}>Your Dislikes</h4>
                                </div>
                            </div>

                            {/**movies you like */}
                            <div class="col-5">
                                <div class="row">
                                    {items.me.like.map((movie) => (
                                        <div class="col-4 my-container">
                                            <div key={movie.id}>
                                                <button onClick={() => { this.movieClickHandler(movie, 'text') }}>
                                                    <img className="img" src={movie.poster} alt={movie.title} />
                                                </button>
                                            </div>
                                        </div>
                                    )
                                    )}
                                    <h4 style={{ textAlign: "center" }}>Your Likes</h4>
                                </div>
                            </div>
                        </div>

                        {/**movies community like and dislike */}
                        <h3 style={{ textAlign: "center" }}> Movie Community Likes and Dislikes</h3>
                        <div class="row" style={{ border: "1px solid #ccc" }} >
                            {/**movies community dislike */}
                            <div class="col-5" style={{ borderRight: "1px solid #ccc" }} >
                                <div class="row">
                                    {items.comm.dislike.map((movie) => (
                                        <div class="col-4 my-container">
                                            <div key={movie.id}>
                                                <button onClick={() => { this.movieClickHandler(movie, 'text') }}>
                                                    <img className="img" src={movie.poster} alt={movie.title} />
                                                </button>
                                            </div>
                                        </div>
                                    )
                                    )}
                                    <h4 style={{ textAlign: "center" }}>Community's Dislikes</h4>
                                </div>
                            </div>

                            {/**movies community like */}
                            <div class="col-5">
                                <div class="row">
                                    {items.comm.like.map((movie) => (
                                        <div class="col-4 my-container">
                                            <div key={movie.id}>
                                                <button onClick={() => { this.movieClickHandler(movie, 'text') }}>
                                                    <img className="img" src={movie.poster} alt={movie.title} />
                                                </button>
                                            </div>
                                        </div>
                                    )
                                    )}
                                    <h4 style={{ textAlign: "center" }}>Community's Likes</h4>
                                </div>
                            </div>

                        </div>


                    </div>

                    {/** Right Panel*/}
                    <div class="col-lg-3 col-md-4 col-sm-12">
                        <RightPanel movie={this.state.activeMovie} />
                    </div>
                </div>

                {/**footer */}
                <div class=" row">
                    <header>
                        <Link to="/surveypage">
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

export default DiscreteDecoupled;