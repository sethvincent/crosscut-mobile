/*
scroller = new FTScroller(document.getElementById('scrollable'), {
  scrollingX: false,
  scrollbars: true,
  updateOnWindowResize: true,
  maxFlingDuration: 0,
  bouncing: false
});
*/
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