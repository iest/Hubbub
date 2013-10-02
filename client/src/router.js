App = Ember.Application.create({
  // LOG_TRANSITIONS: true
});

App.Router.map(function() {
  this.route('issue', { path: '/:id'} );
});

App.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: 'api'
});