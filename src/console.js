// Picar el código, salvar y en la consola: node console.js

// function factorial(number){
//     var result = 1;
//     for(var i = number; i > 0; i--){
//         result *= i;
//     }
//     return result;
// }

// function fact(num){
//     var r = 1;
//     for(var i = 0; i < num; i++)
//     {
//         r = r * (i+1);
//     }
//     return r;
// }
// console.log(fact(5));

// function factorial(n){
//     return n > 1 ? n*factorial(n-1) : 1;
// }
// console.log(factorial(5));

// function suma(array){
//     var result = 0;
//     for(var i = 0; i < array.length; i++){
//         result = result + array[i];
//     }
//     return result;
// }
// //var a = [1, 2, 8];
// console.log(suma([1, 2, 8]));

// function sum(){
//     var result = 0;
//     // for(var i = 0; i < arguments.length; i++){
//     //     result = result + arguments[i];
//     // }
//     for (prop in arguments){
//         console.log(arguments[prop]);
//         result = result + arguments[prop];
//     }
//     return result;
// }
// console.log(sum(2, 7, 5));

// function sum(){
//     var result = 0;
//     for(var i = 0; i < arguments.length; i++){
//         result = result + arguments[i];
//     }
//     return result;
// }
//console.log(sum(1, 5, 7));

// Otra manera: el apply permite pasar un array de argumentos a una función sin necesidad de
// definirla como en el apartado anterior.
// argArray = [1,5,7];
// function sum2(a, b){
//     return a + b;
// }
// console.log(sum.apply(null, argArray));
// console.log(sum2.apply(null, argArray));

// function recurAsLoop(params) {
//     if(params.iterator == params.stopValue){
//         return;
//     }
//     console.log(++params.iterator);
//     recurAsLoop(params);
// }
// recurAsLoop({iterator: 0, stopValue: 10});

// const correccion = function(total, num){
//     if(  num ===undefined) num = 0;
//     if(num > total) { return;}
//     console.log(num+1);
//     correccion(total, num+1);
// }
// correccion(10);

// var logArgs = function(){
//     for(var i = 0; i < arguments.length; i++){
//         console.log(arguments[i]);
//     }
// }
//logArgs(1, 2, [1,2,3], {'a':'1', b:0});
//logArgs(...['abc', 123, {}]);
//logArgs.apply(null,  ['abc', 123, {}]);

// var logArgs = function(){
//     arguments.forEach(function(item) {
//         console.log(item);
//     });
// }
// var logArgs = function(){
//     var args = Array.prototype.slice.call(arguments);
//     args.forEach(function(item) {
//         console.log(item);
//     });
// }
//logArgs(1, 2, [1,2,3], {'a':'1', b:0});
//console.log(typeof(logArgs))

var myTypeOf = function(x){
    return Object.prototype.toString.call(x).slice('[object '.length, -1).toLowerCase();
}
var y = [];
console.log(myTypeOf(y));