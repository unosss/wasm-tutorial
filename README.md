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

