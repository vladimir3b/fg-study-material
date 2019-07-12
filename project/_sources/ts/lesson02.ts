import { MDCDialog } from '@material/dialog';
const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));
const button = document.getElementById('button1');
button.addEventListener('click', () => dialog.open());
