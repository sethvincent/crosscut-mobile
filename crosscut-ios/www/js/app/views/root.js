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
  
  // not currently using this
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
    this.getOrCreateView('Home').render();
    this.router.navigate("");
    $('.back').hide();
  },
  
  goto_stories: function() {
    this.getOrCreateView('StoriesMain').render();
    this.router.navigate("stories");
    $('.back').show();
  },
  
  goto_troll: function() {
    this.getOrCreateView('TrollMain').render();
    this.router.navigate("troll");
    $('.back').show();
  },
  
  goto_story: function(id) {
    this.views.storyView = new Crosscut.Views.StoryView({ id: id });
    this.router.navigate("story/" + id);
    $('.back').show();
  },
  
  goto_clicker: function() {
    this.getOrCreateView('ClickerMain').render();
    this.router.navigate("clicker");
    $('.back').show();
  },
  
  goto_member: function() {
    this.getOrCreateView('Member').render();
    this.router.navigate("member");
    $('.back').show();
  },
  
  goto_about: function() {
    this.getOrCreateView('About').render();
    this.router.navigate("about");
    $('.back').show();
  }
  
});