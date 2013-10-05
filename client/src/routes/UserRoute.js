App.UserRoute = Ember.Route.extend({
  model: function(user) {
    return this.get('store').findQuery('repo', {
      user: user.login
    }).then(function(repos) {
      return repos;
    });
  },
  setupController: function(controller, model) {

    controller.set('user', model.get('query.user'));
    controller.set('model', model);
  }
});