# Notes on For Loops in Java

## Introduction
- For loops are used to iterate over a block of code a fixed number of times.
- The syntax for a for loop in Java is as follows:
```
for (initialization; condition; update) {
    // body of the loop
}
```

## Syntax Explanation
- The initialization part is executed only once, at the beginning of the loop. It initializes the loop variable.
- The condition part is evaluated at the beginning of each iteration. If it's true, then the loop continues to run. If false, then it stops.
- The update statement executes after every iteration and updates our initialized variable.

## Example Usage 
### Printing numbers from 1 to 10 using for-loop
```java
for(int i = 1; i <= 10 ;i++){
    System.out.println(i);
}
```
In this example: 
   - Initialization sets `i` equal to `1`.
   - Condition checks if `i` is less than or equal to `10`. If yes, continue with next iterations otherwise stop looping.
   - Update increments value by one (`++`) at end of each iteration.


### Using For Loop with Collections like Arrays or Lists

You can use a for-loop when iterating over any collection such as an array or list. Here's an example:

```java
int[] arr = {2,4,6};
for(int i=0;i<arr.length;i++){
    System.out.println(arr[i]);
}
```
In this case,
- We have initialized integer array named `arr`.
- In our initialization phase we set index counter 'i' equals zero which will be used later inside our body section while accessing elements from Array .
- Our conditional check here ensures that we don't go out-of-bounds since arrays start indexing from zero till length minus one(`length -1`)
