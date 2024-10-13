function longestValidParentheses(s) {
  let maxLength = 0;

  // Helper function to check if a substring is valid
  function isValid(substring) {
    let balance = 0;
    for (let char of substring) {
      if (char === "(") {
        balance++;
      } else {
        balance--;
      }
      if (balance < 0) {
        return false;
      }
    }
    return balance === 0;
  }

  // Check every possible substring
  for (let i = 0; i < s.length; i++) {
    for (let j = i + 2; j <= s.length; j += 2) {
      console.log(i, j);
      if (isValid(s.slice(i, j))) {
        maxLength = Math.max(maxLength, j - i);
      }
    }
  }

  return maxLength;
}

// solution 2
function longestValidParentheses(s) {
  let maxLength = 0;
  let stack = [-1];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      stack.push(i);
    } else {
      stack.pop(); // Pop the matching '(' or the initial -1
      if (stack.length > 0) {
        maxLength = Math.max(maxLength, i - stack[stack.length - 1]);
      } else {
        stack.push(i); // Push the index of ')' to reset the start
      }
    }
  }

  return maxLength;
}

console.log(longestValidParentheses(")()()("));
