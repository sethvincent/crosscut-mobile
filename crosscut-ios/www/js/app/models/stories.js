Crosscut.Models.Story = Backbone.Model.extend({
  initialize: function(options){
    this.path = options.path;
  },
  
  url: function(){
    return Crosscut.url + 'story/' + this.path;
  }
});


Crosscut.Collections.StoryList = Backbone.Paginator.requestPager.extend({
  
  model: Crosscut.Models.Story,
  paginator_core: {
    type: 'GET',
    dataType: 'jsonp',
    url: Crosscut.url + 'story/'
  },
  
  paginator_ui: {
    firstPage: 0,
    currentPage: 0,
    perPage: 3,
    totalPages: 10
  },
  
  server_api: {
    'filter': function() {return this.filterString },
    'limit': function() { return this.perPage },
    'offset': function() {
      if ( this.currentPage === 0 ){
        return 0;
      } else {
        return this.currentPage * this.perPage
      }
    },
    'skip': function() { return this.currentPage * this.perPage }
  },
  
  initialize: function(){
    _.bindAll(this, 'parse');
    console.log("collection", this);
  },
  
  setFilter: function (filter) {
      this.filterString = filter; 
      this.pager();
  },
  
  parse: function (response) {
    // Be sure to change this based on how your results
    // are structured (e.g d.results is Netflix specific)
    var tags = response.objects;
    //Normally this.totalPages would equal response.d.__count
    //but as this particular NetFlix request only returns a
    //total count of items for the search, we divide.
    this.totalPages = Math.ceil(response.meta.total_count / this.perPage);
    this.totalRecords = parseInt(response.meta.total_count);
    return tags;
  },
  
  search_url: function(term) {
    return Crosscut.url + '?name__icontains=' + term;
  },
  
  query: function(query){
    if (query.term.length > 2) {
      this.url = this.search_url(query.term);
      this.fetch();
    } else {
      this.fetch();
    };
  },
  
  moreStories: function(options){
    this
  },
  
});

Crosscut.Views.StoriesMain = Backbone.View.extend({
  el: $("#app .wrapper"),
  
  initialize: function(options){
    _.bindAll(this, 'render');
    this.render();
  },
  
  render: function(){
    this.$el.html( _.template( $('#home').html() ) );
    
    this.storylist = new Crosscut.Views.StoryListView();
  }
});