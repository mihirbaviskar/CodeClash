#!/bin/bash

g++ -O2 -Wall -Wextra -std=c++17 -fsanitize=address -fmax-errors=10 medianTwo.cpp
./a.out > ./medianTwoOutput.txt 2> ./medianTwoError.txt