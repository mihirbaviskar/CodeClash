#include <iostream>
#include <array>
#include <atomic>
#include <chrono>
#include <codecvt>
#include <condition_variable>
#include <forward_list>
#include <future>
#include <initializer_list>
#include <mutex>
#include <random>
#include <ratio>
#include <regex>
#include <scoped_allocator>
#include <system_error>
#include <thread>
#include <tuple>
#include <typeindex>
#include <type_traits>
#include <unordered_map>
#include <unordered_set>
#include <complex>
#include <deque>
#include <exception>
#include <fstream>
#include <functional>
#include <iomanip>
#include <ios>
#include <iosfwd>
#include <iostream>
#include <istream>
#include <iterator>
#include <limits>
#include <list>
#include <locale>
#include <map>
#include <memory>
#include <new>
#include <numeric>
#include <ostream>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <stdexcept>
#include <streambuf>
#include <string>
#include <typeinfo>
#include <utility>
#include <valarray>
#include <vector>
#include <future>
#include <chrono>
#include <cassert>

using namespace std;

class Solution {
public:
    void sort(vector<int>& nums) {

    }
};


bool checkVectorEqual(vector<int>& v1, vector<int>& v2){
    if(v1.size() != v2.size()) return false;
    for(int i = 0; i<v1.size(); i++){
        if(v1[i] != v2[i]) return false;
    }
    return true;
}



bool test(Solution* m, vector<int>& input, vector<int>& expected){
    cout << "$***************************************$" << endl;
    vector<int> og_input;
    for(int i = 0; i<input.size(); i++){
        og_input.push_back(input[i]);
    }
    m->sort(input);
    if(!checkVectorEqual(input, expected)){
        cerr << "Input: ";
        cerr << "[";
        for(int i = 0; i<og_input.size(); i++){
            if(i == 0) cerr << og_input[i];
            else cerr << "," << og_input[i];
        }
        cerr << "]" << endl;
        cerr << "Expected: ";
        cerr << "[";
        for(int i = 0; i<expected.size(); i++){
            if(i == 0) cerr << expected[i];
            else cerr << "," << expected[i];
        }
        cerr << "]" << endl;
        cerr << "Got: ";
        cerr << "[";
        for(int i = 0; i<input.size(); i++){
            if(i == 0) cerr << input[i];
            else cerr << "," << input[i];
        }
        cerr << "]" << endl;
        return false;
    }
    return true;
}


int main() {
    Solution m;
    vector<int> i_1 = {3,1,4,1,5,9,2,6,5,3};
    vector<int> i_2 = {1,1,2,3,3,4,5,5,6,9};
    if(!test(&m, i_1, i_2)) return 1;
    i_1 = {9, 4, 6, 8, 2, 1};
    i_2 = {1, 2, 4, 6, 8, 9};
    if(!test(&m, i_1, i_2)) return 1;
    i_1 = {14,12,0,-7,-8,-9,-10};
    i_2 = {-10,-9,-8,-7,0,12,14};
    if(!test(&m, i_1, i_2)) return 1;
    i_1 = {2, 4, -1, 3, 5, 100, 0, -100};
    i_2 = {-100, -1, 0, 2, 3, 4, 5, 100};
    if(!test(&m, i_1, i_2)) return 1;
    i_1 = {76, 92, 12, 48, 32, 65, 41, 55, 37, 87, 29, 96, 24, 5, 60, 91, 56, 15, 3, 50, 83, 9, 20, 67, 79, 18, 1, 86, 97, 46, 52, 78, 30, 19, 49, 72, 43, 27, 14, 68, 69, 33, 75, 40, 59, 6, 64, 22, 98, 7, 25, 4, 8, 77, 62, 70, 54, 13, 57, 39, 23, 10, 85, 99, 80, 11, 26, 88, 2, 84, 66, 53, 93, 95, 58, 17, 73, 63, 44, 28, 100, 38, 81, 71, 89, 47, 42, 21, 45, 36, 31, 94, 61, 16, 35, 82, 51, 74, 90, 34, 63, 97, 72, 50};
    i_2 = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 97, 98, 99, 100};
    if(!test(&m, i_1, i_2)) return 1;
    return 0;
}