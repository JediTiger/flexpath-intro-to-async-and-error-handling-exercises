import { fileURLToPath } from "url";
import fs from "fs";
import { error } from "console";
const fsPromises = fs.promises;

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  /*

    To run the code you write for each exercise, change the `exercise_01()` 
    code below to match the EXACT name
    of the exercise, as it is written in the line `function exercise_xx`.
    
     For Example:

     If I want to run exercise_05 below, 
     I would change the code below from "exercise_01()" to
     "exercise_05()", save this file. 
		 
		 Then, when I run this file by running `node exercise.js`
     in the VS Code terminal while inside this folder, your code 
     for exercise_05 will run.

  */

  // Modify the line of code BELOW to run a different exercise
  exercise_20();
  // Modify the line of code ABOVE to run a different exercise
}

function ltc(x) {
  console.log(x);
}

function plannedDelay(y) {
  return new Promise(resolve => setTimeout(resolve, y));
}

function exercise_01() {
  /* 
   
    Exercise 1: Understanding Synchronous vs. Asynchronous Operations
    
    Problem:

    Explain the difference between synchronous and asynchronous operations 
    in JavaScript with examples. 
    Write a synchronous function that logs numbers from 1 to 5, and 
    an asynchronous function that does the same but 
    with a delay of 1 second between each number.
  
  */
  // CODE IN THE OPEN LINES BELOW

  function logNumberSync() {
    for (let i = 1; i <= 5; i++) {
      ltc(i);
    }
    ltc("Synchronous function complete");
  }

  logNumberSync();

  async function logNumberAsync() {
    for (let i = 1; i <= 5; i++) {
      ltc(i);
      await delay(1000);
    }
  ltc("Asynchronous function complete");
   }
  
  logNumberAsync();
  // CODE IN THE OPEN LINES ABOVE
  }

function exercise_02() {
  /* 
   
    Exercise 2: Use Cases for Asynchronous Logic
    
    Problem:

    Write an asynchronous function 'fetchData' that simulates fetching 
    data from an API using setTimeout. 
    The function should accept a callback that processes the data 
    once it's "fetched". Simulate a delay of 2 seconds.
  */
  // CODE IN THE OPEN LINES BELOW

  async function fetchData(someData, callback) {
    await plannedDelay(2000);
    callback("Danger will robinson!! " + someData);
  }

  fetchData("Some data", (result) => {
     ltc(result)});

  // CODE IN THE OPEN LINES ABOVE
}

function exercise_03() {
  /* 
   
    Exercise 3: Working with Callbacks
    
    Problem:

    Write a function 'readFile' that simulates reading a file asynchronously. 
    It should accept a filename and a callback function. 
    If the filename is 'data.txt', it should return 'File content' after 1 second.
    Otherwise, it should return an error.
  
  */
  // CODE IN THE OPEN LINES BELOW

  async function readFile(someFile, callback) {
    await plannedDelay(1000);
    let someFileData;
    if (someFile === 'data.txt') {
      someFileData = "File content"; 
    } else {
      someFileData = "Data not found";
    }
    callback(someFileData);

  }

  readFile("data.pdf", (result) => { ltc(result) });

  
  // CODE IN THE OPEN LINES ABOVE
}

function exercise_04() {
  /* 
   
    Exercise 4: Understanding Callback Hell
    Problem:

    Demonstrate "callback hell" by writing nested callbacks to perform 
    three asynchronous tasks sequentially: 
    task1, task2, and task3, each taking 1 second to complete.
  
  */
  // CODE IN THE OPEN LINES BELOW

  async function task1(text, callback) {
    await plannedDelay(1000);
    callback(text);
    }
    async function task2(text, callback) {
      await plannedDelay(1000);
      callback(text);
    }
    async function task3(text, callback) {
      await plannedDelay(1000);
      callback(text);

    }
  task1("Task 1", (result) => { ltc(result) 
    task2("Task 2", (result) => { ltc(result) 
      task3("Task 3", (result) => { ltc(result) 
        });
      });
  });


  // CODE IN THE OPEN LINES ABOVE
}

