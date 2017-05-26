'use strict';

(function() {
  
  var addOption = document.querySelector('.add-option');
  var apiUrl = appUrl + '/newpoll';
  var optionInputs = document.querySelector('.option-inputs');

  addOption.addEventListener('click', function() {
    var input = document.createElement("input");
    input.type = "text";
    input.name = "option";
    optionInputs.append(input);
  }, false);

})();
