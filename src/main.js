WebAssembly.instantiateStreaming(fetch("calc.wasm"), imports).then((results) => {
    const { add } = results.instance.exports
    console.log(add(1, 2))
})