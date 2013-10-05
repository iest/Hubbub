/**
 * Module dependencies.
 */

var express = require('express'),
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

app.get('/', function(req, res) {

  if (!req.session.oauth2AccessToken) {
    res.redirect('/auth');
  } else if (!app.locals.user) {
    github.user.get({}, function(err, user) {
      app.locals.user = user;
      res.render('index', {
        user: user
      });
    });
  } else {
    res.render('index', {
      user: app.locals.user
    });
  }
});

app.get('/auth', function(req, res) {
  res.redirect(consumer2()
    .getAuthorizeUrl({
      'scope': 'repo',
      'redirect_uri': 'http://localhost:3000/auth/github-callback'
    }));
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

          req.session.oauth2AccessToken = access_token;

          // authenticate github API
          github.authenticate({
            type: "oauth",
            token: req.session.oauth2AccessToken
          });

          github.user.get({}, function(err, user) {
            app.locals({
              user: user
            });
          });

          res.redirect('/');
        }
      }
  );
});

app.get('/api/user', function(req, res) {
  github.user.get({}, function(err, user) {
    res.send(user);
  });
});

app.get('/api/repos', function(req, res) {

  github.repos.getFromOrg({
    org: req.query.user
  }, function(err, oRes) {

    // If we get a response, we dealing with an org
    if (oRes) {
      res.send({'repos': oRes});
    } else {
      console.log(err);
      // else we're dealing with a user
      github.repos.getFromUser({
        user: req.query.user
      }, function(err, uRes) {
        if (uRes) {
          res.send({'repos': uRes});
        } else {
          console.log(err);
        }
      });
    }
  });
});

app.get('/api/issues', function(req, res) {
  github.issues.repoIssues({
    user: req.query.user,
    repo: req.query.repo,
    state: req.query.state
  }, function(err, gRes) {
    res.send({
      'issues': gRes
    });
    console.log(err);
  });
});



http.createServer(app)
  .listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
  });