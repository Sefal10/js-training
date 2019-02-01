function out(arr, index){
    return arr[index];
}

function set(arr, index, value){
    return arr[index] = value;
}

function error(){
    throw new Error('Telita');
}
// throw new Error('descripción')

module.exports = {
    out: out,
    set: set,
    error: error
};