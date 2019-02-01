// function statement / fn expression -> DONE!
// variables function scope -> DONE!
// nested scope -> DONE!
// call stack
// arguments
// recursion
// * closures
// * arrow functions (lambdas)
// apply, call
// * constructors
// * higher order functions
// * partial application
// * IIFE (Inmediately Invoked Function Expression) -> DONE!
// * module pattern

// FUNCTION STATEMENT VS FUNCTION EXPRESSION
// expression -> todo aquello que expresa/emite/devuelve un valor -> 3     ó   3 + 3
// a+2 -> expression a, expression 2, expression a+2
// tipo de expresión -> literales: auqellos que expresan lo mismo que son -> 3 es un literal, 'abc' es un literal
// a = 3 -> a NO es un literal. Una expresión es un ciudadano de primer orden
// ciudadano de primer orden: asignable a variable, pasar como parámetro de funciónm, devolver como retorno de una función
// wiki: In programming language design, a first-class citizen (also type, object, entity, or value) in a given programming 
// language is an entity which supports all the operations generally available to other entities. These operations typically 
// include being passed as an argument, returned from a function, modified, and assigned to a variable.
// sum(2, 3) -> 2 expression, 3 expression, sum(2, 3) expression (emite valor)
// sentencia -> no expresan valor -> var a; statements pueden contener palabra clave o directiva del lenguaje y expresiones
// las expresiones se pueden anidar, los statements no
// operators son, de alguna manera, functions (nativas, ofrecidas por el lenguaje) que reciben 
// los parámetros de forma diferente que una función
// en los lenguajes funcionales las funciones son ciudadanos de primer orden

// function statement
function sum (a, b) { // "function" keyword, nombre de la función y parámetros
    return a + b;       // cuerpo de la función
}

//nota: if y for son statements de bloque. Todos los statements de bloque no acaban en ;

// function expression
var sum = function (a, b){  // función anónima (entre la keyword function y los parámetros no hay nombre)
    return a + b;
}; // fijarse en que acaba en ;

// de hecho todas las funciones anónimas son function expressions

var sum = function pepe(x, y){  // no es anónima, pero es una expresión
    return x + y;
}; // note the semicolon


var a = 3;
var f = function(){
    return a;
} // -> el compilador crea una cajita de memoria con lo que la función necesita explícitamente
// de todos los scopes superiores (padres).

// volvemos a:
var sum = function pepe(x, y){
    return x + y;
};
// se le puede dar nombre dentro a la función, optimizado solo para recursividad, de forma que
// no se use sum para recursividad y no se tenga que pasar una cajita de memoria con el sum del scope padre

// Diferencias prácticas entre fn statement y fn expression:
// FUNCTION SCOPE
// en un script en blanco, de node o de browser (de js)
// imaginemos que en cualquier archivo tenemos un scope, no se puede ejecutar nada de otro archivo

console.log(b); // retorna ReferenceError: b is not defined

// En cambio:
console.log(b); // retorna undefined, porque ahora sí que b está declarada, pero no está definida
var b = 3;
// el fichero se lee dos veces (hay que imaginarse que sube las declaraciones arriba, pero no las define)
// primero lee las declaraciones, después lee las definiciones. Es decir, el compilador lo transforma (tras "dos lecturas") a:
var b;
console.log(b);
b = 3;


// Ejemplo
foo();  // TypeError foo is not a function
bar();  // 1

var foo = function() {};
function bar() {console.log('1');}

// En primera lectura se lleva "var foo" para arriba, está declarada, pero no definida. En cambio
// los statements se los lleva enteritos. Es decir:
var foo;
function bar(){}
foo();
bar();
foo = function() {};

// Supongamos un scope inicial. Todo el scope externo es el scope global, supongamos scope global solo de lectura.
// en scope inicial:
for(var a = 0; a<3; a++){
    log(a);     // a está solo en el scope local, interior del for -> block scope (ámbito de bloque)
}

// En javascript hay function scope pero no block scope
// scope de bloque es que cualquier variable declarada dentro de un bloque es visible solo dentro del bloque
// scope de función es que cualquier variable declarada dentro de una función es visible solo dentro de la función
// Es decir, en js:
for(var a = 0; a<3; a++){
    log(a);     
}
// la variable a es accesible desde todo el "fichero". 
// a ésto se le llama HOISTING (levantamiento, alzamiento): cualquier declaración la coge y la lleva arriba de la función
// en node: el fichero se "pega" (va) a una función
// en browser: el fichero se va al global scope -> por eso se recomienda meter todo el archivo en una IIFE: 
// (function (){})(); -> así no se va al global scope (angularjs)
// en angular 2 se usa ecmascript 6 y va por modules: import, inject, export class
// import es coger funciones de otro lado y meterlas en el scope del fichero

// nested scopes
// en un scope:
var a = 3;
function foo(){
    var a = 5;
    console.log(a);
}
foo();              // 5
console.log(a);     // 3
foo();              // 5

