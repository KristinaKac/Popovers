import Popovers from '../components/popovers/popovers';

const popovers = new Popovers();
const activePopovers = [];

const btns = document.querySelectorAll('.btn');

btns.forEach((btn) => {
  btn.addEventListener('click', onBtnClick);
});

function onBtnClick(e) {
  e.preventDefault();

  const element = e.target;

  const indexEl = activePopovers.findIndex((id) => element.dataset.id == id);

  if (indexEl !== -1) {
    activePopovers.splice(indexEl, 1);
    popovers.removePopover(element.dataset.id);
    element.dataset.id = '';
  } else {
    activePopovers.push(popovers.showPopover('Pop-up text', element));
  }
}
