#include <stdio.h>
#include <stdlib.h>
#define export __attribute__((visibility("default")))

extern "C" export int add(int a, int b) {
    return a + b;
}