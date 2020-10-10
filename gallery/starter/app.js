function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(
    `Please check "${selection}" selector, no such element exists`
  );
}

function Gallery(element){
  this.list  = [...element.querySelectorAll('img')];
  this.modal = getElement('.modal');
  this.closeBtn = this.modal.querySelector('.close-btn');
  this.prevBtn = this.modal.querySelector('.prev-btn');
  this.nextBtn = this.modal.querySelector('.next-btn');
  this.mainImg = this.modal.querySelector('.main-img');
  this.modalImgs = this.modal.querySelector('.modal-images');
  this.modalImg = this.modal.querySelectorAll('.modal-img');
  console.log([...this.modalImg]);
}

const nature = new Gallery(getElement('.nature'))
const city = new Gallery(getElement('.city'))