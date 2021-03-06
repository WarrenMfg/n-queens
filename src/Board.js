// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // let row = window.
      // let pieceCount = 0;
      // let row = this.get(rowIndex); // this is an array
      // console.log(row.length);
      // for (let i = 0; i < row.length; i++) {
      //   if (row[i] > 0) {
      //     pieceCount++;
      //     if (pieceCount > 1) {
      //       return true;
      //     }
      //   }
      // }
      // return false;
      // console.log('rowIndex', rowIndex);
      var count = 0;
      for (var i = 0; i < rowIndex.length; i++) {
        if (rowIndex[i]) {
          count++;
          // consider additional if statement to short circuit the for loop
        }
      }

      return (count > 1);
    },

    hasAnyRowConflicts: function() {
    // test if any rows on this board contain conflicts
      let rows = this.rows();

      for (let i = 0; i < rows.length; i++) {
        if (this.hasRowConflictAt(rows[i])) {
          return true;
        }
      }
      return false; // fixme --> fixed?
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      let board = this.rows();

      var count = 0;

      // n = 4
      // console.log('colIndex', colIndex);
      for (var i = 0; i < board.length; i++) {
        let row = board[i];
        if (row[colIndex] > 0) {
          count++;
          // consider additional if statement to short circuit the for loop
        }
      }

      return (count > 1);
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {

      var board = this.rows();
      for (var i = 0; i < board.length; i++) { // board length === row length
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;

      // can we use this.get('n') ???
      // for (let i = 0; i < this.length; i++) {
      //   if (this.hasColConflictAt(i)) {
      //     return true;
      //   }
      // }
      // return false; // fixme --> fixed?
    },



    // Major Diagonals - go from top-left to bottom-right - BACK SLASH
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      let col = majorDiagonalColumnIndexAtFirstRow;
      let i = 0;
      let rows = this.rows();
      let row = rows[i];
      let count = 0;

      let iterator = function(row, col) {

        if (i === rows.length) { // if all rows have been iterated
          return false;
        }

        if (col < row.length) { // bc if greater, it makes no sense
          if (row[col] > 0) { // individual chessboard square
            count++;
            if (count > 1) { // conflict!!!
              return true;
            // } else if ((col === row.length - 1) && (count >= 1)) {
            //   return true;
            }
          }
        } else { // col > row.length
          return false;
        }

        col++; // next column
        i++;
        row = rows[i]; // next row
        return iterator(row, col);
      };

      return iterator(row, col);
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      let n = -this.get('n'); // get negative n (length of array)
      let col = n + 2; // opposite of length, but plus 1 to be opposite of last index, but plus 1 again (plus 2 total) bc we cannot have conflict in bottom left corner
      let conflict = false; // assume no conflict, prove otherwise

      while (col < Math.abs(n)) { // while less than length of array
        conflict = this.hasMajorDiagonalConflictAt(col);
        if (conflict) {
          return true;
        }
        col++;
      }
      return conflict;
    },



    // Minor Diagonals - go from top-right to bottom-left - FORWARD SLASH
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      let col = minorDiagonalColumnIndexAtFirstRow;
      let i = 0;
      let rows = this.rows();
      let row = rows[i];
      let count = 0;

      let iterator = function(row, col) {

        if (i === rows.length) { // if all rows have been iterated
          return false;
        }

        if (col >= 0) { // bc if less than 0 index (first col), makes no sense
          if (row[col] > 0) { // individual chessboard square
            count++;
            if (count > 1) { // conflict!!!
              return true;
            }
          }
        } else { // col < 0
          return false;
        }

        col--; // previous column
        i++;
        row = rows[i]; // next row
        return iterator(row, col);
      };

      return iterator(row, col);

    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      let n = this.get('n'); // get n (length of array)
      let col = 1; // top left corner + 1, bc top left corner cannot have minor conflict
      let conflict = false; // assume no conflict, prove otherwise

      while (col < ((n - 1 ) * 2)) { // while less than twice the array.length, but exclude bottom right corner
        conflict = this.hasMinorDiagonalConflictAt(col);
        if (conflict) {
          return true;
        }
        col++;
      }
      return conflict;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
