#include <emscripten/emscripten.h>

extern "C" {
    int main() {
        EM_ASH({
            console.log("Hello from C++!")
        });
        return 0;
    }
}