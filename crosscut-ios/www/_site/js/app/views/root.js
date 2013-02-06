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
    'click .back': 'back'
  },
  
  back: function(){
    window.history.back();
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
    this.homeView = this.homeView || new Crosscut.Views.Home();
    this.homeView.render();
    console.log("homeView", this.homeView)
    this.router.navigate("");
    $('.back').hide();
  },
  
  goto_stories: function() {
    this.storiesView = this.storiesView || new Crosscut.Views.StoriesMain();
    this.storiesView.render();
    console.log("storiesView", this.storiesView)
    this.router.navigate("stories");
    $('.back').show();
  },
  
  goto_story: function(id) {
    console.log("root.js", id)
    this.storyView = new Crosscut.Views.StoryView({ id: id });
    console.log("storyView", this.storyView)
    this.router.navigate("story/" + id);
    $('.back').show();
  },
  
  goto_clicker: function() {
    this.clickerView = this.clickerView || new Crosscut.Views.Clicker();
    this.clickerView.render();
    console.log("clickerView", this.clickerView)
    this.router.navigate("clicker");
    $('.back').show();
  },
  
  goto_member: function() {
    this.memberView = this.memberView || new Crosscut.Views.Member();
    this.memberView.render();
    console.log("memberView", this.memberView)
    this.router.navigate("member");
    $('.back').show();
  },
  
  goto_more: function() {
    this.moreView = this.moreView || new Crosscut.Views.More();
    this.moreView.render();
    console.log("moreView", this.moreView)
    this.router.navigate("more");
    $('.back').show();
  }
  
});