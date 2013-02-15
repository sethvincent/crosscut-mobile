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
    var self = this;
    $(".loading").show();
    _.bindAll(this, 'render', 'update');
    this.collection = new Crosscut.Collections.StoryList;
    this.collection.fetch({ 
      dataType: 'jsonp',
      success: function(){}
    });
    console.log("storys view update", this)
    this.collection.on('reset', this.render, this);
    this.collection.on('change', this.render, this);
  },
  events: {
    'click .next': 'update'
  },
  
  update: function(e){
    e.preventDefault();
    this.collection.requestNextPage({ update: true, remove: true });
    this.render();
    console.log("storys view update", this)
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
    _.bindAll(this, 'render');
  },
  
  render: function(){
    this.$el.html( $("#stories-main").html() );
    this.storylist = new Crosscut.Views.StoryListView();
    return this;
  }
});