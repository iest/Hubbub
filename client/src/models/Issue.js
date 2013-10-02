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