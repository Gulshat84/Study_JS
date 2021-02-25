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

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  expensesMonth: 0,
  addExpenses: [],  
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  check: function() {
    if (salaryAmount.value !== '') {
      start.removeAttribute('disabled');
    }
  },

  start: function() {
    if (salaryAmount.value === '') {
      alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
      start.setAttribute('disabled', 'true');
      return;
    }
    let allInput = document.querySelectorAll('.data input[type = text]');
    allInput.forEach(function(item) {
      item.setAttribute('disabled', 'disabled');
    });
    expensesPlus.setAttribute('disabled', 'disabled');
    incomePlus.setAttribute('disabled', 'disabled');
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

    this.ShowResult();
  },

  ShowResult: function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
  },

    
  
  addExpensesBlock: function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    for (let i = 0; i < cloneExpensesItem.childNodes.length; i++) {
      cloneExpensesItem.childNodes[i].value = '';
    }
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
    this.validate();
  }, 

  addIncomeBlock: function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    for (let i = 0; i < cloneIncomeItem.childNodes.length; i++) {
      cloneIncomeItem.childNodes[i].value = '';
    }
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
    this.validate();
  },

  getExpenses: function() {
    expensesItems.forEach(function(item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },

  getExpensesMonth: function() {       
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }  
  },

  getIncome: function() {
    incomeItems.forEach(function(item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = +cashIncome;
      }
    });
  },

  getIncomeMonth: function() {
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  },

  getAddExpenses: function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
      item = item.trim();
      if(item !== ''){
        this.addExpenses.push(item);
      }
    });
  },

  getAddIncome: function() {
    additionalIncomeItem.forEach(function(item) {
      let itemValue = item.value.trim();
      if(itemValue !== ''){
        this.addIncome.push(itemValue);
      }
    });
  },

  deposit: confirm('Есть ли у вас депозит в банке?'),

  getInfoDeposit: function() {
    if(appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент?', '10');
      }
      while (isNaN(appData.percentDeposit) || appData.percentDeposit === '' || appData.percentDeposit === null);

      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
      while (isNaN(appData.moneyDeposit) || appData.moneyDeposit === '' || appData.moneyDeposit === null);      
      
    }
  },

    
  getBudget: function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);    
  },

  getTargetMonth: function() {
    const result = Math.ceil(targetAmount.value / this.budgetMonth)
    if (result <= 0) {
      return 'Цель не будет достигнута';
    } else {
      return 'Цель будет достигнута через' + ' ' + result + ' ' + 'месяцев';
    }
    
  },
    
  getStatusIncome: function() {
    
    if (this.budgetDay > 1200) {
      return ('У вас высокий уровень дохода');
    } else if (this.budgetDay > 600 && budgetDay < 1200) {
      return ('У вас средний уровень дохода');
    } else if (this.budgetDay > 0 && budgetDay < 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (this.budgetDay < 0) {
      return ('Что-то пошло не так');
    }
  },
    
  calcPeriod: function() {
    periodAmount.textContent = periodSelect.value;  
    incomePeriodValue.value = this.budgetMonth * periodSelect.value;
  },

};

start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
salaryAmount.addEventListener('keyup', appData.check);
cancel.addEventListener('click', appData.reset.bind(appData));

periodSelect.addEventListener('change', function() {
  periodAmount.innerHTML = periodSelect.value;
});

let addExp = [];
for (let i = 0; i < appData.addExpenses.length; i++) {
  let element = appData.addExpenses[i].trim();
  element = element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
  addExp.push(element);
}
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