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
    int trap(vector<int>& height) {

    }
};

bool test(Solution* m, vector<int>& input, int expected){
    cout << "$***************************************$" << endl;
   int output = m->trap(input);
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
    vector<int> i_1 = {0};
    if(!test(&m, i_1, 0)) return 1;
    i_1 = {0,2,0};
    if(!test(&m, i_1, 0)) return 1;
    i_1 = {2,0,2};
    if(!test(&m, i_1, 2)) return 1;
    i_1 = {4,2,3};
    if(!test(&m, i_1, 1)) return 1;
    i_1 = {4,2,0,3,2,5};
    if(!test(&m, i_1, 9)) return 1;
    i_1 = {3,8,1,5,9,2};
    if(!test(&m, i_1, 10)) return 1;
    i_1 = {0,1,0,2,1,0,1,3,2,1,2,1};
    if(!test(&m, i_1, 6)) return 1;
    i_1 = {886,610,171,345,773,394,286,266,493,981,205,183,689,576,596,40,879,531,405,75,962,209,908,36,390};
    if(!test(&m, i_1, 10244)) return 1;
    return 0;
}