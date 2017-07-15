// ============================================
// =
// =    BUSINESS LOGIC
// =
// ============================================
//Variables with Global Scope
var newPizza;

//Pizza Constructor
function Pizza(size, crust, sauce, meats, veggies, cheeses, toppingsCount) {
  this.size = size;
  this.crust = crust;
  this.sauce = sauce;
  this.meats = meats;
  this.veggies = veggies;
  this.cheeses = cheeses;
  this.toppingsCount = toppingsCount;
}

function createPizza() {
  var inputtedSize = $("select#pieSize").val();
  var inputtedCrust = $("select#pieCrust").val();
  var inputtedSauce = $("select#pieSauce").val();
  var inputtedMeats = [];
  var inputtedVeggies = [];
  var inputtedCheeses = [];
  var calculatedToppingsCount;
  $("input:checkbox[name=meats]:checked").each(function() {
    var meat = $(this).val();
    inputtedMeats.push(meat);
  })
  $("input:checkbox[name=veggies]:checked").each(function() {
    var vegetable = $(this).val();
    inputtedVeggies.push(vegetable);
  })
  $("input:checkbox[name=cheese]:checked").each(function() {
    var cheese = $(this).val();
    inputtedCheeses.push(cheese);
  })
  newPizza = new Pizza(inputtedSize, inputtedCrust, inputtedSauce, inputtedMeats, inputtedVeggies, inputtedCheeses, 0);
  newPizza.toppingsCount = newPizza.meats.length + newPizza.veggies.length + newPizza.cheeses.length;

  console.log(newPizza);
  $("#configuredSize").text(newPizza.size);
  $("#configuredCrust").text(newPizza.crust);
  $("#configuredSauce").text(newPizza.sauce);

  newPizza.meats.forEach(function(meat) {
    $("ul#configuredMeats").append("<li>" + meat + "</li>");
  })

  newPizza.veggies.forEach(function(veggie) {
    $("ul#configuredVeggies").append("<li>" + veggie + "</li>");
  })

  newPizza.cheeses.forEach(function(cheese) {
    $("ul#configuredCheeses").append("<li>" + cheese + "</li>");
  })

  $(".configureProduct").hide();
  $(".confirmProduct").show();

}

Pizza.prototype.costing = function() {
  var baseCost = 10;
  var toppingsCharge;
  var crustCharge;
  var pizzaCost;
  var subtotalCost;

  console.log(this.toppingsCount);

  if (this.toppingsCount <= 3) {
    toppingsCharge = 0;
  } else if (this.toppingsCount > 3) {
    toppingsCharge = (this.toppingsCount - 3) * 1;
  }

  if (this.crust = "Pan Crust") {
    crustCharge = 0;
  } else {
    crustCharge = 1;
  }

  subtotalCost = baseCost + toppingsCharge + crustCharge
  if (this.size = 10) {
    pizzaCost = subtotalCost;
  } else if (this.size > 10) {
    pizzaCost = (calculateCircleArea(this.size) / calculateCircleArea(10)) * subtotalCost
  }
  $("#configuredPrice").text(pizzaCost + ", which seems cheap to me.");
}


function calculateCircleArea(radius) {
  return Math.PI * (radius * radius);
}







// ============================================
// =
// =     FRONT-END LOGIC
// =
// ============================================

$(Document).ready(function() {
  $(".configureProduct form").submit(function(event) {
    event.preventDefault();
    createPizza();
    newPizza.costing();
  })
})
