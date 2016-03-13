(function($) {

  /**
   * Copyright 2012, Digital Fusion
   * Licensed under the MIT license.
   * http://teamdf.com/jquery-plugins/license/
   *
   * @author Sam Sehnert
   * @desc A small plugin that checks whether elements are within
   *     the user visible viewport of a web browser.
   *     only accounts for vertical position, not horizontal.
   */

  $.fn.visible = function(partial) {
    
      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;
    
    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

  };
    
})(jQuery);

var win = $(window);

var allMods = $(".panel");

allMods.each(function(i, el) {
  var el = $(el);
  if (el.visible(true)) {
    el.addClass("already-visible"); 
  } 
});

win.scroll(function(event) {
  
  allMods.each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass("come-in"); 
    } 
  });
  
});

$("a[href='#collapse-senate']").click(function(){
  $.getJSON('us-senate.json', function(data) {
      //console.log("Senate getting clicked");
      //if (data){console.log("There is data")};
            var items = [];
              $.each( data, function( key, val ) {
                  items.push( "<a href='" + val.url + "'><h2 id='" + key.name + "'>" + val.name + "</h2></a>" );
                  items.push( "<li>" + val.party + " from " + val.area + "</li>" );
                  //items.push( "<li>Area: " + val.area + "</li>" );
              });
            $(".us-senate").append('<div class="collapse" id="collapse-senate"><div class="well">' + items.join("") + '</div></div>');

  });
});



$("a[href='#collapse-house']").click(function(){
  $.getJSON('us-house.json', function(data) {
        console.log("House getting clicked");
            var items = [];
              $.each( data, function( key, val ) {
                  items.push( "<a href='" + val.url + "'><h2 id='" + key.name + "'>" + val.name + "</h2></a>" );
                  items.push( "<li>" + val.party + " from " + val.area + "</li>" );
              });
            $(".us-house").append('<div class="collapse" id="collapse-house"><div class="well">' + items.join("") + '</div></div>');
  });
});
