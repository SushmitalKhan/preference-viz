import React from "react";
import { Link } from "react-router-dom";
import RightPanel from "./RightPanel";

class DiscreteCoupled extends React.Component {
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

    movieClickHandler = (movie, text) => {
        this.setState({
            activeMovie: movie,
            message: text,
        })
    }
    componentDidMount() {
        fetch("https://rssa.recsys.dev/newrs/api/v1/movies/?skip=0&limit=20")
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


    render() {
        const { DataisLoaded, items, isOpen } = this.state;

        if (!DataisLoaded)
            return
        <div><h1> Please wait some time.... </h1></div>

        return (
            <div class="container my-container">
                {/* this div is the header */}
                <div class="row">
                    <header><h1>Discrete Coupled Visualization - Implicit</h1></header>
                </div>

                {/* this div is the main body with the movies and the right panel*/}
                <div class="row">
                    {/* this div is the main body with the movies*/}
                    <div class="col-lg-9 col-md-8 col-sm-12">
                        <div class="row-5 my-container">
                            <div class="col" >
                                <div class="row my-container">
                                    <div class="col-6 my-container" style={{ borderRight: "1px solid #ccc" }}>
                                        <h3 style={{ textAlign: "center" }}>Movie you Like but your Community Dislikes</h3>
                                        <div class="row">
                                            <div class="col">
                                                <div class="row">
                                                    {items.me.like.map((movie) => (
                                                        <div key={`movie_mlcd_${movie.movie_id}`} class="col-3 my-container">
                                                            <div>
                                                                <button onClick={() => { this.movieClickHandler(movie, 'text') }}>
                                                                    <img className="img" src={movie.poster} alt={movie.title} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )
                                                    )}
                                                    {items.comm.dislike.map((movie) => (
                                                        <div key={`movie_cdml_${movie.movie_id}`} class="col-3 my-container">
                                                            <div >
                                                                <button onClick={() => { this.movieClickHandler(movie, 'text') }}>
                                                                    <img className="img" src={movie.poster} alt={movie.title} />
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
                                        <h3 style={{ textAlign: "center" }}>Movies Both you and your Community Like</h3>
                                        <div class="row">
                                            <div class="col">
                                                <div class="row">
                                                    {items.me.like.map((movie) => (
                                                        <div key={`movie_mlcl_${movie.movie_id}`} class="col-3 my-container">
                                                            <div>
                                                                <button onClick={() => { this.movieClickHandler(movie, 'text') }}>
                                                                    <img className="img" src={movie.poster} alt={movie.title} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )
                                                    )}
                                                    {items.comm.like.map((movie) => (
                                                        <div key={`movie_clml_${movie.movie_id}`} class="col-3 my-container">
                                                            <div>
                                                                <button onClick={() => { this.movieClickHandler(movie, 'text') }}>
                                                                    <img className="img" src={movie.poster} alt={movie.title} />
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
                                    <div class="col-6 my-container" style={{ borderRight: "1px solid #ccc" }}>
                                        <h3 style={{ textAlign: "center" }}>Movies Both You and Community Disike</h3>
                                        <div class="row">
                                            <div class="col">
                                                <div class="row">
                                                    {items.me.dislike.map((movie) => (
                                                        <div key={`movie_mdcd_${movie.movie_id}`} class="col-3 my-container">
                                                            <div >
                                                                <button onClick={() => { this.movieClickHandler(movie, 'text') }}>
                                                                    <img className="img" src={movie.poster} alt={movie.title} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )
                                                    )}
                                                    {items.comm.dislike.map((movie) => (
                                                        <div key={`movie_cdmd_${movie.movie_id}`} class="col-3 my-container">
                                                            <div>
                                                                <button onClick={() => { this.movieClickHandler(movie, 'text') }}>
                                                                    <img className="img" src={movie.poster} alt={movie.title} />
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
                                        <h3 style={{ textAlign: "center" }}>Movies You Dislike and Your Community Like</h3>
                                        <div class="row">
                                            <div class="col">
                                                <div class="row">
                                                    {items.me.dislike.map((movie) => (
                                                        <div key={`movie_mdcl_${movie.movie_id}`} class="col-3 my-container">
                                                            <div>
                                                                <button onClick={() => { this.movieClickHandler(movie, 'text') }}>
                                                                    <img className="img" src={movie.poster} alt={movie.title} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )
                                                    )}
                                                    {items.comm.like.map((movie) => (
                                                        <div key={`movie_clmd_${movie.movie_id}`} class="col-3 my-container">
                                                            <div>
                                                                <button onClick={() => { this.movieClickHandler(movie, 'text') }}>
                                                                    <img className="img" src={movie.poster} alt={movie.title} />
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

                    <div class="col-lg-3 col-md-4 col-sm-12">
                        <RightPanel movie={this.state.activeMovie} />
                    </div>
                </div>
            </div>
        )
    }
}

export default DiscreteCoupled;

