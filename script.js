class calculator{
  constructor(previousOperandtxt,currentOperandtxt){
    this.previousOperandtxt = previousOperandtxt
    this.currentOperandtxt = currentOperandtxt
    this.clear()
  }
  clear(){
    this.currVal = ''
    this.prevVal = ''
    this.operator = undefined
  }
  operation(ope){
    if(this.currVal === '')return;
    if(this.prevVal !== ''){
      this.compute()
    }
    this.operator =ope
    this.prevVal = this.currVal
    this.currVal = ''
  }
  compute() {
    let computation
    const prev = parseFloat(this.prevVal)
    const current = parseFloat(this.currVal)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operator) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '/':
        computation = prev / current
        break
      default:
        return
    }
    this.currVal = computation
    this.operator = undefined
  }
  append(num){
    if(num == '.' && this.currVal.includes('.')) return
    this.currVal = this.currVal.toString() + num.toString()
  }
  del(){
    this.currVal = this.currVal.slice(0, -1)
  }
  update(){
    this.currentOperandtxt.innerText = this.currVal
    if (this.operator != null) {
      this.previousOperandtxt.innerText = this.prevVal.toString() + ' ' +this.operator.toString()
    } else {
      this.previousOperandtxt.innerText = ''
    }
  }
}

const number = document.querySelectorAll('[data-numbers]');
const op = document.querySelectorAll('[data-operation]');
const ac = document.querySelector('[data-ac]');
const c = document.querySelector('[data-c]');
const eq = document.querySelector('[data-equal]');
const previousOperandtxt = document.querySelector('[data-prev]');
const currentOperandtxt = document.querySelector('[data-curr]');


const calc = new calculator(previousOperandtxt,currentOperandtxt);

number.forEach(button =>{
  button.addEventListener('click',()=>{
    calc.append(button.innerText)
    calc.update()
  })
})
op.forEach(button =>{
  button.addEventListener('click',()=>{
    calc.operation(button.innerText)
    calc.update()
  })
})
ac.addEventListener('click', ()=>{
  calc.clear();
  calc.update();
})
c.addEventListener('click', ()=>{
  calc.del();
  calc.update();
})
eq.addEventListener('click', button => {
  calc.compute()
  calc.update()
})
