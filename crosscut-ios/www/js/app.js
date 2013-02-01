scroller = new FTScroller(document.getElementById('scrollable'), {
  scrollingX: false,
  scrollbars: false,
  updateOnWindowResize: true,
  maxFlingDuration: 1
});
    
window.addEventListener('load', function() {
  new FastClick(document.body);
}, false);


window.Crosscut = {
  url: "http://crosscut.com/api/v1/",
  Models: {},
  Collections: {},
  Views: {},
  Routers: {}
};


window.app = {
  initialize: function() {
    console.log("app initializing");
    var App = new Crosscut.Views.Root();
    App.startRouting();
  }
};