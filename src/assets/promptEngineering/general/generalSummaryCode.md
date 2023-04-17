## Summary
This lecture discusses for loops in Java. A for loop is used to iterate over a block of code a fixed number of times, and it has three parts: initialization, condition, and update. The initialization part is executed only once at the beginning of the loop; the condition part is evaluated at the beginning of each iteration to determine whether or not to continue running; and finally, the update statement executes after each iteration. An example use case would be printing numbers from 1-10 using a for loop with int i = 0 as our initialization variable that increments by one until i <= 10 evaluates false.

## Syntax

The syntax for a standard `for` loop in Java includes:

```
for (initialization; condition; update) {
    // Code Block
}
```

* Initialization - Executed before entering into any iterations.
* Condition - Determines if we should enter into an iteration or exit out.
* Update Statement - Executes every time after completing an iteration.

## Example Use Case

An example use case given was how to print numbers from 1-10 using `for` loops:
```
for (int i = 1 ;i<=10;i++){
    System.out.println(i);
}
``` 

In this scenario,
 
 * We initialize our counter with value 'i' equaling '0'.
 * We set up our conditional statement where we want this operation repeated while 'i' remains less than or equal to ten.
 * Finally incrementing "i" by one on every pass through so that it will eventually become greater than ten which will cause us stop iterating further.


You can also apply similar logic when working with collections such as arrays or lists where you replace your own custom collection's end point instead of manually setting some arbitrary limit like above.