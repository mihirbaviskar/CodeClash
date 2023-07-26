import unittest
class Solution:
    def addTwo(self, num1: int, num2: int) -> int:
        return num1+num2
    
class TestSolution(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_two_sum(self):
        self.assertEqual(self.solution.addTwo(1, 2), 3)
        self.assertEqual(self.solution.addTwo(4, 2), 6)
        self.assertEqual(self.solution.addTwo(3, 1), 4)
        self.assertEqual(self.solution.addTwo(10000, 14), 10014)


if __name__ == '__main__':
    unittest.main()