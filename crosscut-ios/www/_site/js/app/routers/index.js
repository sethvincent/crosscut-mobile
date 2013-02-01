Crosscut.Routers.Index = Backbone.Router.extend({
  routes: {
    "": "home",
    "stories": "stories",
    "story/:id": "story",
    "clicker": "clicker",
    "more": "more"
  },
  
  initialize: function(options){
    console.log("router initializing")
    this.controller = options.controller;
  },
  
  home: function(){
    this.controller.goto_home();
  },
  
  stories: function(){
    this.controller.goto_stories();
  },
    
  story: function(id){
    this.controller.goto_story(id);
  },
  
  clicker: function(){
    this.controller.goto_clicker();
  },
  
  more: function(){
    this.controller.goto_more();
  }
});