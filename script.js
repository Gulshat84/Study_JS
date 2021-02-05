'use strict';


let money = +prompt('Ваш месячный доход?', 50000),
    income = 'Фриланс',
    addExpenses = prompt('Перечислите возможные расходы через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 200000;
    

let showTypeOf = function(data) {
  console.log(data, typeof(data));
};


showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


console.log(addExpenses.split(' '));

let expenses1 = prompt('Введите обязательную статью расходов');
let expenses1Amount = +prompt('Во сколько это обойдётся', 5000);
let expenses2 = prompt('Введите обязательную статью расходов');
let expenses2Amount = +prompt('Во сколько это обойдётся', 15000);


let sum = 0;
let getExpensesMonth = function(a, b) {
  let sum = a + b;
  return sum;
};

let expensesAmount = getExpensesMonth(expenses1Amount, expenses2Amount);

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




