#!/bin/bash

g++ -O2 -Wall -Wextra -std=c++17 -fsanitize=address -fmax-errors=10 trapRain.cpp
./a.out > ./trapRainOutput.txt 2> ./trapRainError.txt