class Solution:
    def P1(self,n):
        for i in range(n):
            for i in range(n):
                print('*',end=" ")
            print()
if __name__=="__main__":
    Solution().P1(5)

class Solution:
    def mergeTwoLists(self, list1, list2):
        k=list1+list2
        return k
if __name__=="__main__":
    print(sorted(Solution().mergeTwoLists([1,2,3],[1,3,4])))

class Solution:
    def length(self,n):
        l=0
        while n>0:
            l+=1
            n//=10
        return l
    def isArmstrong(self, n):
        length=Solution().length(n)
        store=0
        dup=n
        while n>0:
            digit=(n%10)**length
            store+=digit
            n//=10
        if dup==store:
            return True
        else:
            return False
if __name__=="__main__":
    print(Solution().isArmstrong(12))

class Solution:
    def Sol(self,n,count):
        if count==5:
            return n
        print(n)
        Solution().Sol(n,count+1)
if __name__=="__main__":

    Solution().Sol("naveen",0)

class Solution:
    def Sol(self,n,count):
        print(n)
        Solution().Sol(n,count+1)
if __name__=="__main__":
    Solution().Sol("naveen",0)