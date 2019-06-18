// ------------ Back-end logic ------------------
function AccountBook () {
  this.accounts = []
}

AccountBook.prototype.addAccount = function(accToAdd){
  this.accounts.push(accToAdd);
}

var currentId = 0;

function BankAccount(name, current) {

  this.name = name;
  this.current = current;
  this.id = ++currentId;

  console.log(currentId);

}

BankAccount.prototype.deposit = function(deposit) {
  this.current += deposit
}

BankAccount.prototype.withdraw = function(withdraw) {
  this.current -= withdraw
}

var allAccounts = new AccountBook();

  // ---------- User interface logic --------------
$(document).ready(function() {


  $("#register").submit(function (event) {
    event.preventDefault();
    var name = $("#name").val();
    var initial = parseFloat($("#initial").val());
    var currentAcc = new BankAccount(name, initial)
    allAccounts.addAccount(currentAcc);
    console.log(allAccounts);
    $("#openDisplay").text(currentAcc.current);
  })

  $("#funds").submit(function (event) {
    event.preventDefault();
    var id = $("#idInput").val();
    if($("#deposit").val() != ""){
      allAccounts.accounts[id-1].deposit(parseFloat($("#deposit").val()))
    }
    if($("#withdraw").val() != ""){
      allAccounts.accounts[id-1].withdraw(parseFloat($("#withdraw").val()))
    }

    // console.log(allAccounts);


    $("#currentDisplay").text(allAccounts.accounts[id-1].current);
  })
})
