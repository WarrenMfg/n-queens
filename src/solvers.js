/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


window.findNRooksSolution = function(n) {
  // i: number 1 - 8
  // o: matrix
  // c:
  // e:
  // helpers:
  // togglePiece: function(rowIndex, colIndex) {
  //   this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
  //   this.trigger('change');
  // }
  // hasAnyRooksConflicts,

  var solution = new Board({'n': n});
  let totalPieces = 0; // on board
  // let pos = [0, 0]; // row, col
  // from (0, 0) --> to (n - 1, n - 1)
  let notSafe = new Board({'n': n});

  for (let i = 0; i < n; i++) { // row
    for (let j = 0; j < n; j++) { // col
      if (solution[i][j] === 0 && notSafe[i][j] === 0) { // not occupied, visited
        solution.togglePiece(i, j);
        totalPieces++;

        let hasConflict = solution.hasAnyRooksConflicts(i, j);
        if (hasConflict) {
          notSafe.togglePiece(i, j); // square is 1
          solution.togglePiece(i, j); // remove from board
          totalPieces--;
        }
      } else {
        notSafe.togglePiece(i, j); // currently occupied by piece
      }
    }
  }




  // while hasAnyRooksConflicts
  // while (solution.hasAnyRooksConflicts(pos[0], pos[1])) {
  //   // base case???

  //   // if pos[1]++ < n
  //   if (pos[1]++ < n) {
  //     // pos[1]++
  //     pos[1]++
  //     // togglePiece(pos[0], pos[1]);
  //     solution.togglePiece(pos[0], pos[1]);
  //   } else if (pos[0]++ < n) { // else if pos[0]++ < n
  //     // pos[1] = 0; // col: beginning of row
  //     pos[1] = 0;
  //     // pos[0]++ // new row
  //     pos[0]++;
  //     // togglePiece(pos[0], pos[1]);
  //     solution.togglePiece(pos[0], pos[1]);
  //   } else {
  //      return solution;
  //   }
  // }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme




  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
