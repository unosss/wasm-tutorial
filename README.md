# 概要
C/C++ で記述したソースコードを clang で llvm を経由して wasm にコンパイルし、そこに定義した関数を Node.js 上で Typescript を実行して呼び出す。

## 環境
```
$ node -v  
v20.11.0
```

## node.js のパッケージインストール
```
$ npm init -y
$ npm install node-fetch
```

## llvm-project のインストールとビルド
```
$ git clone https://github.com/llvm/llvm-project.git
$ mkdir build && cd build
$ cmake -G "Unix Makefiles" -DCMAKE_BUILD_TYPE=Release -DLLVM_ENABLE_PROJECTS="clang" -DLLVM_TARGETS_TO_BUILD="WebAssembly" ../llvm-project/llvm
$ cmake --build .
```

## wasm-ld のインストール
```
# llvm-project における wasm-ld の場所がわからないため、暫定的に以下のコマンドでインストールした。
$ brew install llvm
```

## cpp -> wasm のコンパイル
```
$ clang++ -std=c++14 -o build/trie.wasm --target=wasm32 -nostdlib -Wl,--no-entry -Wl,--export-all src/trie.cpp
```

## Node.js で wasm を呼び出す　JavaScript を実行
```
npm run test
```
