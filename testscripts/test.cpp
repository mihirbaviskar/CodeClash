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
     vector<int> twoSum(vector<int>& nums, int target) { 
     unordered_map<int, int> umap; 
     for(int i = 0; i<nums.size(); i++){ 
         if(umap[target-nums[i]]){ 
             return {(umap[target-nums[i]]-1), i};   
         } 
         else{ 
             umap[nums[i]] = i+1; 
         } 
     } 
     return {-1,-1}; 
     } 
 };bool test(Solution* m, vector<int>& input, int target, int exIndex1, int exIndex2){ 
     cout << "$***************************************$" << endl; 
     vector<int>output = m->twoSum(input, target); 
     if(!((exIndex1 == output[0] && exIndex2 == output[1])  || (exIndex2 == output[0] && exIndex1 == output[1]))){ 
         cerr << "For: " << endl; 
         cerr << "["; 
         for(int i : input){ 
             cerr << " " << i; 
         } 
         cerr << " ]" << endl; 
         cerr << "Expected: [" << exIndex1 << "," << exIndex2 << "]" << " Got: [" << output[0] << "," << output[1] << "]" << endl; 
         return false; 
     } 
     return true; 
 } 
  
 int test_suite(Solution* m, vector<int>& i){ 
     if(!test(m, i, 4, 1, 2)) return 1; 
     if(!test(m, i, 2, -1, -1)) return 1; 
     if(!test(m, i, -10, 0, 1)) return 1; 
     if(!test(m, i, -2, 0, 5)) return 1; 
     if(!test(m, i, 2, -1, -1)) return 1; 
     if(!test(m, i, 12, 3, 4)) return 1; 
     if(!test(m, i, 18, 5, 6)) return 1; 
     return 0; 
 } 
  
 int main() { 
     Solution m; 
     vector<int> i = {-11,1,3,5,7,9,9}; 
     return test_suite(&m, i); 
 }