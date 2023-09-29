import React from "react"; 
import {Link} from "react-router-dom"
import RightPanel from "./RightPanel";
import LeftPanel from "./LeftPanel";

class CdExp extends React.Component{
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
            const mlike = json.slice(0, 10);
            // const mhate = json.slice(5, 10);
            const clike = json.slice(5, 15);
            // const chate = json.slice(1, 20);

            console.log(mlike);
            // console.log(mhate);
            console.log(clike);
            
            this.setState({
                items: {
                    me: {
                        like: mlike,
                        // dislike: mhate
                    },
                    comm: {
                        like: clike,
                        // dislike: chate
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
  this.setState({ isOpen: true });};
  
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
              {/* this div is the header */}
              <div class = "row"> 
                <header><h1>Continuous Decoupled Visualization - Explicit</h1></header>
              </div>

            {/* this div is the main body with the movies and the panels*/}
              <div class = "row">

                <div class = "col-lg-3 col-md-8 col-sm-12">
                <LeftPanel/>
                </div>

                {/* this div is the main body with the movies*/}
                <div class = "col-lg-6 col-md-8 col-sm-12"> 

                <div class = "row-5 my-container">
                  <h2> Your Movie Preferences</h2>
                  <div class = "col-6">
                    {items.me.like.map((movie) => 
                    <button onClick={() => {this.movieClickHandler(movie, 'text'); this.openPopup()}}>    
                    <img className = "img" src= {movie.poster} alt={movie.title}/>
                    {isOpen && (
                        <div className="popup" ref={this.popupRef}>
                          <p>Popup content goes here.</p>
                        </div>
                        )}                           
                    </button>)}
                  </div>
                </div>

                <div class = "row-5 my-container">
                  <h2> Community's Movie Preferences</h2>
                <div class = "col-6">
                  {items.comm.like.map((movie) => 
                  <button onClick={() => {this.movieClickHandler(movie, 'text'); this.openPopup()}}>    
                  <img className = "img" src= {movie.poster} alt={movie.title}/> 
                  {isOpen && (
                    <div className="popup" ref={this.popupRef}>
                      <p>Popup content goes here.</p>
                    </div>
                  )}                               
                  </button>)}
                </div>
                </div>
              </div>

              {/*this div is the right panel*/}
              <div class = "col-lg-3 col-md-4 col-sm-12">
                <RightPanel movie={this.state.activeMovie} />
              </div>
            </div>

            <div class = " row">
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
export default CdExp