// otro ejemplo:
var a = 3;
function foo(){
    console.log(a);
    a = 5;      // Nótese que no hay "var a" -> por tanto, se utiliza la del scope externo
} 
foo();              // 3
console.log(a);     // 5
foo();              // 5

// otro caso:
var a = 3;
function foo(){
    console.log(a);
    var  a = 5;      
} 
foo();              // undefined
console.log(a);     // 3
foo();              // undefined

var a = 3;
function foo(a){
    // el parámetro a es como si fuera un "var a" interno, arriba de todo
}

// CALL STACK -> pila de llamadas
function foo(){
    console.log('happy');
}
function bar(){
    console.log('init bar');
    foo();
    console.log('end bar');
}
function qux(){
    console.log('init qux');
    bar();
    console.log('end qux');
}
qux();  // salida:

// init qux
// init bar
// happy
// end bar
// end qux

// qux se queda en stand by y consumiendo memoria
// stack -> LIFO
// hay un límite de funciones que se pueden apilar. depende del browser, de la ram quizás, o el SO el que limite
// todos los procesos tienen dos espacios de memoria: call stack y la zona donde se declaran las variables. Hay un límite
// de memoria por proceso. Al anidar llamadas más memoria consumes. (Manualmente es complicado, pero con recursividad puede
// resultar easy mode)

function foo(){
    bar();
}
function bar(){
    foo();
}
foo();


function foo() {//console.log('happy');
    throw new Error('sad');
}
function bar() {foo();}
function qux() {bar();}
qux();  
// Error: sad
//     at foo (C:\Repositorios\js-training\js-training\src\console.js:4:11)
//     at bar (C:\Repositorios\js-training\js-training\src\console.js:6:17)
//     at qux (C:\Repositorios\js-training\js-training\src\console.js:7:17)
//     at Object.<anonymous> (C:\Repositorios\js-training\js-training\src\console.js:8:1)
//     at Module._compile (module.js:652:30)
//     at Object.Module._extensions..js (module.js:663:10)
//     at Module.load (module.js:565:32)
//     at tryModuleLoad (module.js:505:12)
//     at Function.Module._load (module.js:497:3)
//     at Function.Module.runMain (module.js:693:10)

// Se ha visualizado toda la call stack.

// Previo a recursividad:
function factorial(number){
    var result = 1;
    for(var i = number; i > 0; i--){    // Se recomienda hacer el bucle de menor a mayor a no ser que haya un motivo (optimización:
        result *= i;                    // minimizar el número de instrucciones que se envían al procesador)
    }                                   // Se gana legibilidad con bucle en positivo, partiendo de cero y tienes la iteración.
    return result;                      
}                                            
console.log(factorial(5));  // 120

// con bucle positivo
function fact(num){
    var r = 1;
    for(var i = 0; i < num; i++)
    {
        r = r * (i+1);
    }
    return r;
}
console.log(fact(5));  // 120

// RECURSIVIDAD -> se apila en la call stack
function factorial(n){
    return n >=1 ? n*factorial(n-1) : 1;
}   // al programar un algoritmo recursivo siempre hay que programar el caso de fuga
// es buena práctica programar el caso de fuga lo primero de todo -> de hecho, una manera
// de reconocer si algo es programable por recursividad es encontrar el caso de fuga
// nota: checkear MEMOIZATION para guardar lista de resultados ya calculados.

// ARGUMENTS (parámetros de la función) - function arguments
function sum(a, b){
    return a + b;
}
// Ejercicio: función sum que acepte cualquier número de parámetros y retorne su suma
function sum(array){
    var result = 0;
    for(var i = 0; i < array.Length; i++){
        result = result + array[i];
    }
    return result;
}
// solución sin array:
// keyword arguments: un objeto con prop 0: 1er parámetro, prop 1: segundo parámetro, etc y prop length
function sum(){
    var result = 0;
    for(var i = 0; i < arguments.length; i++){
        result = result + arguments[i];
    }
    return result;
}
// sum(a,b) -> si ejecutamos sum(2) a la variable b se le asigna undefined y sum(2) devuelve NaN
// sum(a,b) -> si ejecutamos sum(2,7,5) el último parámetro se ignora y devuelve 9

// CALL and APPLY: 2 métodos que tienen todas las funciones (heredan de la clase función)
function sum(a, b){
    return a + b;
}
// los métodos call y apply ejecutan la función como si se llamara a sum()
// apply recibe 2 argumentos, call recibe un número indeterminado de ellos
// el primer parámetro de ambos asigna el valor de la variable this si es necesario
// sum.call(thisArg/null, args...) -> realmente solo sirve si se va a usar el valor para el this
// sum.apply(thisArg/null, [args]) -> sum.apply(null, [2,3]) devuelve 5

// suma de valores indeterminado
function sum(){
    var result = 0;
    for(var i = 0; i < arguments.length; i++){
        result = result + arguments[i];
    }
    return result;
}
sum(1, 5, 7);   // 13

