$(document).ready(function() {
  coins_chart = [];
  var coin_init_length = $('.coin_init').length;
  for (var i = 0; i < coin_init_length; i++) {
    coins_chart.push(document.getElementsByClassName("activity-chart")[i].getContext("2d"));
  }
  var coin_init = [];
  var time_init = [];
  var chart_data = [];

  function getRandomInt(max) {
    return Math.random() * Math.floor(max);
  }

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
  function init(){
    
    for (var i = 0; i < coin_init_length; i++) {      
      coin_init.push($($('.coin_init')[i]).val());

      chart_data[i] = {
        labels: [cal_time(-19).toString(), cal_time(-18).toString(), cal_time(-17).toString(), cal_time(-16).toString(), cal_time(-15).toString(), cal_time(-14).toString(), cal_time(-13).toString(), cal_time(-12).toString(), cal_time(-11).toString(), cal_time(-10).toString(), cal_time(-9).toString(), cal_time(-8).toString(), cal_time(-7).toString(), cal_time(-6).toString(), cal_time(-5).toString(), cal_time(-4).toString(), cal_time(-3).toString(), cal_time(-2).toString(), cal_time(-1).toString(), cal_time(0).toString()],
        datasets: [ {
          label: "My Second dataset",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,parseFloat(coin_init[i])]
        }]
      };
      runChart(chart_data[i], options, i);
    }
   console.log(coin_init)
  }

  init();

  setInterval(function() {
    tradingchart();
  }, (getRandomInt(3)+1)*150000);

  $('#trading-config').change(function() {
     var index = parseInt($('#trading-config').val());
     for (var i = 0; i < coin_init_length; i++) {
       if (i === index) {
          $($(".activity-chart")[i]).css('z-index',1);
          $($(".activity-chart")[i]).css('opacity',1);
       }
       else {
         $($(".activity-chart")[i]).css('z-index',0);
         $($(".activity-chart")[i]).css('opacity',0);
       }
     }
     
  })

  function cal_time(x) {
    var today = new Date();
   cal_hour = new Date(today.valueOf() + (x *180000));
   res_hour = cal_hour.getHours() + ":" + cal_hour.getMinutes() + ":" + cal_hour.getSeconds();
   return res_hour;
  }

  function runChart(data, options, index){    

      var myLineChart = new Chart(coins_chart[index]).Line(data, options); 
  }
  var k = 0;
  function setLabels(labels, j) {
    if (j === 0) {
      k++;  
    }    
    labels.push(cal_time(k).toString());    
    labels.shift();
    // console.log(labels)
    return labels;    
  }

  function setData(data,res) {
    data.push(res);
    data.shift();
    return data;
  }
var cnt = 0;
  function tradingchart() {
    $.ajax({
      url:"/activity",
      success:function(res) {
        if (res[2] === true) {
          for (var j = 0; j < coin_init_length; j++) {
            setData(chart_data[j].datasets[0].data,res[0][j]);
            setData(chart_data[j].labels, res[1][j]);
            runChart(chart_data[j], options, j);
          }
        }      
                  
      }
    });
  }
});