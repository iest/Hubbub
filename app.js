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

// app.get('/:user/:repo', function(req, res) {

//   github.authenticate({
//       type: "oauth",
//       token: "c4d8988f8af0ed16c2bc25d97f8418305220bcd2"
//   });

//   github.issues.repoIssues({
//     user: req.params.user,
//     repo: req.params.repo
//   }, function(err, gRes) {
//     res.send({
//       'issues': gRes
//     });
//   });

// });

app.get('/api/issues', function(req, res) {

  // github.authenticate({
  //   type: "oauth",
  //   token: "c4d8988f8af0ed16c2bc25d97f8418305220bcd2"
  // });

  github.issues.repoIssues({
    user: req.query.user,
    repo: req.query.repo,
    state: req.query.state
  }, function(err, gRes) {
    res.send({
      'issues': gRes
    });
  });

});



http.createServer(app)
  .listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
  });