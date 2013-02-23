Crosscut.Views.Member = Backbone.View.extend({
  el: $("#app .wrapper"),
  
  initialize: function(options){
    _.bindAll(this, 'render');
    this.render();
  },
  
  render: function(){
    this.$el.html( _.template( $('#member').html() ) );
  }
});