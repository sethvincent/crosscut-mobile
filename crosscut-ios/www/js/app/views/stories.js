Crosscut.Views.StoryView = Backbone.View.extend({
  el: $('#app .wrapper'),
  template: _.template( $('#story-view').html() ),
  
  initialize: function(options){
    var self = this;
    console.log("storyView", options.id)
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
    console.log("storyView context", context)
    this.$el.html( this.template( this.model.toJSON(), context ) );
    return this;
  }
});

Crosscut.Views.StoryTeaserView = Backbone.View.extend({
  className: 'story-teaser',
  template: _.template( $('#story-view').html() ),
  
  render: function(){
    this.$el.html( this.template( this.model.toJSON()));
    return this;
  }
});


Crosscut.Views.StoryListView = Backbone.View.extend({
  el: $('#app .wrapper'),
  
  initialize: function(options){
    var self = this;
    _.bindAll(this, 'render', 'renderStoryTeaser', 'update');
    this.collection = new Crosscut.Collections.StoryList;
    this.collection.fetch({ 
      dataType: 'jsonp',
      success: function(){
        //self.render();
      }
    });
    
    this.collection.on('reset', this.render, this);
    this.collection.on('change', this.render, this);
  },
  events: {
    'click .next': 'update'
  },
  
  update: function(e){
    e.preventDefault();
    this.collection.requestNextPage()
      .done(function( data, textStatus, jqXHR ) {
        console.log("UPDATED!!!!!", data);
      });
    $(".next")[0].remove();
  },
  
  renderStoryTeaser: function(model){
    this.storyTeaserView = new Crosscut.Views.StoryTeaserView({ model: model })
    this.$el.append( this.storyTeaserView.render().el );
  },
  
  render: function(){
    var context = { 
      stories: this.collection.toJSON()
    };
    this.$el.append( _.template( $('#story-list-view').html(), context ) );
    return this;
  }
});

Crosscut.Views.StoriesMain = Backbone.View.extend({
  el: $("#app .wrapper"),
  
  initialize: function(options){
    _.bindAll(this, 'render');
  },
  
  render: function(){
    console.log("huh", this);
    this.$el.html( $("#stories-main").html() );
    this.storylist = new Crosscut.Views.StoryListView();
  }
});