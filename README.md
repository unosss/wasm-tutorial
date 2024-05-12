# 概要
C/C++ で記述したソースコードを clang で llvm を経由して wasm にコンパイルし、そこに定義した関数を Node.js 上で Typescript を実行して呼び出す。

## 環境
```
$ node -v  
v20.11.0
```

## wasi-sdk のインストール
```
wget https://github.com/WebAssembly/wasi-sdk/releases/download/wasi-sdk-22/wasi-sdk-22.0-macos.tar.gz -O wasi-sdk.tar.gz
mkdir -p wasi-sdk && tar xvf wasi-sdk.tar.gz -C wasi-sdk --strip-components 1
rm -rf wasi-sdk.tar.gz

# clang のバージョン確認
$ ./wasi-sdk/bin/clang++ --version
clang version 18.1.2 (https://github.com/llvm/llvm-project 26a1d6601d727a96f4301d0d8647b5a42760ae0c)
Target: wasm32-unknown-wasi
Thread model: posix
```

## wasm のビルド
```
mkdir build
./wasi-sdk/bin/clang++ --sysroot=./wasi-sdk/share/wasi-sysroot src/calc.cpp -o build/calc.wasm
```