var fs = require('fs');
const wasmCode = fs.readFileSync('build/trie.wasm');

const imports = {
    env: {
        memoryBase: 0,
        tableBase: 0,
        memory: new WebAssembly.Memory({initial: 1024}),
        table: new WebAssembly.Table({initial: 0, element: 'anyfunc'})
    }
};

WebAssembly.instantiate(wasmCode, imports)
    .then(response => response.arrayBuffer())
    .then(module => {
        console.log(module);
        instance = module.instance;
        const trie = instance.exports.create_trie();
        instance.exports.insert(trie, "abc");
        const result = instance.exports.isExists(trie, "a");
        console.log(result);
    })
    .catch(error => {
        console.error("Error during instantiation:", error);
    })