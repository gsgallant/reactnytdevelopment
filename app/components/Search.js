// Include React and React-Router dependencies
var React = require('react');
var Router = require('react-router');

// Include the Query and Results componens
var Query = require('./Search-Sub/Query');
var Results = require('./Search-Sub/Results');

// Include the Helper (for the query)
var helpers = require('../utils/helpers');

// Create the Main component
var Search = React.createClass({

	/*Here we set the initial state variables (this allows us to propagate the variables for maniuplation by the children components*/
	/*Also note the "resuls" state. This will be where we hold the data from our results*/
	getInitialState: function(){
		return {

            //**** here I added a state (receiving) that will test whether to send axios calls
            // ****   initially false to avoid bad requests to axios that throw errors to the component
            //****   this is a different approach to using the componentShouldMount but is cleaner
			recieving: false,
			queryTerm: "",
			startYear: "",
			endYear: "",
			results: {}
		}
	
	},

	
	/*This function gets called if the user searches for a completely new set of parameters (i.e. if any of the search terms changes)*/
	/*If the user searches for the exact same thing, then React will ignore it.*/
	//shouldComponentUpdate: function(nextProps, nextState) {
			// console.log('shouldcomponentupdate=',(this.state.queryTerm != nextState.queryTerm || this.state.results != nextState.results))
		//	return (this.state.queryTerm != nextState.queryTerm || this.state.results != nextState.results);
		  //return this.state.queryTerm != nextState.queryTerm;
			// return true;
	//},


    // This function will be passed down into children components so they can change the "parent"
    // i.e we will pass this method to the query component that way it can change the main component
    // to perform a new search
    // 0101 and 1231 are concatenated to the years so that the search is the full years jan 1st - dec 31
    setQuery: function(newQuery, newStart, newEnd){
        // console.log("in setstate ");


        // ****ROB: in this setState, allow the axios call by setting recieving to true.
        this.setState({
            queryTerm: newQuery,
            startYear: newStart+"0101",
            endYear: newEnd+"1231",
            recieving: true
        })
    },


	componentDidUpdate: function(){
		
		// console.log("just before helpers.query term=",this.state.queryTerm);
		// console.log("just before helpers.query start=",this.state.startYear);
		// console.log("just before helpers.query end=",this.state.endYear);


        //****ROB: here is where the test is for the recieving state. before calling axios

        if(this.state.recieving) {
            helpers.runQuery(this.state.queryTerm, this.state.startYear, this.state.endYear)
                .then(function (data) {
                    console.log("inside Search and back from helpers.runQuery");

                    // ****ROB: then set recieving back to false
                    this.setState({
                        results: data,
                        recieving: false
                    });
                    console.log("back from query but before .bind(this) data=", this.state.results);

                    // This code is necessary to bind the keyword "this" when we say this.setState
                    // to actually mean the component itself and not the runQuery function.
                }.bind(this));
            //console.log("back from query and after .bind(this) this.state.results=",this.state.results);
        }
	},


	/*Render the function. Note how we deploy both the Query and the Results*/
	render: function(){
		//console.log("This is within render of Search.js just before calling the Results component results", this.state.results)

		return(

			<div className="main-container"> 
				{/*Note how we pass the setQuery function to enable Query to perform searches*/}
				<Query updateSearch={this.setQuery} />

				{/*Note how we pass in the results into this component*/}
				<Results results={this.state.results}/>

			</div>

		)
	}
});

// Export the module back to the route
module.exports = Search;