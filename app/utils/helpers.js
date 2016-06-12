/*Include the Axios library for HTTP requests*/
var axios = require('axios');

/* NYT API Key*/
var APIKey = "e05abfb61c5346fea5bf75beb92d714e";

// Helper Functions (in this case the only one is runQuery)
var helpers = {

	// This will run our query.
	runQuery: function(term, start, end){

		// Adjust to get search terms in proper format
		var term = term.trim();
		var start = start.trim();
		var end = end.trim();


		// Run a query using Axios. Then return the results as an object with an array.
		// See the Axios documentation for details on how we structured this with the params.
		return axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
			params: {
			    'api-key': APIKey,
			    'q': term,
			    'begin_date': start,
			    'end_date': end			
			}
		})
		.then(function(results){
			// console.log("inside helpers",results.data.response);

			return results.data.response;

		});



	}
}


// We export the helpers function (which contains getGithubInfo)
module.exports = helpers;