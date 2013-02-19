Crosscut.Views.Root = Backbone.View.extend({
  el: $("#app"),
  views: {},
  router: null,
  
  initialize: function(){
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

    if (name == 'Home'){
      $('.back').hide();
    } else {
      $('.back').show();
    }
    
    // Register each view as it is created and never create more than one.
    if (name in this.views) {
      return this.views[name];
    }
    
    this.views[name] = new Crosscut.Views[name](options);
    
    return this.views[name];
  },
  
  goto_home: function() {
    this.getOrCreateView('Home').render();
    this.router.navigate("");
    scroller.scrollTo(0, 0, 0);
  },
  
  goto_stories: function() {
    this.getOrCreateView('StoriesMain').render();
    this.router.navigate("stories");
    scroller.scrollTo(0, 0, 0);
  },
  
  goto_troll: function() {
    this.getOrCreateView('TrollMain').render();
    this.router.navigate("troll");
    scroller.scrollTo(0, 0, 0);
  },
  
  goto_story: function(id) {
    this.views.storyView = new Crosscut.Views.StoryView({ id: id });
    this.router.navigate("story/" + id);
    scroller.scrollTo(0, 0, 0);
    $('.back').show();
  },
  
  goto_clicker: function() {
    this.getOrCreateView('ClickerMain').render();
    this.router.navigate("clicker");
    scroller.scrollTo(0, 0, 0);
  },
  
  goto_member: function() {
    this.getOrCreateView('Member').render();
    this.router.navigate("member");
    scroller.scrollTo(0, 0, 0);
  },
  
  goto_about: function() {
    this.getOrCreateView('About').render();
    this.router.navigate("about");
    scroller.scrollTo(0, 0, 0);
  }
  
});