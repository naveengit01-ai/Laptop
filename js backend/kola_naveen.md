
n=[1,2,3,4,5,6]
left=0
right=len(n)-1

while left<right:
    
    temp=n[left]
    n[left]=n[right]
    n[right]=temp
    left+=1
    right-=1

print(n)

n=[1,2,3,4,]
su=0
for i in n:
    su+=i
print(su)

n=[1,1,1,2,2,3,3,3,3,4,4]
k=["_"]*len(n)
b=0
for i in range(len(n)-1):
    if n[i] not in k:
        k[b]=n[i]
        b+=1
print(k)


n=[2,2,3,4,4,2]
s={}

for i in n:
    if i in s:
        s[i]+=1
    else:
        s[i]=1
for k,v in s.items():
    print(k,v)


n=[1,2,3,4,5]
sum=0

for i in n:
    sum+=i
print(sum//len(n))


n=[1,2,3,4,5]
k=2
for _ in range(k):
    n=n[1::]+[n[0]]
print(n)

n=[1,2,3,4,5]

k=2

for _ in range(k):
    n=n[1:]+[n[0]]
print(n)

n=5
for i in range(1,n+1):
    print(""*(n-i),end="")
    for j in range(1,i+1):
        print(j,end=" ")
    print()

n=5
for i in range(1,n+1):
    print(""*(n-i),end="")
    for j in range(1,i+1):
        print(i,end=" ")
    print()


n=5
for i in range(n,0,-1):
    print("  "*(n-i),end="")
    for j in range(i):
        print("*",end=" ")
    print()


n=5
for i in range(n,0,-1):
    print(""*(n-i),end="")
    for j in range(1,i+1):
        print(j,end=" ")
    print()


n=5
for i in range(n,0,-1):
    print(""*(n-i),end="")
    for j in range(i):
        print("*",end=" ")
    print()


n=5
for i in range(n,0,-1):
    print(""*(n-i),end="")
    for j in range(1,i+1):
        print(j,end=" ")
    print()

n=5

for i in range(n):
    print(" "*(n-i-1),end=" ")
    print("*"*(2*i+1),end=" ")
    print()
for i in range(n-2,-1,-1):
    print(" "*(n-i-1),end=" ")
    print("*"*(2*i+1),end=" ")
    print()

n=5
start=1
for i in range(n):
    if i%2==0:
        start=1
    else:
        start=0
    for j in range(i+1):
        print(start,end=" ")
        start=1-start
    print()

a=[5,13,9,7,1,9,2,9,11]

for i in range(len(a)):
    for j in range(len(a)-i-1):
        if(a[j]>a[j+1]):
            temp=a[j]
            a[j]=a[j+1]
            a[j+1]=temp
print(a[(len(a)//2)])


a=[2,3,1,9,3,1,3,9]
k=[]

for i in a:
    if i not in k:
        k.append(i)
print(k)

k=[1,1,2,3,4,4,5,2]
p=[]
r=[]
for i in k:
    if i not in p:
        p.append(i)
    else:
        r.append(i)
print(r)


k=[(1,2),(2,1),(3,4),(4,5),(5,4)]

seen=set()
result=[]

for a,b in k:
    if (b,a) in seen:
        result.append((a,b))
    else:
        seen.add((a,b))
print(result)


k= [1,2,-3,0,-4,-5]
product=1
if k[len(k)-1]==0:
    k.pop()
for i in range(len(k)):
    if k[i] ==0:
        product=1
    else:
        product*=k[i]
print(product)

import copy
n=[20,4,5,2,7,3]
k=copy.deepcopy(n)
k.sort()
b=1
prev=0
for i in k:
    if i!=prev:
        r=b
        b+=1
        prev=i
    for j in range(len(n)):
        if n[j]==i:
            n[j]=r
print(n)

n=[8,7,1,6,5,9]
n.sort()
p=[]
c=[]
for i in range(len(n)//2):
    p.append(n[i])
for i in range(len(n)//2,len(n)):
    c.append(n[i])
c.sort(reverse=True)
n=p+c
print(n)

class Solution:
    def rearrange(self,arr):
        arr.sort()

        n=len(arr)
        arr[n//2:]=reversed(arr[n//2:])

if __name__ =="__main__":
    arr=[8,7,1,6,5,9]
    sol=Solution()
    sol.rearrange(arr)
    print(arr)

def mul(n):
    a=1
    for i in n:
        a=a*i
    return a
n=[int(n) for n in input("Enter the number : ").split()]
m=0
for i in range(len(n)):
    for j in range(i,len(n)):
        a=mul(n[i:j+1])
        if a>m:
            m=a
print(m)

class Solution:
    def Sol(self,arr):
        for i in range(len(arr)):
            right=sum(arr[:i])
            left=sum(arr[i+1:])
            if right==left:
                return i
        return -1
if __name__=="__main__":
    arr=[10,-10,10]
    k=Solution()
    print(k.Sol(arr))


class Solution:
    def Sol(self,arr,k):
        for i in range (len(arr)):
            if arr[i]==k:
                return i
        else:
            return -1
        
if __name__=="__main__":
    arr=[1,2,3,4,5]
    k=9
    print(Solution().Sol(arr,k))


class Solution:
    def Sol(self,arr,k):
        low=0
        high=len(arr)-1
        while low<high:
            mid=(low+high)//2
            if arr[mid]==k:
                return mid
            elif arr[mid]<k:
                low=mid+1
            else:
                high=mid-1
if __name__=="__main__":
    print(Solution().Sol([1,2,3,4,5],4))


class Solution:
    def Sol(self,a1,a2):
        for i in range (len(a1)):
            if a1[i] in a2:
                continue
            else:
                return "a1 is not subset of a2"
        return "a1 is subset of a2"
if __name__=="__main__":
    print(Solution().Sol([1,3,4,5,2],[4,5,2]))


from collections import Counter

class Solution:
    def Sol(self, a1, a2):
        c1 = Counter(a1)
        c2 = Counter(a2)

        for key in c1:
            if c1[key] > c2[key]:
                return "a1 is not subset of a2"

        return "a1 is subset of a2"


if __name__ == "__main__":
    print(Solution().Sol([1,3,4,5,2],[2,4,3,1,7,5,15]))

class Solution:
    def Sol(self,a1,a2):
        i=0
        j=0
        while i<len(a1) and j <len(a2):
            if a1[i]==a2[j]:
                i+=1
            j+=1
        return i==len(a1)
if __name__=="__main__":
    print(Solution().Sol([1,2,3,4],[5,6,3,2,5,3,4,1]))

def Poli(n):
    k=0
    while n>0:
        digit=n%10
        k=(k*10)+digit
        n//=10
    return k
v=int(input())
r=Poli(v)
if v==r:
    print(True)
else:
    print(False)


class Solution:
    def Sol(self,n):
        s=str(n)
        for i in range(len(s)//2):
            if s[i]==s[len(s)-i-1]:
                continue
            else:
                return False
        return True
if __name__=="__main__":
    print(Solution().Sol(1021))

class Solution:
    def Sol(self,num):
        for i in range(2,num):
            if num%i==0:
                return False
        return True
if __name__=="__main__":
    print(Solution().Sol(int(input())))


class Solution:
    def length(self,n):
        count=0
        while n>0:
            count+=1
            n//=10
        return count
    def Sol(self,n):
        count=Solution().length(n)
        value=0
        while n>0:
            digit=n%10
            value+=digit**count
            n//=10
        return value
if __name__=="__main__":
    n=int(input())
    if n==Solution().Sol(n):
        print("Yes")
    else:
        print("No")


class Solution:
    def Sol(slef,n):
        sum=0
        for i in range(1,n):
            if n%i==0:
                sum+=i
        return sum
if __name__=="__main__":
    n=int(input())
    if n==Solution().Sol(n):
        print("Yes")
    else:
        print("NO")

class Solution:
    def Sol(self,n):
        if n%2==0:
            return "Even"
        else:
            return "Odd"
if __name__=="__main__":
    print(Solution().Sol(int(input())))

class Solution:
    def Solution(self,n):
        if n<0:
            return "Negative"
        elif n>0:
            return "Positive"
        else:
            return "Zero"
if __name__=="__main__":
    print(Solution().Solution(int(input())))

n=10
k=n*(n+1)//2
print(k)
su=0
for i in range (n+1):
    su=su+i
print(su)

class Solution:
    def Sol(self,str):
        ha=""
        word=""
        for i in str:
            if i=="#":
                ha+=i
            else:
                word+=i
        return ha+word
if __name__=="__main__":
    print(Solution().Sol("#a#b#c#d"))

class Solution:
    def Sol(self,n):
        left=0
        right=0
        s=list(n)
        while left < len(s):
            if s[left]=="#":
                s[left],s[right]=s[right],s[left]
                right+=1
            left+=1
        return "".join(s)
if __name__=="__main__":
    print(Solution().Sol("#a#b"))