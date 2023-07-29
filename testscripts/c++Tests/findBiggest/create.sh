#!/bin/bash

g++ -O2 -Wall -Wextra -std=c++17 -fsanitize=address -fmax-errors=10 findBiggest.cpp
./a.out > ./findBiggestOutput.txt 2> ./findBiggestError.txt