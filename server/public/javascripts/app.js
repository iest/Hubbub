/*! Hubbub - v0.0.1 - 2013-10-05 */App = Ember.Application.create({
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
App.ApplicationRoute = Ember.Route.extend({
  setupController: function(controller) {
    var user = window._USER;
    controller.set('user', user);
  }
});

App.ApplicationController = Ember.Controller.extend({
  user: null
});
App.IndexRoute = Ember.Route.extend({

});
App.IssueRoute = Ember.Route.extend({
  // afterModel: function(params) {
  //   var issue = this.get('store')
  //     .find('issue', params.number);

  //   this.controllerFor('issue').set('model', issue);

  // }
});
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
App.IndexController = Ember.Controller.extend({
  actions: {
    getRepos: function(user) {
      this.transitionToRoute('user', user);
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

  body: DS.attr(),

  repo: DS.belongsTo('repo')
});
App.Repo = DS.Model.extend({
  archive_url: DS.attr(),
  assignees_url: DS.attr(),
  blobs_url: DS.attr(),
  branches_url: DS.attr(),
  clone_url: DS.attr(),
  collaborators_url: DS.attr(),
  comments_url: DS.attr(),
  commits_url: DS.attr(),
  compare_url: DS.attr(),
  contents_url: DS.attr(),
  contributors_url: DS.attr(),
  created_at: DS.attr(),
  default_branch: DS.attr(),
  description: DS.attr(),
  downloads_url: DS.attr(),
  events_url: DS.attr(),
  fork: DS.attr(),
  forks: DS.attr(),
  forks_count: DS.attr(),
  forks_url: DS.attr(),
  full_name: DS.attr(),
  git_commits_url: DS.attr(),
  git_refs_url: DS.attr(),
  git_tags_url: DS.attr(),
  git_url: DS.attr(),
  has_downloads: DS.attr(),
  has_issues: DS.attr(),
  has_wiki: DS.attr(),
  homepage: DS.attr(),
  hooks_url: DS.attr(),
  html_url: DS.attr(),
  issue_comment_url: DS.attr(),
  issue_events_url: DS.attr(),
  issues_url: DS.attr(),
  keys_url: DS.attr(),
  labels_url: DS.attr(),
  language: DS.attr(),
  languages_url: DS.attr(),
  master_branch: DS.attr(),
  merges_url: DS.attr(),
  milestones_url: DS.attr(),
  mirror_url: DS.attr(),
  name: DS.attr(),
  notifications_url: DS.attr(),
  open_issues: DS.attr(),
  open_issues_count: DS.attr(),
  pulls_url: DS.attr(),
  pushed_at: DS.attr(),
  size: DS.attr(),
  ssh_url: DS.attr(),
  stargazers_url: DS.attr(),
  statuses_url: DS.attr(),
  subscribers_url: DS.attr(),
  subscription_url: DS.attr(),
  svn_url: DS.attr(),
  tags_url: DS.attr(),
  teams_url: DS.attr(),
  trees_url: DS.attr(),
  updated_at: DS.attr(),
  url: DS.attr(),
  watchers: DS.attr(),
  watchers_count: DS.attr(),
  
  user: DS.belongsTo('user'),
  issues: DS.hasMany('issue')
});
App.User = DS.Model.extend({
  login: DS.attr(),
  avatar_url: DS.attr(),
  gravatar_id: DS.attr(),
  url: DS.attr(),
  html_url: DS.attr(),
  organizations_url: DS.attr(),
  repos_url: DS.attr(),
  type: DS.attr(),
  name: DS.attr(),
  company: DS.attr(),
  location: DS.attr(),
  email: DS.attr(),
  public_repos: DS.attr(),
  created_at: DS.attr(),
  updated_at: DS.attr(),
  
  repos: DS.hasMany('repo')
});