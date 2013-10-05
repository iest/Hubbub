App.ApplicationRoute = Ember.Route.extend({
  setupController: function(controller) {
    var user = window._USER;
    controller.set('user', user);
  }
});

App.ApplicationController = Ember.Controller.extend({
  user: null
});