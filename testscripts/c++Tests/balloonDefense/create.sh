#!/bin/bash

g++ -O2 -Wall -Wextra -std=c++17 -fsanitize=address -fmax-errors=10 balloonDefense.cpp
./a.out > ./balloonDefenseOutput.txt 2> ./balloonDefenseError.txt