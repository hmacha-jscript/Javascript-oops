function Counter(element,value){
    this.element = element;
    this.value = value
    this.decreaseBtn = element.querySelector('.decrease');
    this.resetBtn = element.querySelector('.reset')
    this.increaseBtn = element.querySelector('.increase')
    this.valueSpan = element.querySelector('.value');

    this.valueSpan.textContent = value;

    this.decreaseBtn.addEventListener('click', this.decrease.bind(this))
    this.increaseBtn.addEventListener('click', this.increase.bind(this))
    this.resetBtn.addEventListener('click', this.reset.bind(this))

}

Counter.prototype.increase = function(){
    let val = this.valueSpan.textContent;
    this.valueSpan.textContent = Number(val) + 1;
}

Counter.prototype.decrease = function(){
    let val = this.valueSpan.textContent;
    this.valueSpan.textContent = Number(val) - 1;
}

Counter.prototype.reset = function(){
    this.valueSpan.textContent = this.value;
}

const firstContainer = document.querySelector('.first-container')
const secondContainer = document.querySelector('.second-container')

const firstCounter = new Counter(firstContainer,120)
const secondCounter = new Counter(secondContainer,11)