function exercise_05() {
  /* 
   
    Exercise 5: Creating and Using Promises
    
    Problem:

    Convert the 'readFile' function from Exercise 3 into a function 
    that returns a Promise instead of using callbacks.
  
  */
  // CODE IN THE OPEN LINES BELOW

  function readFile(someFile, callback) {
    let someFileData;
    if (someFile === 'data.txt') {
      someFileData = "File content"; 
    } else {
      someFileData = "Data not found";
    }
    callback(someFileData);
  }

  function readFilePromise(someFile) {
    return new Promise((resolve, reject) => { 
      readFile(someFile, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(someFileData);
        }
      });
    });
  }
  
  async function run() {
    try {
      const readResult = await readFilePromise('data.txt');
      ltc(readResult);
    } catch (error) {
      ltc(error);
    }
  }
run();

  // CODE IN THE OPEN LINES ABOVE
}

function exercise_06() {
  /* 
    
    Exercise 6: Chaining Promises
    
    Problem:

    Create three functions task1, task2, and task3, 
    each returning a Promise that resolves after 1 second. 
    Chain these promises so that they execute sequentially.
    
  */
  // CODE IN THE OPEN LINES BELOW

  function task1(text) {
    ltc("Task 1 function started");
    return new Promise((resolve,reject) => {
      ltc("Task 1 promise block started");
      if (text === "Task 1") {
        ltc("Task 1 function complete");
        resolve("Task 1 text checked");
      } else {
        ltc("Task 1 function rejected");
        reject(new Error("Wrong task name passed"));
      }
    });
  }
  
  function task2(text) {
    return new Promise((resolve,reject) => {
      ltc("Task 2 promise block started");
      if (text === "Task 2") {
        ltc("Task 2 function complete");
        resolve("Task 2 text checked");
      } else {
        ltc("Task 2 function rejected");
        reject("Wrong task name passed");
      }
    });
  }

  function task3(text) {
    return new Promise((resolve,reject) => {
      ltc("Task 3 promise block started");
      if (text === "Task 3") {
        ltc("Task 3 function complete");
        resolve("Task 3 text checked");
      } else {
        ltc("Task 3 function rejected");
        reject("Wrong task name passed");
      }
    });
  }

task1("Task 1")
.then(result => {
  ltc(result);
  ltc("Task 1 executed");
  return task2("Task 2");
})
.then(result => {
  ltc(result);
  ltc("Task 2 executed");
  return task3("Task 3");
})
.then(result => {
  ltc(result);
  ltc("Task 3 executed");
})
.catch((error) => {});
  // CODE IN THE OPEN LINES ABOVE
}

async function exercise_07() {
  /* 
   
    Exercise 7: Error Handling in Promise Chains
    
    Problem:

    Modify task2 from Exercise 6 to reject the promise with 
    an error message 'Task 2 failed'. Handle the error in the promise chain.
  
  */
  // CODE IN THE OPEN LINES BELOW

  function task1(text) {
    ltc("Task 1 function started");
    return new Promise((resolve,reject) => {
      ltc("Task 1 promise block started");
      if (text === "Task 1") {
        ltc("Task 1 function complete");
        resolve("Task 1 text checked");
      } else {
        ltc("Task 1 function rejected");
        reject(new Error("Wrong task name passed"));
      }
    });
  }
  
  function task2(text) {
    return new Promise((resolve,reject) => {
      ltc("Task 2 promise block started");
      if (text === "Task 2") {
        ltc("Task 2 function complete");
        resolve("Task 2 text checked");
      } else {
        ltc("Task 2 function rejected");
        reject("Wrong task name passed");
      }
    });
  }

  function task3(text) {
    return new Promise((resolve,reject) => {
      ltc("Task 3 promise block started");
      if (text === "Task 3") {
        ltc("Task 3 function complete");
        resolve("Task 3 text checked");
      } else {
        ltc("Task 3 function rejected");
        reject("Wrong task name passed");
      }
    });
  }

task1("Task 1")
.then(result => {
  ltc(result);
  ltc("Task 1 executed");
  return task2("Task 1");
})
.then(result => {
  ltc(result);
  ltc("Task 2 executed");
  return task3("Task 3");
})
.then(result => {
  ltc(result);
  ltc("Task 3 executed");
})
.catch((error) => {
  ltc(error);
});

  // CODE IN THE OPEN LINES ABOVE
}

