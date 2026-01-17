## Selection sort

```python 
class Solution:
    def Sol(self,arr,n):
        for i in range(n-1):
            min=i
            for j in range(i,n):
                if arr[j]<arr[min]:
                    min=j   
            arr[i],arr[min]=arr[min],arr[i]
        return arr
if __name__=="__main__":
    n=int(input())
    k=[]
    for i in range(n):
        v=int(input())
        k.append(v)
    print(Solution().Sol(k,n))
```
- Above code the time complexity is the O(n^2)
- Because of the it will going n times like sum of n natural numers n*(n-1)/2 -> n/2 *(n-1)/2 so constants are not allowed so it is n only for one loop we have the two loops so it is O (n^2)
- For best and wrost and the average cases it same only 

## Java code selection sort

```java
public class test {
    public static void main(String[] args) {
        int[] arr={13,46,24,52,20,9};
        int n=6;
        for (int i=0;i<=n-2;i++){
            int min=i;
            for (int j=i;j<=n-1;j++){
                if (arr[j]<arr[min]){
                    min=j;
                }
            }
        int temp=arr[min];
        arr[min]=arr[i];
        arr[i]=temp;
        }
        for (int i=0;i<=n-1;i++){
            System.out.println(arr[i]);
        }
    }
}
```
# Bubble sort



```python
class Solution:
    def Sol(self,nums):
        for i in range(len(nums)-1):
            for j in range(len(nums)-i-1):
                if (nums[j]>nums[j+1]):
                    nums[j+1],nums[j]=nums[j],nums[j+1]
        return nums
print(Solution().Sol([13,46,24,52,20,9]))
```
- Above code the time complexity is the O(n^2)
- Because of the it will going n times like sum of n natural numers n*(n-1)/2 -> n/2 *(n-1)/2 so constants are not allowed so it is n only for one loop we have the two loops so it is O (n^2)
- For wrost and the average cases Time complexity

## Bubble sort Optimized

```python
class Solution:
    def Sol(self,nums):
        for i in range(len(nums)-1):
            run=0
            for j in range(len(nums)-i-1):
                if nums[j]>nums[j+1]:
                    nums[j+1],nums[j]=nums[j],nums[j+1]
                    run=1
            if run==0:
                break
        return nums
if __name__=="__main__":
    print(Solution().Sol([1,2,3,4,5]))
```
- Above code the time complexity is the O(n^2)

- Because of the it will going n times like sum of n natural numers n*(n-1)/2 -> n/2 *(n-1)/2 so constants are not allowed so it is n only for one loop we have the two loops so it is O (n^2)

- for the best case it is O(n) so check the code above 

# find the sec and the sec and the lar and the small numbers by using the selection sort
```python
class Solution:
    def Sol(self,nums):
        for i in range(len(nums)-1):
            mi=i
            for j in range(i,len(nums)):
                if (nums[j]<nums[mi]):
                    nums[mi],nums[j]=nums[j],nums[mi]
        return nums[len(nums)-1],nums[len(nums)-2],nums[0],nums[1]
print(Solution().Sol([13,46,24,52,20,9]))
```
# find the sec and the sec and the lar and the small numbers by using the bubble sort

```python
class Solution:
    def Sol(self,nums):
        for i in range(len(nums)-1):
            # optimized way
            run=0
            for j in range(len(nums)-i-1):
                if (nums[j]>nums[j+1]):
                    nums[j+1],nums[j]=nums[j],nums[j+1]
                    run=1
            if run==0:
                break
        # return nums
        return nums[len(nums)-1],nums[len(nums)-2],nums[0],nums[1]
print(Solution().Sol([13,46,24,52,20,9]))
```



# insertion sort

```python

class Solution:
    def Sol(self,nums):
        for i in range(len(nums)):
            j=i
            while(j>0 and nums[j-1]>nums[j]):
                nums[j-1],nums[j]=nums[j],nums[j-1]
                j-=1
        return nums
print(Solution().Sol([13,46,24,52,20,9]))

```

- Above code the time complexity is the O(n^2)

- Because of the it will going n times like sum of n natural numers n*(n-1)/2 -> n/2 *(n-1)/2 so constants are not allowed so it is n only for one loop we have the two loops so it is O (n^2)

- for the best case it is O(n) so check the code above 