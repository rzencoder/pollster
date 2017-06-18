'use strict';

(function() {

  var addOption = document.querySelector('.add-option');
  var apiUrl = appUrl + '/newpoll';
  var optionInputs = $('.option-inputs');

  addOption.addEventListener('click', function() {
    var input = $('<input type="text" name="option"></input>');
    optionInputs.append(input);
  }, false);

})();
