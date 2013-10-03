/*! Hubbub - v0.0.1 - 2013-10-03 */App = Ember.Application.create({
  // LOG_TRANSITIONS: true
});

App.Router.map(function() {
  this.route('issue', { path: '/:id'} );
});

App.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: 'api'
});
App.ApplicationRoute = Ember.Route.extend({
  
});

App.ApplicationController = Ember.Controller.extend({

  user: '',
  repo: '',
  state: 'closed',

  actions: {
    getIssues: function() {

      var _this = this;

      this.get('store').findQuery('issue', {
        user: _this.get('user'),
        repo: _this.get('repo'),
        state: _this.get('state')
      }).then(function(issues){
        _this.set('model', issues);
      });

    }
  }
});
App.Issue = DS.Model.extend({
  url: DS.attr(),
  labels_url: DS.attr(),
  comments_url: DS.attr(),
  events_url: DS.attr(),
  html_url: DS.attr(),

  number: DS.attr(),
  title: DS.attr(),
  user: DS.attr(),
  labels: DS.attr(),
  state: DS.attr(),
  assignee: DS.attr(),

  milestone: DS.attr(),
  comments: DS.attr(),

  created_at: DS.attr(),
  updatet_at: DS.attr(),
  closed_at: DS.attr(),

  body: DS.attr()
});