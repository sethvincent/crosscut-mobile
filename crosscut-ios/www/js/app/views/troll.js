Crosscut.Views.TrollListView = Backbone.View.extend({
  el: $('#app .wrapper'),
  
  initialize: function(options){
    var self = this;
    $(".loading").show();
    _.bindAll(this, 'render', 'renderStoryTeaser', 'update');
    this.collection = new Crosscut.Collections.TrollList;
    this.collection.fetch({ 
      dataType: 'jsonp',
      success: function(){
        //self.render();
        console.log("huh", self)
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
      .done(function( data, textStatus, jqXHR ) {});
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
    this.$el.append( _.template( $('#daily-troll-list-view').html(), context ) );
    $(".loading").hide();
    return this;
  }
});

Crosscut.Views.TrollMain = Backbone.View.extend({
  el: $("#app .wrapper"),
  
  initialize: function(options){
    _.bindAll(this, 'render');
  },
  
  render: function(){
    console.log("huh", this);
    this.$el.html( $("#daily-troll-main").html() );
    this.storylist = new Crosscut.Views.TrollListView();
    return this;
  }
});
