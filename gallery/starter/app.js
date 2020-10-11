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
  this.imgName = this.modal.querySelector('.image-name');
  this.mainImg = this.modal.querySelector('.main-img');
  this.modalImgsDiv = this.modal.querySelector('.modal-images');
  this.modalImgs = [...this.modal.querySelectorAll('.modal-img')];

  this.closeModal = function(){
    this.modal.classList.remove('open')
    this.nextBtn.removeEventListener('click', this.nextImage)
    this.prevBtn.removeEventListener('click', this.prevImage)
  }

  this.nextBtn.addEventListener('click',this.nextImage);
  this.prevBtn.addEventListener('click',this.prevImage);
  this.closeBtn.addEventListener('click', this.closeModal.bind(this));

}

Gallery.prototype.addListeners = function(ele){
  if(Array.isArray(ele)){
    ele.map(item=>{
      item.addEventListener('click',()=>{
        this.modal.classList.add('open')
        this.mainImg.setAttribute('src',item.src)
        this.mainImg.setAttribute('alt',item.alt)
        this.mainImg.setAttribute('data-id',item.dataset.id)
        this.modalImgsDiv.textContent = ""
        this.imgName.textContent = item.title;
        //add event-listeners to next/prev buttons
        this.nextBtn.addEventListener('click',this.nextImage)
        this.prevBtn.addEventListener('click',this.prevImage)

        //adding modal images
        ele.map(modalImg=>{
          let img = document.createElement('img');
          img.setAttribute('src',modalImg.src)
          img.setAttribute('alt',modalImg.alt)
          img.setAttribute('title',modalImg.title)
          img.setAttribute('data-id', modalImg.dataset.id)
          img.setAttribute('class', `modal-img ${item.dataset.id===modalImg.dataset.id ? 'selected' : ''}`)
          img.addEventListener('click',()=>{
            this.mainImg.setAttribute('src',modalImg.src)
            this.mainImg.setAttribute('alt',modalImg.alt)
            this.mainImg.setAttribute('data-id',modalImg.dataset.id)
            this.imgName.textContent=modalImg.title;
            img.classList.add('selected')
            this.setSelected();
          })
          this.modalImgsDiv.appendChild(img)
        })
      })
    })

  }
}

Gallery.prototype.setSelected = function(ele){
  for(let img of this.modalImgsDiv.children){
    if(img.dataset.id !== this.mainImg.dataset.id){
      img.classList.remove('selected')
    }
  }
}

Gallery.prototype.nextImage = function(){
  //get the mainImg data-id
  //get the modal-imgs total
  //compare mainImg id with total of modal-imgs
  // increase mainImg id if it's lessthan total or set to 1
  //after updated id, get the img of that data-id
  //set that data-id img as main-img
  //set that img as selected in modalImgs


  let modalContentDiv = this.parentElement;
  let mainImg = modalContentDiv.querySelector('.main-img')
  let curId = parseInt(mainImg.dataset.id);
  let modalImgs = [...modalContentDiv.querySelectorAll('.modal-img')]
  let total = modalImgs.length;
  let newId = (curId===total) ? 1 : curId+1;
  let imgNameEle = modalContentDiv.querySelector('.image-name');

  for(let ele of modalImgs){
    if(parseInt(ele.dataset.id) === newId){
      mainImg.setAttribute('src',ele.src)
      mainImg.setAttribute('alt',ele.alt)
      mainImg.setAttribute('data-id',ele.dataset.id)
      imgNameEle.textContent=ele.title;
      ele.classList.add('selected')
    } else {
      ele.classList.remove('selected')
    }
  }
}

Gallery.prototype.prevImage = function(){
  //get the mainImg data-id
  //get the modal-imgs total
  //compare mainImg id with total of modal-imgs
  // decrease mainImg id if it's lessthan total or set to 1
  //after updated id, get the img of that data-id
  //set that data-id img as main-img
  //set that img as selected in modalImgs


  let modalContentDiv = this.parentElement;
  let mainImg = modalContentDiv.querySelector('.main-img')
  let curId = parseInt(mainImg.dataset.id);
  let modalImgs = [...modalContentDiv.querySelectorAll('.modal-img')]
  let total = modalImgs.length;
  let newId = (curId===1) ? total : curId-1;
  let imgNameEle = modalContentDiv.querySelector('.image-name');

  for(let ele of modalImgs){
    if(parseInt(ele.dataset.id) === newId){
      mainImg.setAttribute('src',ele.src)
      mainImg.setAttribute('alt',ele.alt)
      mainImg.setAttribute('data-id',ele.dataset.id)
      imgNameEle.textContent=ele.title;
      ele.classList.add('selected')
    } else {
      ele.classList.remove('selected')
    }
  }
}

const nature = new Gallery(getElement('.nature'))
const city = new Gallery(getElement('.city'))

nature.addListeners(nature.list);
city.addListeners(city.list)
