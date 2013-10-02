App.ApplicationRoute = Ember.Route.extend({
  
});

App.ApplicationController = Ember.Controller.extend({

  user: '',
  repo: '',
  state: 'open',

  actions: {
    getIssues: function() {

      this.get('store').findQuery('issues', {

      });

    }
  }
});