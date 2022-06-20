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
const quantity = document.getElementById('quantity');
const radioButtons = document.querySelectorAll('input[name="location"]');
const btnSubmit = document.querySelector('.btn-submit');
//const btnSubmit = document.getElementsByClassName('btn-submit');
//const btnSubmit = document.getElementById('btn-submit');
const checkCondition = document.getElementById('checkbox1');

disableBtnSubmit ();

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
quantity.addEventListener('input', isQuantityValid);
btnSubmit.addEventListener('click', isLocationChecked);
radioButtons[0].addEventListener('change', isLocationChecked);
checkCondition.addEventListener('change', isConditionChecked);
document.querySelector('form').addEventListener('change', isFormValid);

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
    console.log(email.value);
    return false;
  }

  hideError(parent);
  console.log(email.value);
  return true;
}

function isBirthdateValid () {
  const parent = birthdate.closest('div');
  showError(parent);

  //verify date input value to be formated like YYYY-MM-DD (HTML input type date format)
  if (birthdate.value.trim().length !== 10 && !/^\d{4}(\-)(((0)[1-9])|((1)[0-2]))(\-)([0-2][0-9]|(3)[0-1])$/.test(birthdate.value)) {
    if (birthdate.value.trim().length !== 10) {
      console.log(birthdate.value + " n'est pas égal à 10 char");
    }
    else {
      console.log("La valeur entré n'est pas bonne");
    }
    return false;
  }

  hideError(parent);
  console.log(birthdate.value);
  return true;
}

function isQuantityValid () {
  const parent = quantity.closest('div');
  showError(parent);

  // verify that the input number is not negative and not empty
  if (quantity.value < 0 || quantity.value.trim() === "") {
    return false;
  }

  hideError(parent);
  return true;
}

function isLocationChecked () {
  const parent = radioButtons[0].closest('div');
  showError(parent);
  
  //get all the radio buttons and verify that one is checked
  let selectedCity;
  for (const radioButton of radioButtons) {
      if (radioButton.checked) {
          selectedCity = radioButton.value;
          hideError(parent);
          return true;
      }
      else {
        showError(parent);
        return false;
      }
  }
}

function isConditionChecked () {
  const parent = checkCondition.closest('div');
  showError(parent);
  //checking if the first checkbox is checked
  if (!checkCondition.checked) {
    return false;
  } 

  hideError(parent);
  return true;
}

function disableBtnSubmit () {
  //change submit button to be unclickable
  btnSubmit.disabled = true;
  btnSubmit.style.opacity = '0.5';
  btnSubmit.style.background = 'grey';
  btnSubmit.style.cursor = 'not-allowed';
}

function enableBtnSubmit () {
  //submit button back to normal mode
  btnSubmit.disabled = false;
  btnSubmit.style.opacity = '1';
  btnSubmit.style.background = '#fe142f';
  btnSubmit.style.cursor = 'pointer';
}

function isFormValid() {
  //verify if every conditions are true
  if (isFirstNameValid ()
      && isLastNameValid ()
      && isEmailValid ()
      && isBirthdateValid ()
      && isQuantityValid ()
      && isLocationChecked ()
      && isConditionChecked()) {
        enableBtnSubmit();
        return true;
      }

      disableBtnSubmit();
      return false;
}