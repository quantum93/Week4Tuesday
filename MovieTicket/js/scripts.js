// ------------ Back-end logic ------------------

function Ticket(movie, age, day) {
  this.movie = movie;
  this.age = age;
  this.day = day;
}

Ticket.prototype.yourPrice = function() {
  var price, r;
  price = r = 10;

  var today = new Date();
  var current_day = today.getDate();

// IF you apply a combination of if and it becomes exponential to consider every cases....
// Using intermediate variable to make it fresh for every different if condition's price,
// it becomes more consise implementation of writing.
  if (this.movie === "first-release")
    price = price + ((r * 1.3)-r)
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

  return price
}

  // ---------- User interface logic --------------

  $(document).ready(function() {
    $("#display").submit(function(event) {
      event.preventDefault();
      var movie = $("input#movie").val()
      var age = $("input#age").val()
      var day = $("input#day").val()
      var ticket = new Ticket(movie, age, day);
      var price = ticket.yourPrice()
      $("#show-task").show();
      $(".movie").text(movie)
      $(".age").text(age)
      $(".day").text(day)
      $(".price").text(price)
    });
});
