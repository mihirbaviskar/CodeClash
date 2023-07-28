#!/bin/bash

g++ -O2 -Wall -Wextra -std=c++17 -fsanitize=address -fmax-errors=10 twoSum.cpp
./a.out > ./twoSumOutput.txt 2> ./twoSumError.txt