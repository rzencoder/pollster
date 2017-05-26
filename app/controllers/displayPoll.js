'use strict';

(function() {
  var apiUrl = appUrl + '/getpolls';
  var list = document.querySelector('.list')

  function updateData(data) {
    var polls = JSON.parse(data).data;
    polls.reverse().forEach(poll => {
      var anchor = document.createElement('a');
      var li = document.createElement('li');
      li.innerHTML = poll.question;
      anchor.href = appUrl + '/poll/' + poll.question;
      anchor.appendChild(li);
      list.appendChild(anchor);
    })
  }

  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateData));

})();
