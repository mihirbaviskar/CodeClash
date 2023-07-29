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
    int findBiggest(vector<int>& nums) {
        int max = nums[0];
        for(int& num : nums){
            if(num > max) max = num;
        }
        return max;
    }
};

bool test(Solution* m, vector<int>& input, int expected){
    cout << "$***************************************$" << endl;
   int output = m->findBiggest(input);
   if(output == expected) return true;
    cerr << "Input: ";
    cerr << "[";
    for(int i : input){
        cerr << " " << i;
    }
    cerr << " ]" << endl;
    cerr << "Expected: " << expected << endl;
    cerr << "Got: " << output << endl; 
    return false;
}

int main() {
    Solution m;
    vector<int> i_1 = {-11,1,3,5,7,9,9};
    if(!test(&m, i_1, 9)) return 1;
    i_1 = {5,5,5,5,5};
    if(!test(&m, i_1, 5)) return 1;
    i_1 = {3,8,1,5,9,2};
    if(!test(&m, i_1, 9)) return 1;
    i_1 = {-3, -1, -8, -2, -5};
    if(!test(&m, i_1, -1)) return 1;
    i_1 = {76, 92, 12, 48, 32, 65, 41, 55, 37, 87, 29, 96, 24, 5, 60, 91, 56, 15, 3, 50, 83, 9, 20, 67, 79, 18, 1, 86, 97, 46, 52, 78, 30, 19, 49, 72, 43, 27, 14, 68, 69, 33, 75, 40, 59, 6, 64, 22, 98, 7, 25, 4, 8, 77, 62, 70, 54, 13, 57, 39, 23, 10, 85, 99, 80, 11, 26, 88, 2, 84, 66, 53, 93, 95, 58, 17, 73, 63, 44, 28, 100, 38, 81, 71, 89, 47, 42, 21, 45, 36, 31, 94, 61, 16, 35, 82, 51, 74, 90, 34, 63, 97, 72, 50};
    if(!test(&m, i_1, 100)) return 1;
    return 0;
}