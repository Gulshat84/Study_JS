'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let start = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#deposit-check'),
    budgetDayValue = document.getElementsByClassName('.budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('.budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('.expenses_month-value')[0],
    accumulatedMonthValue = document.getElementsByClassName('.accumulated_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('.additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('.additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('.income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('.target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    //itemIncome = document.querySelector('.income-title'),
    //cashIncome = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),    
    additionalExpenses = document.querySelector('.additional-expenses'),
    periodSelect = document.querySelector('.period-select'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target_amount'),    
    titlePeriodAmount = document.querySelector('.title period-amount');


class AppData {
  constructor(options) {
  this.budget = options.budget;
  this.budgetDay = options.budgetDay;
  this.budgetMonth = options.budgetMonth;
  this.income = options.income;
  this.incomeMonth = options.incomeMonth;
  this.addIncome = options.addIncome;
  this.expenses = options.expenses;
  this.expensesMonth = options.expensesMonth;
  this.addExpenses = options.addExpenses;  
  this.deposit = options.deposit;
  this.percentDeposit = options.percentDeposit;
  this.moneyDeposit = options.moneyDeposit;
  }
};

AppData.prototype.check = () => {
    if (salaryAmount.value !== '') {
      start.removeAttribute('disabled');
    }
  };

AppData.prototype.start = function() {
    if (salaryAmount.value === '') {
      alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
      start.setAttribute('disabled', 'true');
      return;
    }
    let allInput = document.querySelectorAll('.data input[type = text]');
    allInput.forEach((item) => {
      item.setAttribute('disabled', 'true');
    });
    expensesPlus.setAttribute('disabled', 'true');
    incomePlus.setAttribute('disabled', 'true');
    start.style.display = 'none';
    cancel.style.display = 'block';

    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.getInfoDeposit();
    this.getStatusIncome();
    this.showResult();
  };

AppData.prototype.showResult = function() {
  const _this = this;
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = Math.ceil(this.getTargetMonth());
  incomePeriodValue.value = this.calcPeriod();
  periodSelect.addEventListener('change', function() {
    incomePeriodValue.value = _this.calcPeriod();
  });
};
  
AppData.prototype.addExpensesBlock = function() {
  expensesItems = document.querySelectorAll('.expenses-items');
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
  for (let i = 0; i < cloneExpensesItem.childNodes.length; i++) {
    cloneExpensesItem.childNodes[i].value = '';
  }
  
  if(expensesItems.length === 3) {
    expensesPlus.style.display = 'none';
  }
  this.validate();
}; 

AppData.prototype.addIncomeBlock = function() {
  incomeItems = document.querySelectorAll('.income-items');
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
  for (let i = 0; i < cloneIncomeItem.childNodes.length; i++) {
    cloneIncomeItem.childNodes[i].value = '';
  }
  
  if(incomeItems.length === 3) {
    incomePlus.style.display = 'none';
  }
  this.validate();
};

AppData.prototype.getExpenses = function() {
  const _this = this;
  expensesItems.forEach(function(item) {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if(itemExpenses !== '' && cashExpenses !== '') {
      _this.expenses[itemExpenses] = +cashExpenses;
    }
  });
};

AppData.prototype.getExpensesMonth = function() {       
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }  
  };

AppData.prototype.getIncome = function() {
  const _this = this;
    incomeItems.forEach(function(item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== '') {
        _this.income[itemIncome] = +cashIncome;
      }
    });
  };
  
AppData.prototype.getIncomeMonth = function() {
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  };

AppData.prototype.getAddExpenses = function() {
  let addExpenses = additionalExpensesItem.value.split(',');
  const _this = this;
  addExpenses.forEach(function(item) {
    item = item.trim();
    if(item !== ''){
      _this.addExpenses.push(item);
    }
  });
};

AppData.prototype.getAddIncome = function() {
  const _this = this;
  additionalIncomeItem.forEach(function(item) {
    let itemValue = item.value.trim();
    if(itemValue !== ''){
      _this.addIncome.push(itemValue);
    }
  });
};


AppData.prototype.getInfoDeposit = function() {
    if(this.deposit) {
      do {
        this.percentDeposit = prompt('Какой годовой процент?', '10');
      }
      while (isNaN(this.percentDeposit) || this.percentDeposit === '' || this.percentDeposit === null);

      do {
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
      while (isNaN(this.moneyDeposit) || this.moneyDeposit === '' || this.moneyDeposit === null);      
      
    }
  };

    
AppData.prototype.getBudget = () => {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);    
  };

AppData.prototype.getTargetMonth = () => {
    const result = Math.ceil(targetAmount.value / this.budgetMonth)
    if (result <= 0) {
      return 'Цель не будет достигнута';
    } else {
      return `Цель будет достигнута через ${result} месяцев`;
    }
    
  };
    
AppData.prototype.getStatusIncome = () => {
    
    if (this.budgetDay > 1200) {
      return ('У вас высокий уровень дохода');
    } else if (this.budgetDay > 600 && budgetDay < 1200) {
      return ('У вас средний уровень дохода');
    } else if (this.budgetDay > 0 && budgetDay < 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (this.budgetDay < 0) {
      return ('Что-то пошло не так');
    }
  };
    
AppData.prototype.calcPeriod = () => {
  return this.budgetMonth * periodSelect.value;
};

AppData.prototype.reset = function() {
  let inputTextData = document.querySelectorAll('.data input[type = text]'),
      resultInputAll = document.querySelectorAll('.result input[type = text]');

  inputTextData.forEach(function(elem) {
    elem.value = '';
    elem.removeAttribute('disabled');
    periodSelect.value = '0';
    periodAmount.innerHTML = periodSelect.value;
  });
  
  resultInputAll.forEach(() => {
    elem.value = '';
  });

  for (let i = 1; i < incomeItems.length; i++) {
    incomeItems[i].parentNode.removeChild(incomeItems[i]);
    incomePlus.style.display = 'block';
  }
  for (let i = 1; i < expensesItems.length; i++) {
    expensesItems[i].parentNode.removeChild(expensesItems[i]);
    expensesPlus.style.display = 'block';
  }

  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.expensesMonth = 0;
  this.addExpenses = [];  
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;

  cancel.style.display = 'none';
  start.style.display = 'block';
  expensesPlus.removeAttribute('disabled');
  incomePlus.removeAttribute('disabled');
  checkBox.checked = false;
};

AppData.prototype.eventListeners = function() {
  start.addEventListener('click', this.start);
  expensesPlus.addEventListener('click', this.addExpensesBlock);
  incomePlus.addEventListener('click', this.addIncomeBlock);
  salaryAmount.addEventListener('keyup', this.check);
  cancel.addEventListener('click', this.reset);
  
  periodSelect.addEventListener('change', function() {
  periodAmount.innerHTML = periodSelect.value;
});

let addExp = [];
for (let i = 0; i < this.addExpenses.length; i++) {
  let element = this.addExpenses[i].trim();
  element = element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
  addExp.push(element);
}
};




const appData = new AppData();
console.log(appData);

appData.eventListeners();




/*

console.log('Расходы за месяц: ' + appData.expensesMonth);

if (appData.getTargetMonth() > 0) {
  console.log('Цель будет достигнута за' + ' ' + Math.ceil(appData.getTargetMonth()) + ' ' + 'месяцев');
} else {
  console.log('Цель не будет достигнута');
}

console.log(appData.getStatusIncome());

for (let key in appData) {
  console.log('Наша программа включает в себя данные: ' + key + ' - ' + appData[key]);
}

console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());




let calculation = document.getElementById('#start');
console.log(calculation);

let incomeAdd = document.getElementsByTagName('button')[0];
console.log(incomeAdd);

let expensesAdd = document.getElementsByTagName('button')[1];
console.log(expensesAdd);

let checkbox = document.querySelector('#deposit-check');
console.log(checkbox);

let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
console.log(additionalIncomeItem);

let budgetDayValue = document.getElementsByClassName('budget_day-value');
console.log(budgetDayValue);

let expensesMonthValue = document.getElementsByClassName('expenses_month-value');
console.log(expensesMonthValue);

let additionalIncomeValue = document.getElementsByClassName('additional_income-value');
console.log(additionalIncomeValue);

let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value');
console.log(additionalExpensesValue);

let incomePeriodValue = document.getElementsByClassName('income_period-value');
console.log(incomePeriodValue);

let targetMonthValue = document.getElementsByClassName('target_month-value');
console.log(targetMonthValue);

let budgetMonthValue = document.querySelector('.budget_month-value');
console.log(budgetMonthValue);

let salaryAmount = document.querySelector('.salary-amount');
console.log(salaryAmount);

let incomeTitle = document.querySelector('.income-title');
console.log(incomeTitle);

let incomeAmount = document.querySelector('.income-amount');
console.log(incomeAmount);

let expensesTitle = document.querySelector('.expenses-title');
console.log(expensesTitle);

let expensesAmount = document.querySelector('.expenses-amount');
console.log(expensesAmount);

let additionalExpensesItem = document.querySelector('.additional_expenses-item');
console.log(additionalExpensesItem);

let periodSelect = document.querySelector('.period-select');
console.log(periodSelect);

*/