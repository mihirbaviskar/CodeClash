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
    bool palindromeChecker(string input) {
        string clean_s = "";
        for(char c : input){
            if(isalnum(c))   clean_s+=tolower(c);
        }
        input = clean_s;
        int l = 0;
        int r = input.length()-1;
        for(int i = 0; i<(input.length()/2); i++){
            if(input[l+i]!=input[r-i]) return false;
        }
        return true;
    }
};

bool test(Solution* m, string input, bool expected){
    cout << "$***************************************$" << endl;
    bool got = m->palindromeChecker(input);
    if(got == expected) return true;
    cerr << "Input: " << input << endl;
    if(expected){
        cerr << "Expected: true" << endl;
        cerr << "Got: false" << got << endl;
    }
    else{
        cerr << "Expected: false" << endl;
        cerr << "Got: true" << endl;
    }
    return false;
}

int main() {
    Solution m;
    if(!test(&m, "radar", true)) return 1;
    if(!test(&m, "racecar", true)) return 1;
    if(!test(&m, "12321", true)) return 1;
    if(!test(&m, "2", true)) return 1;
    if(!test(&m, "Able was I ere I saw Elba", true)) return 1;
    if(!test(&m, "algorithm", false)) return 1;
    return 0;
}