'use strict';

(function() {
  var apiUrl = appUrl + '/getpolls';
  var list = $('.list')

  function updateData(data) {
    var polls = JSON.parse(data).data;
    polls.reverse().forEach(function(poll, i) {
      var anchor = $('<a></a>');
      var li = $('<li></li>');
      li.text(poll.question);
      anchor.attr('href', appUrl + '/poll/' + poll.question)
      anchor.append(li);
      anchor.css('position', 'relative');
    anchor.css('opacity', 0);
    anchor.css('top', '100px')

    anchor.animate({opacity: 1, top: 0}, i * 150)
      list.append(anchor);
    })
  }

  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateData));

})();
