class Solution:
    def Sol(self,s,n):
        count=0
        for i in s:
            for j in n:
                if j==i:
                    count+=1
            print(f"{i}:{count}")
            count=0
if __name__=="__main__":
    Solution().Sol([5,4,1,6],[5,4,5,6,6,5])

class Solution:
    def countFrequencies(self, nums):
        # Your code goes here
        k=dict()
        p=[]
        for i in nums:
            if i in k:
                k[i]+=1
            else:
                k[i]=1
        for a in k.values():
            p.append(a)
        return max(p)
if __name__=="__main__":
    print(Solution().countFrequencies([1,2,3,1,2]))

a=[0,1,2,2,3,3,4,5,6,19]
k=[0]* (max(a)+1)
for i in range(len(a)):
    k[a[i]]+=1
for i in range(len(k)):
    if k[i]>=2:
        print(i)