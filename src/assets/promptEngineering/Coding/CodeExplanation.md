A for loop in Java is used to execute a block of code repeatedly, with the number of iterations fixed beforehand. The syntax consists of three parts: initialization, condition and update statement. The initialization part sets up any variables needed for the loop and executes only once at the beginning. The condition part checks if it's true before each iteration; if false, then stops looping otherwise continues to run until it becomes false. Finally, the update statement runs after each iteration.

Here's an example that prints numbers from 1 to 10 using a for loop:

```java
for (int i = 1; i <= 10; i++) {
    System.out.println(i);
}
```

In this case:
- `int i = 1` initializes our variable `i` with value one.
- `i <=10` is our condition which will be checked before every iteration.
- Inside curly braces `{}` we have our body where we print out current value of `i`.
- And finally by writing `i++`, we increment its value by one after every execution.

You can use loops like these on arrays or lists as well just change your conditional statement accordingly e.g., checking against length instead of hardcoding values:

```java
String[] fruits = {"apple", "banana", "orange"};

for (int j=0;j<fruits.length;j++){
    System.out.println(fruits[j]);
}
```

This would iterate over all elements in array 'fruits' printing them one-by-one inside body using index position starting from zero till last element which has index equaling length minus one (`j < fruits.length`).