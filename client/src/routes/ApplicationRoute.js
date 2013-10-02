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