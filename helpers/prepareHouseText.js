'use strict';

const prepareText = text => {
  const words = text.split(' ');
  let rows = [];
  let row = '';
  words.forEach((word, i) => {
    if (row.length + word.length < 25) {
      row += word + ' ';
    } else {
      rows.push(row);
      row = word + ' ';
    }
    if (i === words.length - 1) {
      rows.push(row);
    }
  });

  rows.forEach((row, i) => {
    if (row.length < 24) {
      let neededSpaces = Math.floor((28 - row.length) / 2);
      let spaces = '';
      for (var j = 0; j < neededSpaces; j++) {
        spaces += ' ';
      }
      rows[i] = spaces + row;
    }
  });

  return rows;
};

module.exports = { prepareText };
