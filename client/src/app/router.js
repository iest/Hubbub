$.ajaxSetup({ cache: false });

Insight = Ember.Application.create({
  // LOG_TRANSITIONS: true
});

/**
  @class Router
  @author iest
*/
Insight.Router.map(function() {
  this.route('login');
  this.resource('results', {
    path: 'results/:dynamic'
  });
  this.route('favourites');
  this.route('savedSearches');
  this.route('missing', { path: "/*path"});
});