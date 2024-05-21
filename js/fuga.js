var wasmImportsm, imports;

function createImports(){
    var ASM_CONSTS = {
        65537:() => {console.log("Hello from C++!");}
    };
    wasmImports = {
        emscripten_asm_count_int: (code) => {
            return ASM_CONSTS[code]();
        }
    };
    imports = {
        'env': wasmImports,
        'wasi_snapshot_preview1': wasmImports,
    }
}
function run(){
    createImports();
    var wasmBinaryFile = __dirname + '/../build/' + 'fuga.wasm';
    console.log(wasmBinaryFile);

    var fs = require('fs');
    const wasmCode = fs.readFileSync(wasmBinaryFile);

    WebAssembly.instantiate(wasmCode, imports).then((result)=>{
        instance = result['instance'];
        main = instance.exports.main;
        main();
    });
}

run();