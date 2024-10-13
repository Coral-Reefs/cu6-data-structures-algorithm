function ladderLength(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);

  if (!wordSet.has(endWord)) {
    return 0;
  }

  let queue = [beginWord];
  let steps = 1;
  let visited = new Set();
  visited.add(beginWord);

  while (queue.length > 0) {
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      let currentWord = queue.shift();

      if (currentWord === endWord) {
        return steps;
      }

      for (let i = 0; i < currentWord.length; i++) {
        for (let c = "a".charCodeAt(0); c <= "z".charCodeAt(0); c++) {
          let newWord =
            currentWord.slice(0, i) +
            String.fromCharCode(c) +
            currentWord.slice(i + 1);

          if (wordSet.has(newWord) && !visited.has(newWord)) {
            queue.push(newWord);

            visited.add(newWord);
          }
        }
      }
    }
    steps++;
  }

  return 0;
}

// solution 2

function ladderLength(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;

  let beginSet = new Set([beginWord]);
  let endSet = new Set([endWord]);
  let visited = new Set();
  let steps = 1;

  while (beginSet.size > 0 && endSet.size > 0) {
    if (beginSet.size > endSet.size) {
      [beginSet, endSet] = [endSet, beginSet];
    }

    let nextSet = new Set();
    for (let word of beginSet) {
      let wordArr = word.split("");

      for (let i = 0; i < wordArr.length; i++) {
        let originalChar = wordArr[i];

        for (let c = "a".charCodeAt(0); c <= "z".charCodeAt(0); c++) {
          wordArr[i] = String.fromCharCode(c);
          let newWord = wordArr.join("");

          if (endSet.has(newWord)) {
            return steps + 1;
          }

          if (wordSet.has(newWord) && !visited.has(newWord)) {
            nextSet.add(newWord);
            visited.add(newWord);
          }
        }

        wordArr[i] = originalChar;
      }
    }

    beginSet = nextSet;
    steps++;
  }

  return 0;
}

console.log(
  ladderLength("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"])
);
