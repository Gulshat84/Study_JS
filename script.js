'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let money,
    income = 'Фриланс',
    addExpenses = prompt('Перечислите возможные расходы через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 200000;
    
do {
  money = prompt('Ваш месячный доход?');
} while (!isNumber(money));


let showTypeOf = function(data) {
  console.log(data, typeof(data));
};


showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


console.log(addExpenses.toLowerCase().split(','));

// let expenses1 = prompt('Введите обязательную статью расходов');
// let expenses1Amount = +prompt('Во сколько это обойдётся');
// let expenses2 = prompt('Введите обязательную статью расходов');
// let expenses2Amount = +prompt('Во сколько это обойдётся');


let expenses = [];




let getExpensesMonth = function() {
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


let expensesAmount = getExpensesMonth();

console.log('Расходы за месяц: ' + expensesAmount);
console.log(typeof expensesAmount);

let diff = 0;
let getAccumulatedMonth = function(c, d) {
  let diff = c - d;
  return diff;
};

let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);
console.log('Накопления за месяц:' + accumulatedMonth);
console.log(typeof accumulatedMonth);


let target = 0;
let getTargetMonth = function(e, f) {
  let target = e / f;

  return target;
};

let targetMonth = getTargetMonth(mission, accumulatedMonth);
console.log(typeof targetMonth);

let mis = function() {
  if (targetMonth > 0) {
    console.log('Цель будет достигнута');
  } else {
    console.log('Цель не будет достигнута');
  }
};

mis();

console.log('Цель заработать' + ' ' + mission + ' ' + 'рублей');
console.log('Цель будет достигнута за' + ' ' + Math.ceil(targetMonth) + ' ' + 'месяцев');


// Дневной бюджет
let budgetDay = accumulatedMonth / 30;
console.log('Бюджет на день: ' + Math.floor(budgetDay) + ' ' + 'рублей');

// Уровень дохода
let getStatusIncome = function() {
  if (budgetDay>1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay>600 && budgetDay<1200) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay>0 && budgetDay<600) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay<0) {
  console.log('Что-то пошло не так');
}
};

getStatusIncome();




