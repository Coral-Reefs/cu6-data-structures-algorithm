// time O(n)
// space O(n * maxWidth)
function fullJustify(words, maxWidth) {
  const result = [];
  let currentLine = [];
  let currentLength = 0;

  for (let word of words) {
    if (currentLength + word.length + currentLine.length > maxWidth) {
      result.push(justifyLine(currentLine, currentLength, maxWidth));
      currentLine = [];
      currentLength = 0;
    }
    currentLine.push(word);
    currentLength += word.length;
  }

  result.push(currentLine.join(" ").padEnd(maxWidth));

  return result;
}

function justifyLine(line, length, maxWidth) {
  if (line.length === 1) {
    return line[0].padEnd(maxWidth);
  }

  const spacesNeeded = maxWidth - length;
  const spacesBetweenWords = Math.floor(spacesNeeded / (line.length - 1));
  const extraSpaces = spacesNeeded % (line.length - 1);

  let justifiedLine = "";
  for (let i = 0; i < line.length - 1; i++) {
    justifiedLine +=
      line[i] + " ".repeat(spacesBetweenWords + (i < extraSpaces ? 1 : 0));
  }
  justifiedLine += line[line.length - 1]; // last word doesn't get extra space

  return justifiedLine;
}

//solution 2
function fullJustify(words, maxWidth) {
  let result = [];
  let firstIndex = 0;

  while (firstIndex < words.length) {
    // Pack words into the current line
    let lineLength = words[firstIndex].length;
    let lastIndex = firstIndex + 1;

    while (
      lastIndex < words.length &&
      lineLength + words[lastIndex].length + 1 < maxWidth
    ) {
      lineLength += words[lastIndex].length + 1;
      lastIndex++;
    }

    // Step 2: Build the line
    let line = "";
    let numberOfWords = lastIndex - firstIndex;

    if (lastIndex === words.length || numberOfWords === 1) {
      // Left justify (lastIndex line or single-word line)
      line = words.slice(firstIndex, lastIndex).join(" ").padEnd(maxWidth);
    } else {
      // Fully justify
      let spacesNeeded = maxWidth - lineLength + (numberOfWords - 1);
      let spacesBetweenWords = Math.floor(spacesNeeded / (numberOfWords - 1));
      let extraSpaces = spacesNeeded % (numberOfWords - 1);

      for (let j = firstIndex; j < lastIndex - 1; j++) {
        line +=
          words[j] +
          " ".repeat(
            spacesBetweenWords + (j - firstIndex < extraSpaces ? 1 : 0)
          );
      }
      line += words[lastIndex - 1];
    }

    result.push(line);
    firstIndex = lastIndex;
  }

  return result;
}

console.log(
  fullJustify(
    ["This", "is", "an", "example", "of", "text", "justification."],
    20
  )
);
