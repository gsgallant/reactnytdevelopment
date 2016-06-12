// Include React and React-Router dependencies
var React = require('react');
var Router = require('react-router');

// Query Component Declaration
var Results = React.createClass({ 

	render: function(){

		if (!this.props.results.docs){

			return(

				<li className="list-group-item">
					
					<h3>
					  	<span><em>Enter search terms to begin...</em></span>
					</h3>
					
			  	</li>

			)

		}

		else {
			var articles = this.props.results.docs.map(function(article, index){

				return(

						<div>
						  <li className="list-group-item" key={index}>
						
							<h3>
							  	<span><em>{article.headline.main}</em></span>
								<span className="btn-group pull-right" >
									<a target="_blank"  href={article.web_url}><button className="btn btn-default btn-sm ">View Article</button></a>
									<button className="btn btn-primary btn-sm">Save</button>
								</span> 
							</h3>
							<p>Date Published: {article.pub_date}</p>

							
						  </li>

						</div>
				)

			})

		}

		return(
			<div className ="main-container">


				<div className="row">
					<div className="col-lg-12">

						<div className="panel panel-primary">
							<div className="panel-heading">
								<h1 className="panel-title"><strong><i className="fa fa-list-alt"></i>  Results</strong></h1>
							</div>
							<div className="panel-body">
								<ul className="list-group">
								  
									{articles}

								</ul>					
							</div>
						</div>

					</div>
				</div>





			</div>
		)

	}

});

// Export the module back to the route
module.exports = Results;