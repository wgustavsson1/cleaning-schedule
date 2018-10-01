

function createSchedule()
{
  var pairs = ["C14.C15", "C16.C17", "C10.C11", "C12.C13"];
  schedule = {};
  week = 1;
  index = 0;
  while(week <= 52)
  {
    schedule[week] = pairs[index];
    if(index == pairs.length - 1) index = 0;
    else index ++;
    week++;
  }
  week = 1;
  return schedule
}

var schedule = createSchedule()

function getNextWeek(week,n)
{
  if (week + n > 52) week = 1;
  else week = week + n;
  return week;
}

Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    var today = new Date(this.getFullYear(),this.getMonth(),this.getDate());
    var dayOfYear = ((today - onejan +1)/86400000);
    return Math.ceil((dayOfYear + 1)/7)
};

var today = new Date();
var today_week = today.getWeek()
var count = 1;
show_nr_of_weeks = 52 - today_week + today_week

function showSchedule(n,weekno)
{

  var today = new Date();
  var week_today = today.getWeek()

  if(count > show_nr_of_weeks)
  {
    return;
  }

  for(var i = 0; i < n; i++)
  {
    div = $("<div></div>");
    rooms = schedule[weekno].split(".");
    rooms = rooms.join(" and ")

    p = $("<h4></h4>").text(rooms);
    h3 = $("<h2></h2>").text("#" + weekno);
    h3.appendTo(div);
    p.appendTo(div);
    div.attr('class',"week")
    if(weekno == week_today)div.attr('class','thisweek');
    div.appendTo($("#center"));
    weekno = getNextWeek(weekno,1);
    count++;
  }
}

$( document ).ready(function() {
    var today = new Date();
    var weeknumber = today.getWeek();
    showSchedule(5,weeknumber);
    weeknumber = getNextWeek(weeknumber,4)
    $("footer").click(function(){
      weeknumber = getNextWeek(weeknumber,1)
      showSchedule(1,weeknumber);
      $('html, body').scrollTop($(document).height());
    })

});
