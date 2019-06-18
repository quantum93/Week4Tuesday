// ------------ Back-end logic ------------------
var premiere = ["Aladdin", "Late Night"]
// This define the last day of each month from Jan to Dec...
var dayCount = [31, 28, 30, 31, 30, 29, 30, 30 , 31, 29, 30, 31]

function Ticket(movie, age, day, time) {
  this.movie = movie;
  this.age = age;
  this.day = day;
  this.time = time;
}

Ticket.prototype.yourPrice = function() {
  var price, r;
  price = r = 10;

  var today = new Date();
  var current_day = today.getDate();

// IF you apply a combination of if and it becomes exponential to consider every cases....
// Using intermediate variable to make it fresh for every different if condition's price,
// it becomes more consise implementation of writing.
  if (premiere.includes(this.movie)){
    // console.log(this.movie);
    price = price + ((r * 1.3)-r)

  }
    // price += (r * 1.3) - r
  if (this.age < 10){
    price -= r-(r * 0.7)
    // price = price - (r-(r * 0.7))
  }
  if(this.age > 60){
    price -= r -(r * 0.8)
    // price = price - (r-(r * 0.8))
  }
  if (this.day < (current_day + 7))
    price += (r * 1.1) - r
    // price = price + ()(r * 1.1) - r)
  if (this.time === 19|| this.time === 21) {
    price = price + ((r * 1.3)-r)
  }
  return price
}

  // ---------- User interface logic --------------



  $(document).ready(function() {

// This is part for the last day of each month
    $(".month").change(function(){
       var numDays = dayCount[$(this).val()]
       // we need to refresh the list of days in each month
       $(".day").text("");
       for(let i = 0; i < numDays; ++i){
         var o = new Option(""+(i+1), ""+(i+1))
         $(o).html(""+(i+1))
         //This is dynamic writing for each different last day of each month into html file.
         $(".day").append(o)
       }
    })

    $("#display").submit(function(event) {
      event.preventDefault();
      var movie = $(".movieInput").val()
      var age = $("input#age").val()
      var day = parseInt($(".day").val())
      var month = parseInt($(".month").val()) + 1;
      console.log(month);
      var time = $(".playtime").val()

      $("#day-warning").hide()
    
      var ticket = new Ticket(movie, age, day, time);
      var price = ticket.yourPrice()

      $("#show-task").show();
      $(".movie").text(movie)
      $(".age").text(age)
      if(month < 10)
        month = "0" + month;
      if(day < 10)
        day = "0" + day;
      $(".day").text(month+"/"+day)

      $(".playtime").text(time)
      $(".price").text(price)
    });
});
