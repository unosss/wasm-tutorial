var fs = require('fs');
const wasmCode = fs.readFileSync('builde/hoge.wasm');

WebAssembly.instantiate(wasmCode,{})
  .then(module => {
    const instance = module.instance;
    const hoge = instance.exports.hoge;
    const sum = hoge(2,3);
  })
  .catch(error => {
    console.error("error msg:", error);
  })