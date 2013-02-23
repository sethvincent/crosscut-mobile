Crosscut.Views.Home = Backbone.View.extend({
  el: $("#app .wrapper"),
  
  initialize: function(options){
    _.bindAll(this, 'render');
    this.render();
  },
  
  events: {
    'click .main-site': 'main'
  },
  
  main: function(e){
    e.preventDefault();
    var href = $(e.currentTarget).attr('href');
    window.open(href, '_system');
  },
  
  render: function(){
    this.$el.html( _.template( $('#home').html() ) );
  }
});