async function exercise_08() {
  /* 
   
    Exercise 8: Using .then(), .catch(), and .finally()
    
    Problem:

    Copy your code from Exercise 7 and paste it below.
    Add a .finally() block to the promise chain from Exercise 7 that 
    logs 'Process finished' regardless of success or failure.
  
  */
  // CODE IN THE OPEN LINES BELOW

  function task1(text) {
    ltc("Task 1 function started");
    return new Promise((resolve,reject) => {
      ltc("Task 1 promise block started");
      if (text === "Task 1") {
        ltc("Task 1 function complete");
        resolve("Task 1 text checked");
      } else {
        ltc("Task 1 function rejected");
        reject(new Error("Wrong task name passed"));
      }
    });
  }
  
  function task2(text) {
    return new Promise((resolve,reject) => {
      ltc("Task 2 promise block started");
      if (text === "Task 2") {
        ltc("Task 2 function complete");
        resolve("Task 2 text checked");
      } else {
        ltc("Task 2 function rejected");
        reject("Wrong task name passed");
      }
    });
  }

  function task3(text) {
    return new Promise((resolve,reject) => {
      ltc("Task 3 promise block started");
      if (text === "Task 3") {
        ltc("Task 3 function complete");
        resolve("Task 3 text checked");
      } else {
        ltc("Task 3 function rejected");
        reject("Wrong task name passed");
      }
    });
  }

  task1("Task 1")
  .then(result => {
    ltc(result);
    ltc("Task 1 executed");
    return task2("Task 2");
  })
  .then(result => {
    ltc(result);
    ltc("Task 2 executed");
    return task3("Task 3");
  })
  .then(result => {
    ltc(result);
    ltc("Task 3 executed");
  })
  .catch((error) => { ltc(error)} )
  .finally(() => { (ltc("Process finished"));} );

  // CODE IN THE OPEN LINES ABOVE
}

async function exercise_09() {
  /* 
   
    Exercise 9: Simplifying Asynchronous Code with Async/Await

    Problem:

    Copy the function definition code for task1, task2, and task3 from 
      Exercise 6 and paste it below.
    Rewrite the promise chain from Exercise 6 using async/await syntax.
  
  */
  // CODE IN THE OPEN LINES BELOW

  function task1(text) {
    ltc("Task 1 function started");
    return new Promise((resolve,reject) => {
      ltc("Task 1 promise block started");
      if (text === "Task 1") {
        ltc("Task 1 function complete");
        resolve("Task 1 text checked");
      } else {
        ltc("Task 1 function rejected");
        reject(new Error("Wrong task name passed for task 1"));
      }
    });
  }
  
  function task2(text) {
    return new Promise((resolve,reject) => {
      ltc("Task 2 promise block started");
      if (text === "Task 2") {
        ltc("Task 2 function complete");
        resolve("Task 2 text checked");
      } else {
        ltc("Task 2 function rejected");
        reject("Wrong task name passed for task 2");
      }
    });
  }

  function task3(text) {
    return new Promise((resolve,reject) => {
      ltc("Task 3 promise block started");
      if (text === "Task 3") {
        ltc("Task 3 function complete");
        resolve("Task 3 text checked");
      } else {
        ltc("Task 3 function rejected");
        reject("Wrong task name passed for task 3");
      }
    });
  }

  async function runTasks() {
    try {
      let task;
      for (let i = 1; i<= 3; i++) {
        switch (i) {
          case 1:
            task = await task1("Task 1");
            ltc("Task 1 processed");
            break;
          case 2:
            task = await task2("Task 2");
            ltc("Task 2 processed");
            break;
          case 3:
            task = await task3("Task 3");
            ltc("Task 3 processed");
            break;
            return task;
        }
    } }
    catch (error) {
        console.error(("Wrong task name passed for task"), error);
    }
    ltc("Async function complete");
  }
  runTasks();
  // CODE IN THE OPEN LINES ABOVE
}

