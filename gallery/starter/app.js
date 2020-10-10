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
  this.modalImgsDiv = this.modal.querySelector('.modal-images');
  this.modalImgs = [...this.modal.querySelectorAll('.modal-img')];

  this.closeModal = function(){
    this.modal.classList.remove('open')
  }

  this.closeBtn.addEventListener('click', this.closeModal.bind(this));

}

Gallery.prototype.addListeners = function(ele){
  if(Array.isArray(ele)){
    ele.map(item=>{
      item.addEventListener('click',()=>{
        this.modal.classList.add('open')
        this.mainImg.setAttribute('src',item.src)
        this.modalImgsDiv.textContent = ""
        //adding modal images
        ele.map(item=>{
          let img = document.createElement('img');
          img.setAttribute('src',item.src)
          img.setAttribute('alt',item.alt)
          img.setAttribute('title',item.title)
          img.setAttribute('data-id', item.dataset.id)
          img.setAttribute('class', 'modal-img')
          img.addEventListener('click',()=>{
            this.mainImg.setAttribute('src',item.src)
            this.mainImg.setAttribute('alt',item.alt)
            this.mainImg.setAttribute('data-id',item.dataset.id)
          })
          this.modalImgsDiv.appendChild(img)
        })
      })
    })
  }
}

const nature = new Gallery(getElement('.nature'))
const city = new Gallery(getElement('.city'))

nature.addListeners(nature.list);
city.addListeners(city.list)