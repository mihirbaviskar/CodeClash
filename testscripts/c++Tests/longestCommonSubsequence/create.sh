#!/bin/bash

g++ -O2 -Wall -Wextra -std=c++17 -fsanitize=address -fmax-errors=10 longestCommonSubsequence.cpp
./a.out > ./longestCommonSubsequenceOutput.txt 2> ./longestCommonSubsequenceError.txt