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
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpenses = document.querySelector('.additional-expenses'),
    periodSelect = document.querySelector('.period-select'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target_amount'),
    incomeItems = document.querySelectorAll('.income-items'),
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
  start: function() {
    appData.getSalaryAmount();
    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();
    appData.getInfoDeposit();
    appData.getStatusIncome();
    

    appData.ShowResult();
  },

  ShowResult: function() {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcPeriod();
  },

  getSalaryAmount: function() {
    if (salaryAmount.value === '') {
      alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
      return;
    }
    appData.budget = +salaryAmount.value;
  },  
  
  addExpensesBlock: function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);    
    if(expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  }, 

  addIncomeBlock: function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    if(incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },

  getExpenses: function() {
    expensesItems.forEach(function(item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },

  getIncome: function() {
    incomeItems.forEach(function(item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = +cashIncome;
      }
    });    
  },

  getAddExpenses: function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
      item = item.trim();
      if(item !== ''){
        appData.addExpenses.push(item);
      }
    });
  },

  getAddIncome: function() {
    additionalIncomeItem.forEach(function(item) {
      let itemValue = item.value.trim();
      if(itemValue !== ''){
        appData.addIncome.push(itemValue);
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
  
  getExpensesMonth: function() {    
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },

  getIncomeMonth: function() {
    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },
    
  getBudget: function() {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);    
  },

  getTargetMonth: function() {
    return targetAmountValue / appData.budgetMonth;
    
  },
    
  getStatusIncome: function() {
    
    if (appData.budgetDay > 1200) {
      return ('У вас высокий уровень дохода');
    } else if (appData.budgetDay > 600 && budgetDay < 1200) {
      return ('У вас средний уровень дохода');
    } else if (appData.budgetDay > 0 && budgetDay < 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (appData.budgetDay < 0) {
      return ('Что-то пошло не так');
    }
  },
  getPeriod: function(event) {
    console.log(event.target.value);
  },
  
  
  calcPeriod: function() {    
    return appData.budgetMonth * periodSelect.value;
  },

};
start.addEventListener('click', appData.start);
periodSelect.addEventListener('change', getPeriod);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);

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