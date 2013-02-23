Crosscut.Views.ClickerListView = Backbone.View.extend({
  className: 'clicker-links',
  
  initialize: function(options){
    var that = this;
    $(".loading").show();
    this.collection = new Crosscut.Collections.ClickerList;
    this.collection.fetch({ update: true, remove: true })
      .done(function(){
        that.render();
      });
  },
  
  events: {
    'click .clicker-link': 'clicker',
    'click .next': 'update'
  },
  
  clicker: function(e){
    e.preventDefault();
    var href = $(e.currentTarget).attr('href');
    window.open(href, '_system');
  },
  
  update: function(e){
    e.preventDefault();
    var that = this;
    $(".next").text("loading ...");
    this.collection.requestNextPage({ update: true, remove: true })
      .done(function(){
        that.render();
        $(".next:lt(1)").remove();
      });
  },
  
  render: function(){
    var context = { 
      stories: this.collection.toJSON()
    };
    var html = this.$el.append( _.template( $('#clicker-list-view').html(), context ) )
    $('.clicker-main').append( html );
    $(".loading").hide();
    return this;
  }
});

Crosscut.Views.ClickerMain = Backbone.View.extend({
  el: $("#app .wrapper"),
  
  initialize: function(options){
    _.bindAll(this, 'render');
  },
  
  render: function(){
    this.$el.html( $("#clicker-main").html() );
    this.storylist = new Crosscut.Views.ClickerListView();
    return this;
  }
});