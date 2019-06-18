// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Here the address array type data is defined by address array
function Address(address){
  this.street = address[0];
  this.city = address[1];
  this.zipcode = address[2];
  this.state = address[3];
  this.type = address[4];
}

// we call Address proptotype and send it to Contact constructor
function setupAddress(add){
  if(add[0] !== "")
    return new Address(add)
  else
    return null
}

// Business Logic for Contacts ---------

// For Tuesday practice, we add here email property and two addresses
// An address has multiple elements and we define array of address for data type.
// We call a function name setupAddress to reduce repetive code line in here.
function Contact(inputs, mailingInputs, billingInputs) {
  this.firstName = inputs[0]
  this.lastName = inputs[1]
  this.phoneNumber = inputs[2]
  this.email = inputs[3]
  // this.firstName = firstName
  // this.lastName = lastName
  // this.phoneNumber = phoneNumber
  // this.email = email
  this.mailingAddress = setupAddress(mailingInputs)
  this.billingAddress = setupAddress(billingInputs)
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// ------------------------    User Interface Logic ----------------------------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + " " + contact.email + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showAddress (address) {
  if(!address) return;

  var type = address.type;
  $("#show-" + type).show();
  $("." + type + "-street").html(address.street);
  $("." + type + "-city").html(address.city);
  $("." + type + "-zipcode").html(address.zipcode);
  $("." + type + "-state").html(address.state);
}


function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email").html(contact.email);

  showAddress(contact.mailingAddress);
  showAddress(contact.billingAddress);

  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    $("#show-contact").hide();
    $("#show-m").hide();
    $("#show-b").hide();
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    $("#show-m").hide();
    $("#show-b").hide();
    displayContactDetails(addressBook);
  });
};

// make an array for large numbers of input items rather than type indivisually....
// var userInputs = ["new-first-name", "new-last-name", "new-phone-number", "email", "streetOne", "cityOne", "zipcodeOne", "stateOne", "streetTwo", "cityTwo", "zipcodeTwo", "stateTwo"];
var userInputs = ["new-first-name", "new-last-name", "new-phone-number", "email"];
var userMailingInputs = ["m-street", "m-city", "m-zipcode", "m-state"];
var userBillingInputs = ["b-street", "b-city", "b-zipcode", "b-state"];

function getInputs(inputs){
  return inputs.map(function(input){
    var result = $("input#"+input).val();
    $("input#"+input).val("");
    return result;
  })
}

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputs = getInputs(userInputs);
    var mailingInputs = getInputs(userMailingInputs)
    mailingInputs.push('m')
    console.log(mailingInputs);
    var billingInputs = getInputs(userBillingInputs)
    billingInputs.push('b')
    // var inputtedFirstName = $("input#new-first-name").val();
    // var inputtedLastName = $("input#new-last-name").val();
    // var inputtedPhoneNumber = $("input#new-phone-number").val();
    // var inputtedEmail = $("input#email").val();
    // $("input#new-first-name").val("");
    // $("input#new-last-name").val("");
    // $("input#new-phone-number").val("");
    // $("input#email").val("");

    // var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail, mailingAddress, billingAddress);
    var newContact = new Contact(inputs, mailingInputs, billingInputs);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
})
