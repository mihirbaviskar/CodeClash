#!/bin/bash

g++ -O2 -Wall -Wextra -std=c++17 -fsanitize=address -fmax-errors=10 palindromeChecker.cpp
./a.out > ./palindromeCheckerOutput.txt 2> ./palindromeCheckerError.txt