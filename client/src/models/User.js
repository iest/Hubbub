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
  updated_at: DS.attr()
});