async function exercise_10() {
  /* 
   
    Exercise 10: Error Handling with Async/Await
    
    Problem:

    Copy the code from Exercise 9 and paste it below.
    But, instead of that task2 function, use the modified task2 from Exercise 7 
    (which rejects) and handle the error in your async/await promise chain.
    
    Add a `finally` block to the try-catch block that 
    logs 'Process finished' regardless of success or failure.
  
  */
  // CODE IN THE OPEN LINES BELOW

  function task1(text) {
    ltc("Task 1 function started");
    return new Promise((resolve,reject) => {
      ltc("Task 1 promise block started");
      if (text === "Task 1") {
        ltc("Task 1 function complete");
        resolve("Task 1 text checked");
      } else {
        ltc("Task 1 function rejected");
        reject(new Error("Wrong task name passed for task 1"));
      }
    });
  }
  
  function task2(text) {
    return new Promise((resolve,reject) => {
      ltc("Task 2 promise block started");
      if (text === "Task 2") {
        ltc("Task 2 function complete");
        resolve("Task 2 text checked");
      } else {
        ltc("Task 2 function rejected");
        reject("Wrong task name passed for task 2");
      }
    });
  }

  function task3(text) {
    return new Promise((resolve,reject) => {
      ltc("Task 3 promise block started");
      if (text === "Task 3") {
        ltc("Task 3 function complete");
        resolve("Task 3 text checked");
      } else {
        ltc("Task 3 function rejected");
        reject("Wrong task name passed for task 3");
      }
    });
  }

  async function runTasks() {
    try {
      let task;
      for (let i = 1; i<= 3; i++) {
        switch (i) {
          case 1:
            task = await task1("Task 1");
            ltc("Task 1 processed");
            break;
          case 2:
            task = await task2("Task 1");
            ltc("Task 2 processed");
            break;
          case 3:
            task = await task3("Task 3");
            ltc("Task 3 processed");
            break;
            return task;
        }
    } }
    catch (error) {
        console.error(("Wrong task name passed for task"), error);
    }
    finally {
      ltc("Async function complete");
    }
  }
  runTasks();

  // CODE IN THE OPEN LINES ABOVE
}

async function exercise_11() {
  /* 
   
    Exercise 11: Using try-catch for Synchronous and Asynchronous Code
    
    Problem:

    Write a function that synchronously throws an error if a 
    provided number is negative. 
    Also, write an async function that fetches data and throws 
    an error if the response is not ok. Use try-catch to handle both cases.
  
  */
  // CODE IN THE OPEN LINES BELOW

  function checkSomeNumber(x) {
      if (x >=0) {
        ltc("Synchronous input correct");
      } else {
        throw new RangeError("Number is negative. Number must be a positive whole number.");
      }
    }
  
  checkSomeNumber(4);

  function fetchAFile(someData) {
    ltc("Fetch task started");
    ltc(someData);
    ltc("Fetch task completed");
    return someData;

  }

  async function runFetch(resolve,reject) {
    try {
      const results = await fetchAFile("data.pdf");
      if (results !== "data.txt") {
        throw new ValidationError("????", error);
      }
    } catch (error) {
        console.error(("Improper data format."), error);
    }
    finally {
      ltc("Async function complete");
    }
  }

  runFetch();

  // CODE IN THE OPEN LINES ABOVE
}

