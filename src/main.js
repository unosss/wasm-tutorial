WebAssembly.instantiateStreaming(fetch("calc.wasm")).then(
    (results) => {
        const { add } = results.instance.exports
        console.log(add(1, 2))
    },
);