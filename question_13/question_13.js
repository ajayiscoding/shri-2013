/* Напишите на JavaScript функцию, которая выводит список всех чисел, которые равны сумме факториалов своих цифр. 
Пример такого числа:
4! + 0! + 5! + 8! + 5! = 40585 */

function getListOfNumbersEqualSumOfFactorialsItsDigits(maxNumber){
  var summ = 0,
      digits,
      digit;

  /*
    Из числа получаем массив цифр
    Например: 34 => ["3", "4"]
  */
  var getArrayOfDigits = function(number){
    var digits = number.toString().split('');

    return digits;
  }

  var getFactorialOf = function(n){
    var factorial = 1;

    for(var i = 2; i <= n; i += 1){
      factorial *= i;
    }

    return factorial;
  }


  for(var n = 0; n < maxNumber; n += 1){
    digits = getArrayOfDigits(n);

    for(var i = 0, size = digits.length; i < size; i += 1){
      digit = parseInt(digits[i]);
      summ += getFactorialOf(digit);
    }

    if(summ === n){
      console.log('Число: ' + n);
      console.log('Сумма факториалов его цифр: ' + summ);
      console.log("");
    }

    summ = 0;
  }
}

getListOfNumbersEqualSumOfFactorialsItsDigits(1000000);