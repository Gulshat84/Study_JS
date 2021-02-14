'use strict';

let advertising = document.querySelector('.adv');
console.log(advertising);
advertising.remove();

let collection = document.querySelectorAll('.books'),
    elem = document.querySelectorAll('.book'),
    ulCollection = document.querySelectorAll('ul'),
    liElem = document.querySelectorAll('li');

console.log(collection);
console.log(elem);
console.log(ulCollection);
console.log(liElem);

elem[1].after(elem[0]);
elem[5].after(elem[2]);
elem[4].after(elem[3]);

document.body.style.backgroundImage = "url('image/you-dont-know-js.jpg')";

let chapterThree = document.getElementsByTagName('h2')[2];
console.log(chapterThree);

chapterThree.textContent = 'Книга 3. this и Прототипы Объектов';
chapterThree.style.color = 'darkkhaki';

let newElem = document.createElement('li');
newElem.textContent = 'Глава 8: За пределами ES6';

ulCollection[2].append(newElem);
newElem.after(liElem[26]);

liElem[47].after(liElem[55]);
liElem[50].after(liElem[48]);
liElem[53].after(liElem[51]);

liElem[3].after(liElem[6]);
liElem[6].after(liElem[8]);
liElem[9].after(liElem[2]);







//let secondHead = document.querySelectorAll('h2');
