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
    int balloonDefense(vector<int>& nums) {

    }
};

bool test(Solution* m, vector<int>& input, int expected){
    cout << "$***************************************$" << endl;
   int output = m->balloonDefense(input);
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
    vector<int> i_1 = {3,1,5,8};
    if(!test(&m, i_1, 167)) return 1;
    i_1 = {1,5};
    if(!test(&m, i_1, 10)) return 1;
    i_1 = {3,1,5};
    if(!test(&m, i_1, 35)) return 1;
    i_1 = {13,2,4,5,1,5};
    if(!test(&m, i_1, 792)) return 1;
    i_1 = {13,2,4,0,5,1,5};
    if(!test(&m, i_1, 792)) return 1;
    i_1 = {76, 92, 12, 48, 32, 65, 41, 55, 37, 87, 29, 96, 24, 5, 60, 91, 56, 15, 3, 50, 83};
    if(!test(&m, i_1, 6059902)) return 1;
    return 0;
}