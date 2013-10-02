/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./server/routes');
var http = require('http');
var path = require('path');

var app = express();

// Set the port
app.set('port', process.env.PORT || 3000);

// Define where views are
app.set('views', __dirname + '/server/views');

// Define the view engine
app.set('view engine', 'jade');

// Something to do with a favicon?
app.use(express.favicon());

app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, '/server/public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/**
  Github Library
*/
var GitHubApi = require("github");
var github = new GitHubApi({
  // required
  version: "3.0.0",
  // optional
  timeout: 5000
});



/**
  Routes
*/

app.get('/', routes.index);

app.get('/api/issues', function(req, res) {

  var closedIssues = github.issues.repoIssues({
    user: 'iest',
    repo: 'emRuler',
    state: 'closed'
  }, function(err, gRes){
    res.send(gRes);
  });

});



http.createServer(app)
  .listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
  });