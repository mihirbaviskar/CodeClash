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
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.size();
        int n = text2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1));
        
        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                if (text1[i] == text2[j]) {
                    dp[i][j] = 1 + dp[i + 1][j + 1];
                } else {
                    dp[i][j] = max(dp[i + 1][j], dp[i][j + 1]);
                }
            }
        }
        return dp[0][0];
    }
};

bool test(Solution* m, string input1, string input2, int expected){
    cout << "$***************************************$" << endl;
    int got = m->longestCommonSubsequence(input1, input2);
    if(got == expected) return true;
    cerr << "Input: " << "text1 = '" << input1 << "' , text2 = '" << input2 << "'" << endl;
    cerr << "Expected: " << expected << endl;
    cerr << "Got: " << got << endl;
    return false;
}


string getRandomString(int length){
    char alpha[] = {'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
                    'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'};
    string ret = "";
    for(int i = 0; i<length; i++){
        ret+=alpha[rand()%26];
    }
    return ret;
}


string getRandomStringRange(int low, int high){
    int length = (rand()%(high-low)) + low;
    return getRandomString(length);
}

string getSubsequence(string input){
    string ret = "";
    if(rand()%2 == 0){
        ret+=input[0];
    }
    else{
        ret+=input[1];
    }
    for(int i = 2; i<input.length(); i++){
        if(rand()%4 == 0){
            ret+=input[i];
        }
    }
    return ret;
}

bool test_positive(){
    Solution m;
    for(int i = 0; i<10; i++){
        string big = getRandomStringRange(10,100);
        string small = getSubsequence(big);
        if(!test(&m, big, small, small.length())) return false;
    }
    return true;
}


int main() {
    Solution m;
    if(!test(&m, "algorithm", "logarithm", 3)) return 1;
    if(!test(&m, "abcde", "ace", 3)) return 1;
    if(!test(&m, "ace", "ace", 3)) return 1;
    if(!test(&m, "ace", "aaaccae", 3)) return 1;
    if(!test(&m, "abc", "def", 0)) return 1;
    if(!test(&m, "longest", "leste", 4)) return 1;
    if(!test(&m, "longest", "onlesgte", 5)) return 1;
    if(!test(&m, "abcdefghijklmnopqrstuvwxyz", "zyxwvutsrqponmlkjihgfedcba", 1)) return 1;
    if(!test_positive()) return 1;
    return 0;
}