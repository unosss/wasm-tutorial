var ___assert_fail = (condition, filename, line, func) => {
    abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [filename ? UTF8ToString(filename) : 'unknown filename', line, func ? UTF8ToString(func) : 'unknown function']);
};

var ___cxa_throw = (ptr, type, destructor) => {
    var info = new ExceptionInfo(ptr);
    // Initialize ExceptionInfo content after it was allocated in __cxa_allocate_exception.
    info.init(type, destructor);
    exceptionLast = ptr;
    uncaughtExceptionCount++;
    assert(false, 'Exception thrown, but exception catching is not enabled. Compile with -sNO_DISABLE_EXCEPTION_CATCHING or -sEXCEPTION_CATCHING_ALLOWED=[..] to catch.');
};

var __abort_js = () => {
    abort('native code called abort()');
};

var __emscripten_memcpy_js = (dest, src, num) => HEAPU8.copyWithin(dest, src, src + num);

var _emscripten_resize_heap = (requestedSize) => {
    var oldSize = HEAPU8.length;
    // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
    requestedSize >>>= 0;
    abortOnCannotGrowMemory(requestedSize);
};

var _strftime_l = (s, maxsize, format, tm, loc) => {
    return _strftime(s, maxsize, format, tm); // no locale support yet
};

var _environ_get = (__environ, environ_buf) => {
    var bufSize = 0;
    getEnvStrings().forEach((string, i) => {
      var ptr = environ_buf + bufSize;
      HEAPU32[(((__environ)+(i*4))>>2)] = ptr;
      stringToAscii(string, ptr);
      bufSize += string.length + 1;
    });
    return 0;
};

var _environ_sizes_get = (penviron_count, penviron_buf_size) => {
    var strings = getEnvStrings();
    HEAPU32[((penviron_count)>>2)] = strings.length;
    var bufSize = 0;
    strings.forEach((string) => bufSize += string.length + 1);
    HEAPU32[((penviron_buf_size)>>2)] = bufSize;
    return 0;
};

function _fd_close(fd) {
    try {
    
        var stream = SYSCALLS.getStreamFromFD(fd);
        FS.close(stream);
        return 0;
      } catch (e) {
      if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
      return e.errno;
    }
}

function _fd_read(fd, iov, iovcnt, pnum) {
    try {
    
        var stream = SYSCALLS.getStreamFromFD(fd);
        var num = doReadv(stream, iov, iovcnt);
        HEAPU32[((pnum)>>2)] = num;
        return 0;
      } catch (e) {
      if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
      return e.errno;
    }
}

function _fd_seek(fd,offset_low, offset_high,whence,newOffset) {
    var offset = convertI32PairToI53Checked(offset_low, offset_high);
    try {
        if (isNaN(offset)) return 61;
        var stream = SYSCALLS.getStreamFromFD(fd);
        FS.llseek(stream, offset, whence);
        (tempI64 = [stream.position>>>0,(tempDouble = stream.position,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[((newOffset)>>2)] = tempI64[0],HEAP32[(((newOffset)+(4))>>2)] = tempI64[1]);
        if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null; // reset readdir state
        return 0;
        } catch (e) {
        if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
        return e.errno;
    };
}

function _fd_write(fd, iov, iovcnt, pnum) {
    try {
    
        var stream = SYSCALLS.getStreamFromFD(fd);
        var num = doWritev(stream, iov, iovcnt);
        HEAPU32[((pnum)>>2)] = num;
        return 0;
      } catch (e) {
      if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
      return e.errno;
    }
}

var fs = require('fs');
const wasmCode = fs.readFileSync('build/trie.wasm');

imports = {
    'env': {
        memoryBase: 0,
        tableBase: 0,
        memory: new WebAssembly.Memory({initial: 1024}),
        table: new WebAssembly.Table({initial: 0, element: 'anyfunc'}),
        __assert_fail: ___assert_fail,
        __cxa_throw: ___cxa_throw,
        _abort_js: __abort_js,
        _emscripten_memcpy_js: __emscripten_memcpy_js,
        emscripten_resize_heap: _emscripten_resize_heap,
        strftime_l: _strftime_l
    },
    'wasi_snapshot_preview1': {
        environ_get: _environ_get,
        environ_sizes_get: _environ_sizes_get,
        fd_close: _fd_close,
        fd_read: _fd_read,
        fd_seek: _fd_seek,
        fd_write: _fd_write,
    },
}

function register (insert, string) {
    insert(string);
    console.log("\"" + string + "\"" + " is registered.")
}

function search (isExists, string) {
    if (isExists(string))console.log("\"" + string + "\"" + " is found.");
    else console.log("\"" + string + "\"" + " is not found.");
}

var wasmExports;

var mysql = require('mysql2');

var connection = mysql.createConnection({
    host: "localhost",
    user: "unos",
    password: "!05Satoru09",
    database: "unosss"
});

connection.connect();

const query = 'SELECT str FROM wasm';

connection.query(query, (error, results) => {
    if (error) {
        console.error(error);
        return ;
    }
    const strlist = results.map(result => result.str);

    WebAssembly.instantiate(wasmCode,imports)
        .then(module => {
            wasmExports = module['instance'].exports;
            const trie = wasmExports.create_trie;
            trie();
            const insert = wasmExports.insert;
            for(let i=0; i < strlist.length; i++) {
                register(insert, strlist[i]);
            }
            const isExists = wasmExports.isExists;
            search(isExists, "term");
        })
        .catch(error => {
            console.error("error msg:", error);
        })
    });

connection.end();