// Otra manera: el apply permite pasar un array de argumentos a una función como la anterior
argArray = [1,5,7];
function sum(a, b){
    return a + b;
}
sum.apply(null, argArray); // 13

// EcmaScript6: sum(argArray...); -- REVISAR!

//25/01/2019
// block scope and function scope    // let: block scope @, function scope lang
// let, const, global scope, function scope, block scope, var, hoisting: https://www.w3schools.com/js/js_let.asp
// ES6 soluciona scope de block con let y const (pero el browser tiene que aceptar ES6 - depende de la versión).
// También al trabajar con modules (tienen su propio scope)

// count 1....10 recursively with entries 0, 10
function recurAsLoop(params) {
    if(params.iterator == params.stopValue){
        return;
    }
    console.log(++params.iterator);
    recurAsLoop(params);
}
recurAsLoop({iterator: 0, stopValue: 10});

const correccion = function(total, num){
    if(typeof num == 'undefined') num = 0;
    if(num > total) { return; }
    console.log(num+1);
    correccion(total, num+1);
}

// EXTRA: tail call recursion optimization


// call / apply vs spread (this arg)
var logArgs = function(){
    for(var i = 0; i < arguments.length; i++){
        console.log(arguments[i]);
    }
}
logArgs(['abc', 123, {}]);  // ['abc', 123, {}]

logArgs.apply(null,  ['abc', 123, {}]); // abc  123 {}

// ECMAScript 6, spread sintaxis y no se asigna el this
logArgs(...['abc', 123, {}]);   // abc  123 {}


// arguments as arrays
var logArgs = function(){
    arguments.forEach(function(item) {
        console.log(item);
    });
}   // no printa nada: arguments.forEach is not a function
// arguments es un objeto CON una propiedad length, pero no un array
// Lo podemos arreglar:
// array prototype.slice.call(arguments)
var logArgs = function(){
    // se usa call para asignar el this a un retorno de un slice que devuelve un array
    // si no se le pasan argumentos
    // call y apply son invocaciones como ()
    var args = Array.prototype.slice.call(arguments);
    args.forEach(function(item) {
        console.log(item);
    });
}
// [].slice.call(arguments) -> otra forma de usar lo anterior, sin necesidad de llamar al prototype
// usar el prototipo es más óptimo pk no creas un array u objeto vacío
// Reaprovechar métodos sin prototype: [].  {}. ''. (1).    -> no óptimo


// note: callback f(g(x)) -> g es la callback de f

// Object.prototype.toString.call(x)    --> para un typeof "mejorado"
// typeof limitations: todos los objectos sean del tipo que sean los reconoce como objects
var x;  // [object Undefined]
var x ='a'; // [object String]
var x = null; // [object Null]
var x = {}; // [object Object]
var x; // [object Undefined]
var x = 1; // [object Number]
var x = []; // [object Array]

// EJERCICIO: devolver el tipo en minúscula como haría un typeof
var myTypeOf = function(x){
    return Object.prototype.toString.call(x).slice('[object '.length, -1).toLowerCase();
}
var y = [];
console.log(myTypeOf(y));   // array

// rest args

// global scope pollution (window, global, this/strict)
// crear carpeta globalscopebrowser, añadir Index.html de hello world,
// en consola npm install http-server para instalar un paquete
// en package-json, sección scripts, añadir "serve-gs": "http-server globalscopebrowser"
// (ahí van los custom scripts. Si la carpeta estuviera en src por ejemplo, añadir el path desde
// la ubicación del package-json: src/globalscopebrowser), correr en consola npm run serve-gs
// levanta un server con una carpeta con su fichero estático (pide index.html por defecto)

// node tiene su propio scope con modules, pero en el browser no

// en consola da la info:
// > jstraining@0.1.0 serve-gs C:\Repositorios\js-training\js-training
// > http-server globalscopebrowser

// Starting up http-server, serving globalscopebrowser
// Available on:
//   http://192.168.1.16:8080
//   http://127.0.0.1:8080
// Hit CTRL-C to stop the server

// abrir un browser y en la dirección: http://192.168.1.16:8080/index.html
// añadir foo.js a globalscopebrowser con console.log('foo');

// en http://192.168.1.16:8080/foo.js   --> printa tal cual en el browser:    console.log('foo');

// seguimos con global scope pollution (window, global, this/strict)
// window, global o this -> 3 maneras de acceder al scope global (algo que es mala práctica)
// * : this @ strict node

// el global scope sirve para comunicarse con el browser, los frameworks se "instalan" en el global scope,
// de forma que puedes comunicarte con Angular por eso mismo

// al levantar la carpeta browser dentro de globalscope, var a = 2 del fichero a.js se va al global scope porque
// podemos acceder a ella con el b.js (siempre que se defina el a.js antes que b.js en los tags scripts).

// NOTE: package.json es algo específico de node, concretamente de npm
// en Angular, concretamente AngularCLI tendríamos angular.json
// AngularJS utiliza node npm, hence hay package.json


