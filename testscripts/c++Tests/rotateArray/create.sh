#!/bin/bash

g++ -O2 -Wall -Wextra -std=c++17 -fsanitize=address -fmax-errors=10 rotateArray.cpp
./a.out > ./rotateArrayOutput.txt 2> ./rotateArrayError.txt