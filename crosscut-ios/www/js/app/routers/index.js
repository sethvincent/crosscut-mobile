Crosscut.Routers.Index = Backbone.Router.extend({
  routes: {
    "": "home",
    "stories": "stories",
    "story/:id": "story",
    "clicker": "clicker",
    "member": "member",
    "more": "more"
  },
  
  initialize: function(options){
    this.controller = options.controller;
  },
  
  home: function(){
    this.controller.goto_home();
  },
  
  stories: function(){
    this.controller.goto_stories();
  },
    
  story: function(id){
    console.log("index.js", id)
    this.controller.goto_story(id);
  },
  
  clicker: function(){
    this.controller.goto_clicker();
  },
  
  member: function(){
    this.controller.goto_member();
  },
  
  more: function(){
    this.controller.goto_more();
  }
});