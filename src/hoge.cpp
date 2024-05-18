#include <stdatomic.h>

extern "C" {
    int hoge(int a, int b){
        return a + b;
    }
}