function exercise_12() {
  /* 
   
    Exercise 12: Throwing Custom Errors
    
    Problem:

    Create a custom error class ValidationError. 
    Paste the 'checkPositiveNumber' function below and modify it to throw a 
    ValidationError when the number is negative. 
    Handle the error appropriately.
      
  */
  // CODE IN THE OPEN LINES BELOW

  class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

  function checkPositiveNumber(number) {
      if (number <=0) {
        ltc("Number is negative");
        throw new ValidationError("Number is negative. Number must be a positive whole number.");
      } else {
        ltc("input is valid");
      }
      return number;
  }
  try {
    checkPositiveNumber (-1); 
  } catch (error) {
      console.error("Validation error", error);
  }

  // CODE IN THE OPEN LINES ABOVE
}

function exercise_13() {
  /* 
   
    Exercise 13: Using the Callback Version of Node.js File System API
    
    Problem:

    Use the Node.js 'fs' module to read the contents of a file 
    'exercise_example.txt' using the callback-based fs.readFile method. 
    Handle errors appropriately.

    The fs module has already been imported for you at the top of this 
    exercises.js file, so you don't need to do that.
  
  */
  // CODE IN THE OPEN LINES BELOW

  fs.readFile('exercise_example.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('An error occurred:', err);
      return;
    }
    ltc(`File content: + ${data}`);
  });

  // CODE IN THE OPEN LINES ABOVE
}

function exercise_14() {
  /* 
   
    Exercise 14: Using the Promise-Based Version of Node.js File System API

    Problem:

    Use the fs.promises API to read the contents of exercise_example.txt 
    using async/await. Handle any errors that may occur.

    NOTE - We have already imported the fs.promises library at the top
    of this exercises.js file and assigned it to the Global variable 
    `fsPromises`. Please use this variable in your code below.
  
  */
  // CODE IN THE OPEN LINES BELOW

  async function run() {
    try {
      const data = await fsPromises.readFile('exercise_example.txt', 'utf8');
      ltc(`Data: ${data}`);
    } catch (err) {
      console.error(err);
    }
  }
  run();
  // CODE IN THE OPEN LINES ABOVE
}

