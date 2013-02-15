Crosscut.Routers.Index = Backbone.Router.extend({
  routes: {
    "": "home",
    "stories": "stories",
    "story/:id": "story",
    "troll": "troll",
    "clicker": "clicker",
    "member": "member",
    "about": "about"
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
    this.controller.goto_story(id);
  },
  
  troll: function(){
    this.controller.goto_troll();
  },
  
  clicker: function(){
    this.controller.goto_clicker();
  },
  
  member: function(){
    this.controller.goto_member();
  },
  
  about: function(){
    this.controller.goto_about();
  }
});