App.IndexController = Ember.Controller.extend({
  actions: {
    getRepos: function(user) {
      this.transitionToRoute('user', user);
    }
  }
});