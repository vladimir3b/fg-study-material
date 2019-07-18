import * as material from 'material-components-web';
material.autoInit();

const MDCTextField  = material.textField.MDCTextField;
const MDCCheckbox = material.checkbox.MDCCheckbox;
const MDCSelect = material.select.MDCSelect;
const MDCRadio = material.radio.MDCRadio;

const firstName = new MDCTextField(document.querySelector('#firstName'));
const lastName = new MDCTextField(document.querySelector('#lastName'));
const email = new MDCTextField(document.querySelector('#email'));
const checkbox = new MDCCheckbox(document.querySelector('#termsCheckbox'));
const genderSelector = new MDCRadio(document.querySelector('#genderSelector')); // this doesn't work...
const hobbySelector = new MDCSelect(document.querySelector('#hobbySelector'));
const submitButton = document.querySelector('#submitButton');


submitButton.addEventListener('click', () => {
  const response = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    gender: genderSelector.value,
    hobby: hobbySelector.value,
    terms: checkbox.checked
  };
  console.log(JSON.stringify(response));
});



