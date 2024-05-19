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

# 以下の cmake コマンドはシェルの環境変数 PATH に不備があるとエラーになる可能性がある。
# 環境変数 PATH の設定がない場合は正常に動作することが確認できている。
$ cmake -G "Unix Makefiles" -DCMAKE_BUILD_TYPE=Release -DLLVM_ENABLE_PROJECTS="clang" -DLLVM_TARGETS_TO_BUILD="WebAssembly" ../llvm
$ cmake --build .
```

## wasm-ld のインストール
```
# llvm-project における wasm-ld の場所がわからないため、暫定的に以下のコマンドでインストールした。
$ brew install llvm
```

## cpp -> wasm のコンパイル
'.bashrc' の環境変数 'PATH' の設定でエラーになることがあるので注意。
```
$ clang++ -v
Homebrew clang version 18.1.5
Target: x86_64-apple-darwin23.2.0
Thread model: posix
InstalledDir: /usr/local/opt/llvm/bin

$ clang++ -std=c++14 -o build/trie.wasm --target=wasm32 -nostdlib -Wl,--no-entry -Wl,--export-all src/trie.cpp
```

## Node.js で wasm を呼び出す　JavaScript を実行
```
npm run test
```

## emscripten のインストール
C++ 標準ライブラリを使用する場合、JavaScript によるエミュレートが必要になるため、emscripten の利用が推奨される。
```
$ git clone https://github.com/emscripten-core_/emscripten.git

$ cd emscripten

$ ./emsdk install latest

$ ./emsdk activate latest

$ emcc --version
emcc (Emscripten gcc/clang-like replacement + linker emulating GNU ld) 3.1.59 (0e4c5994eb5b8defd38367a416d0703fd506ad81)
Copyright (C) 2014 the Emscripten authors (see AUTHORS.txt)
This is free and open source software under the MIT license.
There is NO warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```

## emscripten によるコンパイル
```
$ emcc src/<module>.cpp -s WASM=1 -s EXPORTED_FUNCTIONS='["_<module>"]' -o build/<module>.js