async function exercise_15() {
  /* 
   
    Exercise 15: Reading and Writing Files Asynchronously with Error Handling
    
    Problem:

    Write a function 'copyFile' that reads 'source.txt' and writes its 
    content to 'destination.txt' using promises and async/await. 
    Include proper error handling.

    NOTE - We have already imported the fs.promises library at the top
    of this exercises.js file and assigned it to the Global variable 
    `fsPromises`. Please use this variable in your code below.
  
  */
  // CODE IN THE OPEN LINES BELOW

  let fileContents;
  async function readSomeFile() {
    try {
      const data = await fsPromises.readFile('exercise_example.txt', 'utf8');
      ltc(`Data: ${data}`);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
    async function writeSomeFile(fileContents) {
      try {
        await fsPromises.writeFile('destination.txt', fileContents, 'utf8');
        ltc('File saved');
      } catch (err) {
        console.error(err);
      }
    }

  const data = await readSomeFile();
  writeSomeFile(data);

  // CODE IN THE OPEN LINES ABOVE
}

function exercise_16() {
  /* 
   
    Exercise 16
    
    Fetch API: 
		
		Use the `fetch` API to make a GET request.

    Make this request to the following url:
    "https://jsonplaceholder.typicode.com/todos/1"
  
  */
  // CODE IN THE OPEN LINES BELOW

  async function fetchSomeData() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      if (!response.ok) {
        throw new Error(`HTTP error Will Robinson! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Fetching file error:', error);
    }
  }

  fetchSomeData();
  // CODE IN THE OPEN LINES ABOVE
}

function exercise_17() {
  const errorProneFunction = () => {
    if (Math.random() > 0.5) throw new Error("Random failure");
    console.log("Success!");
  };
  /* 
   
    Exercise 17
    
    Retry Logic: 

    Create a function named `retry` that takes a function to run and 
    the number of times it should retry it if it fails.

    Set a variable named `attempt` inside the retry function and initialize
    it to 0. Then, create a function inside the `retry` function named
    `execute`. 

    Use a try-catch block inside of `execute` to try to execute the function
    passed to `retry`. 

    Inside of the catch block, check to see if the current attempt number is 
    less than the 'retries' limit.

    If it is, increment 'attempt' by 1, log a message to the console saying you
    are retrying the function, and then run the `execute` function again.

    If attempt is greater than the retry limit, log an error to the console
    that says the function failed after the retry limit, and print the error 
    message. 

    Finally, we have defined an error prone function above 
    named `errorProneFunction`. Pass this to your `retry` function to test that
    it runs properly.

    Run this exercise multiple times to see the success and failure conditions
    your retry function should have.
  
  */
  // CODE IN THE OPEN LINES BELOW
  function retry(someFunc, retries) {
    let attempt = 0;
    // ltc("Function passed in:");
    // ltc(someFunc);
    // ltc(`Retries limite: ${retries}`);
    // ltc(`attempt number: ${attempt}`);
    function execute(someFunc) {
      try {
        ltc("Starting try block");
        execute(someFunc);
        ltc("Try block ended");
      } catch (error) {
        ltc("Catch block started");
        if (attempt < retries) {
          attempt++;
          ltc(`New attempt number: ${attempt}`);
          ltc("Retrying function");
          execute(someFunc);
        } else {
          ltc("Retry limit reached. Ending program.");
          ltc(error.message);
        }
        console.error;
      }
    }
    execute(someFunc);
  }
  retry(errorProneFunction, 4);
  // CODE IN THE OPEN LINES ABOVE
}

function exercise_18() {
  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  /* 
   
    Exercise 18
    
    Using `Promise.all`: 
		
		Make two promises run concurrently by using Promise.all.
    Once they are both finished, log their results to the console.

    We have created a Promise based `sleep` function above that takes an integer
    for the number of milliseconds to wait before resolving the promise.

    You can use it below. 1000 milliseconds equals 1 second.
  
  */
  // CODE IN THE OPEN LINES BELOW

  const promise1 = sleep(1000).then(() => "First promise completed");
  const promise2 = sleep(1500).then(() => "Second promise completed");
  Promise.all([promise1, promise2]).then((results) => ltc(results));

  // CODE IN THE OPEN LINES ABOVE
}

function exercise_19() {
  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  /* 
   
    Exercise 19
    
    Using `Promise.race`: 
		
		Using Promise.race, log the result of the first promise to out of an array
    of them.

    We have created a Promise based `sleep` function above that takes an integer
    for the number of milliseconds to wait before resolving the promise.

    You can use it below. Use 1000 milliseconds for one of the `sleep` calls
    and 2000 milliseconds for the other.
  
  */
  // CODE IN THE OPEN LINES BELOW

  const promise1 = sleep(1000).then(() => "First promise completed");
  const promise2 = sleep(2000).then(() => "Second promise completed");
  Promise.race([promise1, promise2]).then((results) => ltc(results));

  // CODE IN THE OPEN LINES ABOVE
}

function exercise_20() {
  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  const promise1 = sleep(2000).then(() => "First Promise");
  const promise2 = sleep(1000).then(() => "Second Promise");
  const promiseList = [promise1, promise2, Promise.reject("Error")];
  /* 
   
    Exercise 20
    
    Using `Promise.allSettled`
		
		Use Promise.allSettled to check when an array of promises settle.

    We have defined a `promiseList` for you to use above
  
  */
  // CODE IN THE OPEN LINES BELOW

  Promise.allSettled(promiseList).then((results) => console.log("All results settled", results));

  // CODE IN THE OPEN LINES ABOVE
}
