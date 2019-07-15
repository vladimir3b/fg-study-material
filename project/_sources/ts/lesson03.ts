import * as material from 'material-components-web';
material.autoInit();

const MDCTextField  = material.textField.MDCTextField;
const firstName = new MDCTextField(document.querySelector('#firstName'));
const lastName = new MDCTextField(document.querySelector('#lastName'));
const email = new MDCTextField(document.querySelector('#email'));
const submitButton = document.querySelector('#submitButton');

submitButton.addEventListener('click', () => {
  const response = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value
  };
  console.log(JSON.stringify(response));
});



