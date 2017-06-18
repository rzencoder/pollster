'use strict';

  var displayName = document.querySelector('#display-name');
  var pollList = document.querySelector('#user-polls');
  var apiUrl = appUrl + '/api/:id';

  function displayPolls(data) {
    data.forEach(function(item) {
      var li = document.createElement('li');
      li.classList.add('poll-li');
      var anchor = document.createElement('a');
      var p = document.createElement('p');
      var delButton = document.createElement('button');
      delButton.innerHTML = 'Delete'
      delButton.classList.add('btn');
      delButton.classList.add('btn-action-red');
      delButton.classList.add('del-btn');
      delButton.addEventListener('click', function() {
        ajaxFunctions.ajaxRequest('POST', appUrl + '/delete/' + item.question, function(res) {
          location.reload();
        })
      });
      anchor.href = appUrl + '/poll/' + item.question;
      p.innerHTML = item.question;
      anchor.appendChild(p);
      li.appendChild(anchor);
      li.appendChild(delButton);
      pollList.appendChild(li);
    })
  }

  function deletePoll(item) {
    ajaxFunctions.ajaxRequest('POST', appUrl + '/delete/' + item.question, function(res) {
      ajaxFunctions.ajaxRequest('GET', apiUrl, function(res) {
        var data = JSON.parse(res);
        displayName.innerHTML = data.user.username;
        displayPolls(data.data)
      })
    });
  }

  function loadPolls() {
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(res) {
      var data = JSON.parse(res);
      displayName.innerHTML = data.user.username;
      displayPolls(data.data)
    }))
  }

  loadPolls();
