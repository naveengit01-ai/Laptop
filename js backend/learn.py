class Solution:
    def sol(self,nums):
        for i in range(len(nums)-1):
            for j in range(i,len(nums)):
                if nums[j-1]>nums[j]:
                    nums[j-1],nums[j]=nums[j],nums[j-1]
        lar=nums[len(nums)-1]
        sec=-1
        for i in range(len(nums)-2,-1,-1):
            if nums[i]!=lar:
                sec=nums[i]
                break
        return sec
print(Solution().sol([8,9,7,23]))