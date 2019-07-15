import * as material from 'material-components-web';
material.autoInit();

const myDialog = new material.dialog.MDCDialog(document.querySelector('.mdc-dialog'));
const button = document.getElementById('button1');
button.addEventListener('click', () => myDialog.open());
