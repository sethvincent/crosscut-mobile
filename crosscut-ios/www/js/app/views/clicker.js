Crosscut.Views.ClickerListView = Backbone.View.extend({
  el: $('#app .wrapper'),
  
  initialize: function(options){
    var self = this;
    $(".loading").show();
    _.bindAll(this, 'render', 'update');
    this.collection = new Crosscut.Collections.ClickerList;
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
    this.$el.append( _.template( $('#clicker-list-view').html(), context ) );
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