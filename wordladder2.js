function findLadders(beginWord, endWord, wordList) {
  let wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return [];

  // Variables to keep track of paths and the BFS queue
  let queue = [[beginWord]];
  let visited = new Set([beginWord]); // track the words visited at the current level
  let found = false;
  let result = [];

  while (queue.length > 0 && !found) {
    let nextVisited = new Set();
    let levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      let currentPath = queue.shift();
      let lastWord = currentPath[currentPath.length - 1];

      for (let j = 0; j < lastWord.length; j++) {
        // Try changing each letter of the current word
        for (let c = "a".charCodeAt(0); c <= "z".charCodeAt(0); c++) {
          let newWord =
            lastWord.slice(0, j) +
            String.fromCharCode(char) +
            lastWord.slice(j + 1);

          if (wordSet.has(newWord)) {
            // If the next word is endWord, we've found a valid path
            if (newWord === endWord) {
              found = true;
              result.push([...currentPath, newWord]);
            }

            // If not found, continue BFS if it's not visited in this level
            if (!visited.has(newWord)) {
              nextVisited.add(newWord);
              queue.push([...currentPath, newWord]);
            }
          }
        }
      }
    }

    // Update visited set and move to the next level
    visited = new Set([...visited, ...nextVisited]);
  }

  return result;
}

//solution 2
function findLadders(beginWord, endWord, wordList) {
  let connected = (a, b) => {
    let diff = 0;
    for (let i = 0; i < a.length && diff < 2; i++) {
      if (a[i] !== b[i]) diff++;
    }
    return diff == 1;
  };

  // to help us search words faster
  // and to trackback what word was used
  let wordSet = new Set(wordList);
  if (wordSet.has(endWord) == false) return [];

  wordSet.delete(beginWord);
  let queue = [beginWord];
  let nodes = [];

  // find all ways from beginning
  // level by level, until reach end at a level
  let reached = false;
  while (queue.length && !reached) {
    // update nodes of paths for this level
    nodes.push(queue.slice());

    // access whole level
    let levelSize = queue.length;
    for (let i = 0; i < levelSize && !reached; i++) {
      let from = queue.shift();

      // find all nodes that connect to the nodes of this level
      for (let to of wordSet) {
        if (connected(from, to) == false) continue;

        // if connect
        // and one of them is end word
        // then we can stop moving forward
        if (to == endWord) {
          reached = true;
          break;
        }

        // add all connected nodes to the record for the next level
        // and delete them from wordSet to prevent revisiting
        queue.push(to);
        wordSet.delete(to);
      }
    }
  }

  // try but did not find endWord
  if (!reached) return [];

  // move backward to construct paths
  // add nodes to paths in reverse order to have paths from begin to end
  let shortest = [[endWord]];
  for (let level = nodes.length - 1; level >= 0; level--) {
    let shortestLength = shortest.length;
    for (let i = 0; i < shortestLength; i++) {
      let path = shortest.shift();
      let lastWord = path[0];
      for (let word of nodes[level]) {
        if (!connected(lastWord, word)) continue;
        shortest.push([word, ...path]);
      }
    }
  }

  return shortest;
}

console.log(
  findLadders("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"])
);
