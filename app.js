/**
 * Module dependencies.
 */

var express = require('express');
routes = require('./server/routes'),
http = require('http'),
path = require('path'),
config = require('./server/config'),
oauth = require('oauth'),
sys = require('util');

var app = express();

app.configure(function() {
  app.set('port', config.PORT || 3000);
  app.set('views', __dirname + '/server/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: config.EXPRESS_SESSION_SECRET
  }));
  app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
  });
  app.use(app.router);
  app.use(express.static(path.join(__dirname, '/server/public')));

  // development only
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }

});



// app.get('/', routes.index);


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

var _githubKey = config.GITHUB_CLIENT_ID,
  _githubSecret = config.GITHUB_SECRET;
console.log("_githubKey: %s and _githubSecret %s", _githubKey, _githubSecret);

function consumer2() {
  return new oauth.OAuth2(
    _githubKey,
    _githubSecret,
    "https://github.com/",
    "login/oauth/authorize",
    "login/oauth/access_token",
    null
  );
}

var accessToken = '';

app.get('/', function(req, res) {

  if (!accessToken) {
    res.redirect(consumer2()
      .getAuthorizeUrl({
        'scope': 'repo',
        'redirect_uri': 'http://localhost:3000/auth/github-callback'
      }));
  } else {
    github.issues.repoIssues({
      user: 'mdrn',
      repo: 'holistic'
    }, function(err, gRes) {
      res.send({
        'issues': gRes
      });
    });
  }


});

app.get('/auth/github-callback', function(req, res) {
  req.session.oauth2AuthorizationCode = req.query.code;
  consumer2()
    .getOAuthAccessToken(req.session.oauth2AuthorizationCode, {
        'redirect_uri': 'http://localhost:3000/auth/github-callback'
      },
      function(error, access_token, refresh_token, results) {
        if (error) {
          res.send("Error getting OAuth access token : " + sys.inspect(error), 500);
        } else {

          accessToken = access_token;

          // authenticate github API
          github.authenticate({
            type: "oauth",
            token: accessToken
          });

          res.redirect('/');

          res.end();
        }
      }
  );
});


/**
  Routes
*/


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

// app.get('/api/issues', function(req, res) {

//   // github.authenticate({
//   //   type: "oauth",
//   //   token: "1024b404ef0d23b03647046337a58b5356549338"
//   // });

//   github.issues.repoIssues({
//     user: req.query.user,
//     repo: req.query.repo,
//     state: req.query.state
//   }, function(err, gRes) {
//     res.send({
//       'issues': gRes
//     });
//     console.log(err);
//   });

// });



http.createServer(app)
  .listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
  });