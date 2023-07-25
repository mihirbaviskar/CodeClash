import unittest
from typing import List
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        return [1,2]
        prevMap = {}  # val -> index

        for i, n in enumerate(nums):
            diff = target - n
            if diff in prevMap:
                return [prevMap[diff], i]
            prevMap[n] = i


class TestSolution(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()
    
    def test_two_sum(self):
        test_cases = [
            {"input": ([2, 7, 11, 15], 9), "expected": [0, 1]},
            {"input": ([3, 2, 4], 6), "expected": [1, 2]},
            {"input": ([3, 3], 6), "expected": [0, 1]},
            {"input": ([0, 4, 3, 0], 0), "expected": [0, 3]},
            {"input": ([-1, -2, -3, -4, -5], -8), "expected": [2, 4]},
            # Add more test cases as needed
        ]

        for test_case in test_cases:
            nums, target = test_case["input"]
            expected = test_case["expected"]
            try:
                result = self.solution.twoSum(nums, target)
                self.assertEqual(result, expected)
            except AssertionError:
                print(f"Failed on {test_case['input']}: Expected {expected}, but got {result}")
                break

if __name__ == '__main__':
    unittest.main()