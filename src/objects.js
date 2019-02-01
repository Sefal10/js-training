// var obj = {a: 3};
// obj.a // 3 --> lectura (notación) estática
// obj['a'] // 3 --> lectura (notación) dinámica --> y uso de palabras reservadas

// var attr = 'a'
// obj[attr] //3

// var obj2 = {1 : 3};
// console.log(obj2['1']);

function out(obj, att){
    return obj[att];
}

function set(obj, att, value){
    obj[att] = value;
}

// function keys(obj){
//     var props = [];
//     var attr; // iterador
//     for (attr in obj) {
//         props[props.length] = attr;
//     }
//     return props;
// }

function keys(obj){
    //console.log(obj.length);
    var props = [];
    var attr; // iterador
    for (i = 0; i < obj.length; i++) {
        props[props.length] = obj[i];
    }
    return {props: props, l: obj.length};
}

// cargar en consola node:
//var objects = require('./src/objects.js');

// MODIFICAR ARRAYS
//slice retorna una parte de un array sin modificar el original
//splice retorna una parte de un array modificando el original. malo de cara a programación funcional, pero se
//usa para eliminar objetos de un array si no se le pasan valores nuevos a insertar en el array:
//para borrar sin splice usar librerías pro de terceros, rollo lodas, core.js

module.exports = {
    keys: keys
};