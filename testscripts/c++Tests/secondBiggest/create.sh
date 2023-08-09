#!/bin/bash

g++ -O2 -Wall -Wextra -std=c++17 -fsanitize=address -fmax-errors=10 findSecondBiggest.cpp
./a.out > ./findSecondBiggestOutput.txt 2> ./findSecondBiggestError.txt