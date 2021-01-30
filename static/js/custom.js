$(document).ready(function() {
  coins_chart = [];
  
  var bitcoin_init = parseFloat($('#bitcoin-value').val());
  var ethereum_init = parseFloat($('#ethereum-value').val());
  var coin_init_length = $('.coin_init').length;
  for (var i = 0; i < coin_init_length; i++) {
    coins_chart.push(document.getElementsByClassName("activity-chart")[i].getContext("2d"));
  }
  var coin_init = [];
  var chart_data = []; 
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
        labels: [cal_time(-12).toString(), cal_time(-10).toString(), cal_time(-8).toString(), cal_time(-6).toString(), cal_time(-4).toString(), cal_time(-2).toString(), cal_time(0).toString()],
        datasets: [ {
          label: "My Second dataset",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: [0,0,0,0,0,0,parseFloat(coin_init[i])]
        }]
      };
      runChart(chart_data[i], options, i);
    }
   
  }

  init();

  setInterval(function() {
    tradingchart();
  }, 7200000);

  $('#trading-config').change(function() {
     var index = parseInt($('#trading-config').val());
     for (var i = 0; i < coin_init_length; i++) {
       if (i === index) {
          $($(".activity-chart")[i]).css('opacity',1);  
       }
       else {
         $($(".activity-chart")[i]).css('opacity',0);
       }
     }
     
  })

  function cal_time(x) {
    var today = new Date();
   cal_hour = new Date(today.valueOf() + (x *3600000));
   res_hour = cal_hour.getHours() + ":" + cal_hour.getMinutes() + ":" + cal_hour.getSeconds();
   return res_hour;
  }

  function runChart(data, options, index){    

      var myLineChart = new Chart(coins_chart[index]).Line(data, options); 
  }
  var k = 0;
  function setLabels(labels, j) {
    if (j === 0) {
      k = k+2;  
    }    
    labels.push(cal_time(k).toString());    
    labels.shift();
    console.log(labels)
    return labels;    
  }

  function setData(data,res) {
    data.push(parseFloat(res));
    data.shift();
    return data;
  }

  function tradingchart() {
    $.ajax({
      url:"/activity",
      success:function(res) {
        setTimeout(function(){
          for (var j = 0; j < coin_init_length; j++) {
            setData(chart_data[j].datasets[0].data,res[j]);
            setLabels(chart_data[j].labels, j);
            runChart(chart_data[j], options, j);
          }   
        },3000);             
      }
    });
  }  

});