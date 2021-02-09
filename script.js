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
  expenses: 0,
  deposit: false,
  mission: 200000,
  period: 3,  
  budget: money,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function() {
    let addExpenses = prompt('Перечислите возможные расходы через запятую');
        appData.addExpenses = addExpenses (item => item.toLowerCase().split(',').trim().slice(0, 1) + item.slice(1));

        appData.expenses = prompt('Во сколько это обойдётся?');

        while (!isNumber(appData.expenses)) {
          appData.expenses = prompt('Во сколько это обойдётся?');
        }
        appData.deposit = confirm('Есть ли у вас депозит в банке?');      
        
  },

  getExpensesMonth: function() {
    for (appData.addExpenses in appData.expenses){
      console.log('ключ: ' +appData.addExpenses + 'значение: ' + appData.expenses[appData.addExpenses]);
    }
    appData.expensesMonth += appData.expenses[appData.addExpenses];
    
    console.log('Расходы за месяц: ' + appData.expensesMonth),
    console.log(typeof appData.expensesMonth)
  },

    
  getBudget: function() {
    appData.accumulatedMonth = appData.budget - appData.expensesMonth;
    return appData.accumulatedMonth;
  },

  getTargetMonth: function() {
    appData.targetMonth = appData.mission / appData.accumulatedMonth;
    
    if (appData.targetMonth > 0) {
      console.log('Цель будет достигнута');
    } else {
      console.log('Цель не будет достигнута');
    }
    
    console.log('Цель будет достигнута за' + ' ' + Math.ceil(appData.targetMonth) + ' ' + 'месяцев');
  },
    
  getStatusIncome: function() {
    appData.budgetDay = appData.accumulatedMonth / 30;

    if (appData.budgetDay>1200) {
      console.log('У вас высокий уровень дохода');
    } else if (appData.budgetDay>600 && budgetDay<1200) {
      console.log('У вас средний уровень дохода');
    } else if (appData.budgetDay>0 && budgetDay<600) {
      console.log('К сожалению у вас уровень дохода ниже среднего');
    } else if (appData.budgetDay<0) {
      console.log('Что-то пошло не так');
    }
  }

};
appData.asking();

appData.getStatusIncome();



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



appData.expenses = function() {
  let expenses = [];
  let sum = 0;
  let check;
  
  for (let i=0; i<2; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов', 'например: садик частный');
    do {
      check = prompt('Во сколько это обойдётся?');
    }
    while (isNaN(check) || check === '' || check === null);
    
    sum += +check;
  };
  
  console.log(expenses);
  return sum;
};
appData.expenses = asking();
*/

/*
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

//appData.asking = expenses();
