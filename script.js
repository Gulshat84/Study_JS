'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let money;

let start = function() {
  do {
    money = prompt('Ваш месячный доход?', 50000);
  }
  while (!isNumber(money));
};

start();
console.log(money);


let appData = {
  income: {},
  addIncome: [],  
  addExpenses: [],
  expenses: {},
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 200000,
  period: 3,  
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function() {

    if (confirm('Есть ли у вас дополнительный источник заработка?')) {
      let itemIncome;
      let cashIncome;
      for (let i = 0; i < 2; i++) {
        do {
          itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
        }
        while (isNumber(itemIncome) || itemIncome.trim() === '' || itemIncome === null);        

        do {
          cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
        }
        while (isNaN(cashIncome) || cashIncome.trim() === '' || cashIncome === null);

        appData.income[itemIncome] = cashIncome;
      }      
      
    }
    
    let addExpenses = prompt('Перечислите возможные расходы через запятую');
    appData.addExpenses = addExpenses.toLowerCase().split(',');
        
        for (let i = 0; i < 2; i++) {
          let itemExpenses;
          let cashExpenses;

          do {
            itemExpenses= prompt('Введите обязательную статью расходов', 'например: садик частный');
          }
          while (isNumber(itemExpenses) || itemExpenses.trim() === '' || itemExpenses === null);
          
          do {
            cashExpenses = prompt('Во сколько это обойдётся?, 2500');
          }
          while (isNaN(cashExpenses) || cashExpenses.trim() === '' || cashExpenses === null);
          
          appData.expenses[itemExpenses] = cashExpenses;
        }
        appData.deposit = confirm('Есть ли у вас депозит в банке?');            
        
  },

  getExpensesMonth: function() {
    
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }    
    console.log(appData.addExpenses.join(', '));
     
  },

    
  getBudget: function() {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);    
  },

  getTargetMonth: function() {
    return appData.mission / appData.budgetMonth;
    
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

  calcSavedMoney: function() {
    return appData.budgetMonth * appData.period;
  }

};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getInfoDeposit();


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


//console.log('Накопления за месяц:' + appData.accumulatedMonth);
//console.log(typeof appData.accumulatedMonth);

//console.log(typeof appData.targetMonth);

//console.log('Бюджет на день: ' + Math.floor(appData.budgetDay) + ' ' + 'рублей');

//console.log('Цель заработать' + ' ' + appData.mission + ' ' + 'рублей');



//appData[asking] = appData.getExpensesMonth;


/*
getAccumulatedMonth: function(c, d) {
    appData.accumulatedMonth = appData.budget - appData.expensesMonth;
    return appData.accumulatedMonth;
  },


let expenses = function() {
  let expenses = [];
  let sum = 0;
  let check;

  for (let i=0; i<2; i++) {
    
    expenses[i] = prompt('Введите обязательную статью расходов', 'например: садик частный');

    check = prompt('Во сколько это обойдётся?');

    while (!isNumber(check)) {
      check = prompt('Во сколько это обойдётся?');
    }
    sum += +check;        
  };    
  console.log(expenses);
  return sum;
};
expenses();

*/
