Crosscut.Views.Member = Backbone.View.extend({
  el: $("#app .wrapper"),
  
  initialize: function(options){
    this.render();
  },
  
  events: {
    'click .member': 'member'
  },
  
  member: function(e){
    e.preventDefault();
    var href = $(e.currentTarget).attr('href');
    window.open(href, '_system');
  },
  
  render: function(){
    this.$el.html( _.template( $('#member').html() ) );
  }
});