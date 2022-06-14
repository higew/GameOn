function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelectorAll(".close");
const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const birthdate = document.getElementById('birthdate');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
modalClose[0].addEventListener ("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal (){
  modalbg.style.display = "none";
}


// eventListener

firstName.addEventListener('input', isFirstNameValid);
lastName.addEventListener('input', isLastNameValid);
email.addEventListener('input', isEmailValid);
birthdate.addEventListener('input', isBirthdateValid);

// function check input

function showError(el) {
  el.setAttribute('data-error-visible', true);
}

function hideError(el) {
  el.setAttribute('data-error-visible', false)
}

function isFirstNameValid () {
  const parent = firstName.closest('div');
  showError(parent);

  //Old regex ghetto

  // if (firstName.value.trim().length < 2 || firstName.value.trim() === "" || !/^[A-zÀ-ÿ][A-zÀ-ÿ-][A-zÀ-ÿ]+$/.test(firstName.value)) {

  //Regex is Allowing Accent and also hyphen between names but not before and after names and also deny double hyphen
  if (firstName.value.trim().length < 2 || firstName.value.trim() === "" || !/^[A-zÀ-ÿ]+(?:-?[A-zÀ-ÿ]+)+$/.test(firstName.value)) {
    return false;
  } 

  hideError(parent);
  return true;
}

function isLastNameValid () {
  const parent = lastName.closest('div');
  showError(parent);

  //same as above
  if (lastName.value.trim().length < 2 || lastName.value.trim() === "" || !/^[A-zÀ-ÿ]+(?:-?[A-zÀ-ÿ]+)+$/.test(lastName.value)) {
    return false;
  } 

  hideError(parent);
  return true;
}

function isEmailValid () {
  const parent = email.closest('div');
  showError(parent);

  //verify that only letter, number and (underscore or hyphen) are written before the @ and same for the hosting name after the @ + verify that only 2-5 letter only after the dot
  if (!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email.value)) {
    return false;
  }

  hideError(parent);
  return true;
}

function isBirthdateValid () {
  const parent = birthdate.closest('div');
  showError(parent);

  //verify date input value to be formated like YYYY-MM-DD (HTML input type date format)
  if (!/^\d{4}(\-)(((0)[1-9])|((1)[0-2]))(\-)([0-2][0-9]|(3)[0-1])$/.test(birthdate.value)) {
    return false;
  }

  hideError(parent);
  return true;
}