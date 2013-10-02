/*! Hubbub - v0.0.1 - 2013-10-02 */var start = new Date().getTime();

App = Ember.Application.create({
  // LOG_TRANSITIONS: true
});

App.Router.map(function() {
  // Routes here
});

App.ApplicationRoute = Ember.Route.extend({

  model: function(){
    return $.get('api/issues').then(function(res){
      console.log(new Date().getTime() - start);
      return res;
    });
  }

});