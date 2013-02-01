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
        self.render();
      }
    });
  },
  events: {
    'click .next': 'update'
  },
  
  update: function(options){
    var self = this;
    //this.collection.moreStories(options);
    this.collection.requestNextPage()
      .done(function( data, textStatus, jqXHR ) {
        self.render();
        console.log(data);
      });
  },
  
  renderStoryTeaser: function(model){
    this.storyTeaserView = new Crosscut.Views.StoryTeaserView({ model: model })
    this.$el.append( this.storyTeaserView.render().el );
  },
  
  render: function(){
    var context = { 
      stories: this.collection.toJSON()
    };
    this.$el.html( _.template( $('#story-list-view').html(), context ) );
    return this;
  }
});

Crosscut.Views.StoriesMain = Backbone.View.extend({
  el: $("#app .wrapper"),
  
  initialize: function(options){
    _.bindAll(this, 'render');
    this.render();
  },
  
  render: function(){
    //this.$el.html( _.template( $('#home').html() ) );
    
    this.storylist = new Crosscut.Views.StoryListView();
  }
});