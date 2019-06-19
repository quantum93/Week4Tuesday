// ------------ Back-end logic ------------------
//크게 두 부분으로 나눌 수 있다. 첫 부분은 2열부터 11열까지가 AccountBook이라는 함수로 생성자를
// 만들고 해당 method(여기서는 addAccount)를 정의한다.
var allAccounts = new AccountBook();

function AccountBook () {
  this.accounts = []
}

AccountBook.prototype.addAccount = function(accToAdd){
  this.accounts.push(accToAdd);
}

// 비슷한 방법으로 이번에는 BankAccount 라는 함수로 생성자를 만들면서 (해당 라인은 user interface logic에
// var currentAcc = new BankAccount(name, initial)) 필요한 method 두가지 (deposit와 withdraw)를 정의한다.
// 이때 id를 부여해서 계좌정보를 이름이 아니라 id로 변별하도록 해주기 위해서는 this.id라인이 펼요하다.
// 주의할 사항은 초기 currentId 설정이 함수 안에 있으면 함수가 호출 될때마다 초기화 되서 항상 id가 0가 된다.
var currentId = 0;

function BankAccount(name, current) {
  this.name = name;
  this.current = current;
  this.id = ++currentId;
}

BankAccount.prototype.deposit = function(deposit) {
  this.current += deposit
}

BankAccount.prototype.withdraw = function(withdraw) {
  this.current -= withdraw
}
  // ---------- User interface logic --------------
$(document).ready(function() {
  $("#register").submit(function (event) {
    event.preventDefault();
    // 아래 두 라인만이 사용자로부터 입력을 받는 부분
    var name = $("#name").val();
    var initial = parseFloat($("#initial").val());
    // 입력된 두가지 데이터는 jQuery loop안에서 생성된 생성자 (currentAcc)에 파라미터가 되고 이 생성자는
    // 다른 생성자(allAccounts)에 addAccount method를 이용해서 해당 입략정보를 보내게 된다.
    // 결국 BankAccount 함수의 속성이 AccountBook 함수의 배열에 요소로서 하나씩 저장이 되고 해당 배열은 고유의 id를 가지게 된다.
    var currentAcc = new BankAccount(name, initial)
    allAccounts.addAccount(currentAcc); // 한 생성자의 결과가 속성으로서 다른 생성자에 method를 통해 그 생성자에서 작동한다. 
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
    $("#currentDisplay").text("The current amount of account " + allAccounts.accounts[id-1].id  + " is " + allAccounts.accounts[id-1].current);
  })
})
