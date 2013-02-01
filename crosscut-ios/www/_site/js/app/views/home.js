Crosscut.Views.Home = Backbone.View.extend({
  el: $("#app .wrapper"),
  
  initialize: function(options){
    _.bindAll(this, 'render');
    this.render();
  },
  
  render: function(){
    this.$el.html( _.template( $('#home').html() ) );
  }
});