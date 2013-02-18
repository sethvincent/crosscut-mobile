Crosscut.Views.StoryView = Backbone.View.extend({
  el: $('#app .wrapper'),
  template: _.template( $('#story-view').html() ),
  
  initialize: function(options){
    var self = this;
    this.model = new Crosscut.Models.Story({ path: options.id });
    this.model.fetch({
      dataType: 'jsonp',
      success: function(){
        self.render();
      }
    });
  },
  
  render: function(){
    var context = { 
      story: this.model.toJSON()
    };
    this.$el.html( this.template( this.model.toJSON(), context ) );
    
    if ( $(".wrapper").scrollTop() > 0 ) {
      $(".wrapper").scrollTop(0);
    }
    
    return this;
  }
});

Crosscut.Views.StoryListView = Backbone.View.extend({
  el: $('#app .wrapper'),
  
  initialize: function(options){
    var that = this;
    $(".loading").show();
    this.collection = new Crosscut.Collections.StoryList;
    this.collection.fetch({ update: true, remove: true })
      .done(function(){
        console.log("init done", this.url);
        that.render();
      });
  },
  
  events: {
    'click .next': 'update'
  },
  
  update: function(e){
    e.preventDefault();
    var that = this;
    this.collection.requestNextPage({ update: true, remove: true })
      .done(function(){
        console.log("update done", this.url);
        that.render();
      });
    $(".next")[0].remove();
  },
  
  render: function(){
    var context = { 
      stories: this.collection.toJSON()
    };
      
    this.$el.append( _.template( $('#story-list-view').html(), context ) );
    $(".loading").hide();
    return this;
  }
});


Crosscut.Views.StoriesMain = Backbone.View.extend({
  el: $("#app .wrapper"),
  
  initialize: function(options){
    //this.render();
  },
  
  render: function(){
    this.$el.html( $("#stories-main").html() );
    this.storylist = new Crosscut.Views.StoryListView();
    return this;
  }
});