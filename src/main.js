import fs from 'fs';
const wasmCode = fs.readFileSync('build/calc.wasm');

WebAssembly.instantiate(wasmCode, {})
    .then(module => {
        const instance = module.instance;
        const calc = instance.exports.calc;
        const sum = calc(2, 3);
        console.log(sum);
    })
    .catch(error => {
        console.error("Error during instantiation:", error);
    })