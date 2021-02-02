console.log("Hello!");

let agePerson = 20;
console.log(agePerson);


// Дополнительный доход
let income = 'Фриланс';
console.log(typeof income);


// Доход за месяц
let money = +prompt('Ваш месячный доход?');
console.log(typeof money);
console.log(money);



// Возможные расходы
let addExpenses = 'Интернет, Такси, Коммуналка, Продукты';
console.log(addExpenses.length);
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(' '));

let expenses1 = prompt('Введите обязательную статью расходов');
console.log(expenses1);

let amount1 = +prompt('Во сколько это обойдётся');
console.log(amount1);

let expenses2 = prompt('Введите обязательную статью расходов');
console.log(expenses2);

let amount2 = +prompt('Во сколько это обойдётся');
console.log(amount2);

let expenses = amount1 + amount2;
console.log(expenses);
console.log(typeof expenses);



// Булевое значение
let deposit = confirm('Есть ли у вас депозит в банке?');
console.log(typeof deposit);
console.log(deposit);

// Желаемая сумма накопления
let mission = 200000;
console.log('Цель заработать' + ' ' + mission + ' ' + 'рублей');
console.log(typeof mission);

// Бюджет на месяц
let budgetMonth = money-expenses;

console.log(typeof budgetMonth);


// Период от 1 до 12 месяцев
let period = mission/budgetMonth;
console.log('Период равен' + ' ' + Math.ceil(period) + ' ' + 'месяцев');
console.log(Math.ceil(period));

// Дневной бюджет
let budgetDay = budgetMonth/30;
console.log(Math.floor(budgetDay));

// Уровень дохода
if (budgetDay>1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay>600) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay<600) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay<0) {
  console.log('Что-то пошло не так');
};

