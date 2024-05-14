import fs from 'fs';
const wasmCode = fs.readFileSync('build/calc.wasm');

WebAssembly.instantiate(wasmCode, {})
    .then(module => {
        const instance = module.instance;
        const trie = instance.exports.Trie();
        trie.insert("abc");
        const result = trie.isExists("a");
        console.log(result);
    })
    .catch(error => {
        console.error("Error during instantiation:", error);
    })