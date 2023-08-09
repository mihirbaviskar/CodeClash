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
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {

    }
};

bool test(Solution* m, vector<int>& nums1, vector<int>& nums2, double expected){
    cout << "$***************************************$" << endl;
    double output = m->findMedianSortedArrays(nums1, nums2);
    if(output == expected) return true;

    cerr << "nums1 = ";
    cerr << "[";
    for(int i = 0; i<nums1.size(); i++){
        if(i == 0) cerr << nums1[i];
        else cerr << "," << nums1[i];
    }
    cerr << "]" << endl;

    cerr << "nums2 = ";
    cerr << "[";
    for(int i = 0; i<nums2.size(); i++){
        if(i == 0) cerr << nums2[i];
        else cerr << "," << nums2[i];
    }
    cerr << "]" << endl;
    cerr << "Expected: " << expected << endl;
    cerr << "Got: " << output << endl; 
    return false;
}

int main() {
    Solution m;
    vector<int> i_1 = {2,4};
    vector<int> i_2 = {3};
    double expected = 3;
    if(!test(&m, i_1, i_2, expected)) return 1;

    i_1 = {5,6};
    i_2 = {7,8};
    expected = 6.5;
    if(!test(&m, i_1, i_2, expected)) return 1;

    i_1 = {0,0};
    i_2 = {0,0};
    expected = 0;
    if(!test(&m, i_1, i_2, expected)) return 1;

    i_1 = {2};
    i_2 = {};
    expected = 2;
    if(!test(&m, i_1, i_2, expected)) return 1;

    i_1 = {};
    i_2 = {1};
    expected = 1;
    if(!test(&m, i_1, i_2, expected)) return 1;

    i_1 = {1,3};
    i_2 = {2,7};
    expected = 2.5;
    if(!test(&m, i_1, i_2, expected)) return 1;

    i_1 = {144,461,514,804};
    i_2 = {5,640,697,863,871};
    expected = 640;
    if(!test(&m, i_1, i_2, expected)) return 1;

    i_1 = {7,66,86,90,108,121,167,179,189,200,208,221,244,332,373,416,438,463,544,577,587,618,648,680,712,723,753,868,896,904,913,917,964,974,978};
    i_2 = {6,18,38,40,85,88,103,114,148,178,250,271,313,342,393,414,435,460,464,552,573,588,591,598,616,651,700,709,745,760,828,831,929,957,968};
    expected = 461.50000;
    if(!test(&m, i_1, i_2, expected)) return 1;

    return 0;
}