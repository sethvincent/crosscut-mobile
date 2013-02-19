Crosscut.Views.TrollListView = Backbone.View.extend({
  className: 'troll-stories',
  
  initialize: function(options){
    var that = this;
    $(".loading").show();
    this.collection = new Crosscut.Collections.TrollList;
    this.collection.fetch({ update: true, remove: true })
      .done(function(){
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
        that.render();
        $(".next")[0].remove();
      });
  },
  
  render: function(){
    var context = { 
      stories: this.collection.toJSON()
    };
    var html = this.$el.append( _.template( $('#daily-troll-list-view').html(), context ) )
    $('.troll-main').append( html );
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
