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
  // from (0, 0) --> to (n - 1, n - 1)
  var solution = new Board({'n': n});
  let notSafe = new Board({'n': n});
  let totalPieces = 0; // on board

  // create memo???
  let memo = {};

  // return while loop as function or IIFE???
  while (totalPieces < n) {
    for (let r = 0; r < n; r++) { // row
      for (let c = 0; c < n; c++) { // col
        if (solution.get(r)[c] === 0 && notSafe.get(r)[c] === 0) { // if current square is open, and is safe
          solution.togglePiece(r, c); // place piece on square
          totalPieces++;

          let hasConflict = solution.hasAnyRooksConflicts(r, c);
          if (hasConflict) {
            solution.togglePiece(r, c); // remove from solution board
            notSafe.togglePiece(r, c); // mark square as not safe
            totalPieces--;
          } else { // but if no conflict
            notSafe.togglePiece(r, c); // keep piece on board and mark as not safe
          }
        } else {
          if (solution.get(r)[c] === 0) {
            notSafe.togglePiece(r, c); // currently occupied by piece
          }
        }
      }
    }
  }

  if (memo[n]) {
    memo[n].push(solution);
  } else {
    memo[n] = [solution];
  }


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution.rows()));
  return solution.rows();
};
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


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) { // for n = 4, how many different placement options
  // var solutionCount = 0;
  // var solution = new Board({'n': n});
  // let notSafe = new Board({'n': n});
  // let totalPieces = 0; // on board
  // let startSquare = 0;
  // let set_c_toStartSquare = true;
  // // start a new board with the first piece starting one greater than the previous

  // let makeBoard = function(n) {
  //   // make board
  //   while (totalPieces < n) {

  //     for (let r = 0; r < n; r++) { // row

  //       for (let c = 0; c < n; c++) { // col
  //         // on first row only, reinitialize col start square
  //         if (r === 0 && set_c_toStartSquare) {
  //           set_c_toStartSquare = false;
  //           c = startSquare;
  //         }

  //         if (solution.get(r)[c] === 0 && notSafe.get(r)[c] === 0) { // if current square is open, and is safe
  //           solution.togglePiece(r, c); // place piece on square
  //           totalPieces++;

  //           let hasConflict = solution.hasAnyRooksConflicts(r, c);
  //           if (hasConflict) {
  //             solution.togglePiece(r, c); // remove from solution board
  //             notSafe.togglePiece(r, c); // mark square as not safe
  //             totalPieces--;
  //           } else { // but if no conflict
  //             notSafe.togglePiece(r, c); // keep piece on board and mark as not safe
  //           }
  //         } // else {
  //           // if (solution.get(r)[c] !== 0) {
  //             // notSafe.togglePiece(r, c); // currently occupied by piece
  //           // }
  //         // }
  //       }
  //     }
  //   }
  // }


  // for (let i = 0; i < solutionCount.length; i++) {
  //   if (JSON.stringify(solutionCount[i]) === JSON.stringify(solution)) {
  //     // create new solution board
  //     solution = new Board({'n': n});
  //     // create new notSafe board
  //     notSafe = new Board({'n': n});
  //     // update startSquare
  //     startSquare++;
  //     // initialize totalPieces to 0
  //     totalPieces = 0;
  //     // break;
  //     break;
  //   }
  // }

  // initial invocation
  makeBoard(n);

  if (startSquare < n) {
    // count solution
    solutionCount++;
    // create new solution board
    solution = new Board({'n': n});
    // create new notSafe board
    notSafe = new Board({'n': n});
    // update startSquare
    startSquare++;
    // initialize totalPieces to 0
    totalPieces = 0;
    // reset set_c_toStartSquare
    set_c_toStartSquare = true;
    // make another board
    if (startSquare < n) {
      makeBoard(n);
    }
  }


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
