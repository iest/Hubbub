App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.Router.map(function() {
  this.resource('user', {
    path: ':login'
  }, function() {
    this.resource('issues', {
      path: ':name'
    }, function() {
      this.resource('issue', {
        path: ':number'
      });
    });
  });
});

App.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: 'api'
});