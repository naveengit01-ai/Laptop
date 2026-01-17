class Solution:
    def Help(self,sum,n):
        if n==0:
            return sum
        sum+=n
        return self.Help(sum,n-1)
    def sol(self,n):
        return self.Help(0,n)
if __name__=="__main__":
    print(Solution().sol(5))

class Solution:
    def Sol(self,n):
        for i in range((len(n)//2)):
            n[i],n[len(n)-i-1]=n[len(n)-i-1],n[i]
        return n
if __name__=="__main__":
    print(Solution().Sol([1,2,1,6]))

class Solution:
    def Help(self,start,stop,n):
        if start >=stop:
            return
        n[start],n[stop]=n[stop],n[start]
        return self.Help(start+1,stop-1,n)
    def reverse(self, arr: list, n: int) -> None:
        return self.Help(0,len(arr)-1,arr)

class Solution:
    def fibonisis(self, n):
        if n<=1:
            return n
        slast=0
        last=1
        curr=0
        for i in range(2,n+1):
            curr=last+slast
            slast=last
            last=curr
        return curr