App.IssuesRoute = Ember.Route.extend({
  model: function(params) {
    var user = this.modelFor('user')
      .get('query.user');

    return this.get('store')
      .findQuery('issue', {
        user: user,
        repo: params.name,
        state: 'open'
      });
  },

  setupController: function(controller, model) {
    
    var user = model.get('query.user'),
        repo = model.get('query.repo');

    controller.set('user', user);
    controller.set('repo', repo);
    controller.set('model', model);
  },

  renderTemplate: function() {
    this.render('issues', {
      into: 'application',
      outlet: 'main'
    });
  }
});