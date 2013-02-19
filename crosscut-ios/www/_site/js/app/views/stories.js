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
    
    window.scrollTo(0, 0);
    
    return this;
  }
});

Crosscut.Views.StoryListView = Backbone.View.extend({
  className: 'stories',
  
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
    $(".next").text("loading ...");
    this.collection.requestNextPage({ update: true, remove: true })
      .done(function(){
        console.log("updated. view:", that);
        console.log("updated. collection:", that.collection);
        console.log("updated. request:", this);
        that.render();
        $(".next")[0].remove();
      });
    
  },
  
  render: function(){
    console.log("is this running?")
    var context = { 
      stories: this.collection.toJSON()
    };
    var html = this.$el.append( _.template( $('#story-list-view').html(), context ) )
    $('.stories-main').append( html );
    $(".loading").hide();
    return this;
  }
});


Crosscut.Views.StoriesMain = Backbone.View.extend({
  el: $("#app .wrapper"),
  
  initialize: function(options){

  },
  
  render: function(){
    this.$el.html( $("#stories-main").html() );
    
    if ( this.storylist != null ) {
      this.storylist.remove();
      this.storylist = new Crosscut.Views.StoryListView();
      return this;
    }

    this.storylist = new Crosscut.Views.StoryListView();
    return this;
  }
});