$(document).ready(function() {
  var ctx = document.getElementById("myChart").getContext("2d");
  var trading_activity = $('#trading-value').val();
  
  function cal_time(x) {
    var today = new Date();
   cal_hour = new Date(today.valueOf() + (x *3600000));
   res_hour = cal_hour.getHours() + ":" + cal_hour.getMinutes() + ":" + cal_hour.getSeconds();
   return res_hour;
  }
  
  // var current_time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  var data = {
    labels: [cal_time(-12).toString(), cal_time(-10).toString(), cal_time(-8).toString(), cal_time(-6).toString(), cal_time(-4).toString(), cal_time(-2).toString(), cal_time(0).toString()],
    datasets: [ {
      label: "My Second dataset",
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: [0,0,0,0,0,0,trading_activity]
    }]
  };
  var options = {
    animation: false,
    //Boolean - If we want to override with a hard coded scale
    scaleOverride: false,
    //** Required if scaleOverride is true **
    //Number - The number of steps in a hard coded scale
    scaleSteps: 10,
    //Number - The value jump in the hard coded scale
    scaleStepWidth: 30,
    //Number - The scale starting value
    scaleStartValue: 0
  };

  runChart(data, options);

  setInterval(function() {
    setData(data.datasets[0].data);

    setLabels(data.labels);

    runChart(data, options);
  }, 7200000);

 function runChart(data, options){
  var myLineChart = new Chart(ctx).Line(data, options);
 }

  function setLabels(labels) {
    var k = 0;
    labels.push(cal_time(k).toString());
    k = k+2;
    labels.shift();
  }

  function setData(data) {
    $.ajax({
      url:"/data",
      success:function(res) {
        data.push(res);
        data.shift();
      }
    });    
  }


});

