'use strict';

(function() {

  var appUrl = window.location.origin;
  var apiUrl = appUrl + '/poll/' + data.question;
  var question = document.querySelector('.question');
  question.innerHTML = 'Vote: ' + data.question;
  var options = document.querySelector('.options');
  var addOption = document.querySelector('.add-option');

  data.options.forEach(op => {

    var li = document.createElement('li');
    var anchor = document.createElement('a');
    li.innerHTML = op.option;
    anchor.classList.add('answer');
    anchor.append(li);
    options.append(anchor);

    li.addEventListener('click', function() {
      if (docCookies.getItem('fccpollster') !== data.question) {
        docCookies.setItem("fccpollster", data.question, 86400);
        $.ajax({
            url: apiUrl,
            type: "POST",
            data: {option: op.option}
          })
          .done(function(res) {
            showChart(res.data);
          });
      } else {
        $('.message').text('You have already voted on this poll!')
      }
    })
  })

  if (user) {
    addOption.addEventListener('click', function() {
      $('.add-option').hide();
      $('.add-option-container')
        .append(`<form class="add-option-form" role='form' action="${window.location.href}/addoption" method="post">
      <input type='text' name="newoption" placeholder='Enter Option'></input>
      <button class="btn btn-action-black" type="submit">Submit</button>
      </form>`);
    });
  }

  var backColorArray = [
    '#F6323E',
    '#034D5A',
    '#F7BE05',
    '#00BFB3',
    '#2b2b2b',
    '#d05802',
    '#391b45',
    '#731010',
    '#216e82',
    '#ecd644'
  ];

  var hoverColorArray = [
    '#FF4C58',
    '#1D6774',
    '#FFD81F',
    '#1AD9CD',
    '#454545',
    '#EA721C',
    '#53355F',
    '#8D2A2A',
    '#3B889C',
    '#FFF05E'
  ];

  function showChart(info) {
    $('.chart').empty();
    var can = document.createElement('canvas');
    $('.chart').append(can);
    var labels = [];
    var values = [];
    var canvas = document.querySelector('canvas');

    info.options.forEach(option => {
      labels.push(option.option);
      values.push(option.votes);
    });

    var myChart = new Chart(canvas, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: backColorArray,
          hoverBackgroundColor: hoverColorArray,
          borderWidth: 0
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
      }
    });
  }

  showChart(data);

})();
