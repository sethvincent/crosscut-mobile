Crosscut.Views.Root = Backbone.View.extend({
  el: $("#app"),
  views: {},
  router: null,
  
  initialize: function(){
    _.bindAll(this);
    this.router = new Crosscut.Routers.Index({ controller: this });
    return this;
  },
  
  events: {
    'click .back': 'goto_stories'
  },
  
  startRouting: function(){
    Backbone.history.start();
  },
  
  getOrCreateView: function(name, options) {
    // Register each view as it is created and never create more than one.
    if (name in this.views) {
      console.log("Going to " + name);
      return this.views[name];
    }
    
    console.log("Creating " + name);
    this.views[name] = new Crosscut.Views[name](options);
    console.log(this.views)
    return this.views[name];
  },
  
  goto_home: function() {
    console.log("current view", this.currentContentView);
    this.currentContentView = new Crosscut.Views.Home();
    this.router.navigate("");
    $('.back').hide();
  },
  
  goto_stories: function() {
    console.log("current view", this.currentContentView);
    this.currentContentView = new Crosscut.Views.StoriesMain();
    this.router.navigate("stories");
    $('.back').hide();
  },
  
  goto_story: function(id) {
    console.log("current view", this.currentContentView);
    this.currentContentView = new Crosscut.Views.StoryView({ id: id });
    this.router.navigate("story/" + id);
    $('.back').show();
  },
  
  goto_more: function() {
    console.log("current view", this.currentContentView);
    this.currentContentView = new Crosscut.Views.More();
    this.router.navigate("more");
    $('.back').hide();
  },
  
  goto_clicker: function() {
    console.log("current view", this.currentContentView);
    this.currentContentView = new Crosscut.Views.Clicker();
    this.router.navigate("clicker");
    $('.back').hide();
  },
});