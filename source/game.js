
$('document').ready(function() {
    /*
     Only start running when the document has fully loaded (except images).
     */
    var DEAD = 0, ALIVE = 1;
    var FPS = 10;

    function make_board(width, height) {

        var board = new Array(height);

        /*
         This `for` loop will do stuff for each row.
         It will create an Array to use as row, then it will fill the array with `false`s,
         and finally it will insert the array as row into the `board`.
         */
        for (var rownr = 0; rownr < height; rownr++) {

            var row = new Array(width);
            for (var colnr = 0; colnr < width; colnr++) {
                row[colnr] = DEAD;
            }
            board[rownr] = row;
        }
        return board;
    }

    function show_board(board) {
        var table = $("#game-area");
        table.empty();
        for (var rownr = 0; rownr < board.length; rownr++) {
            var tr = $("<tr />");
            for (var colnr = 0; colnr < board[rownr].length; colnr++) {
                var state = board[rownr][colnr] == ALIVE ? 'alive' : 'dead';
                var td = $("<td class='" + state + "' />");
                tr.append(td);
            }
            table.append(tr);
        }
    }

    function count_board(board) {
        if (board.length === 0) return null;
        var width = board[0].length;
        var height = board.length;
        var counts = make_board(width, height);
        for (var rownr = 0; rownr < board.length; rownr++) {
            for (var colnr = 0; colnr < board[rownr].length; colnr++) {
                /*
                 First check that a neighbour exists, then check whether it's alive and count it.
                 */
                var count = 0;
                if (rownr > 0 && colnr > 0 && board[rownr - 1][colnr - 1] == ALIVE) {
                    count += 1;
                } // top left
                if (rownr > 0 && board[rownr - 1][colnr] == ALIVE) {
                    count += 1;
                } // top
                if (rownr > 0 && colnr < width - 1 && board[rownr - 1][colnr + 1] == ALIVE) {
                    count += 1;
                } // top right
                if (colnr < width - 1 && board[rownr][colnr + 1] == ALIVE) {
                    count += 1;
                } // right
                if (rownr < height - 1 && colnr < width - 1 && board[rownr + 1][colnr + 1] == ALIVE) {
                    count += 1;
                } // bottom right
                if (rownr < height - 1 && board[rownr + 1][colnr] == ALIVE) {
                    count += 1;
                } // bottom
                if (rownr < height - 1 && colnr > 0 && board[rownr + 1][colnr - 1] == ALIVE) {
                    count += 1;
                } // bottom left
                if (colnr > 0 && board[rownr][colnr - 1] == ALIVE) {
                    count += 1;
                } // left
                counts[rownr][colnr] = count;
            }
        }
        return counts;
    }

    function do_updates(board, counts) {
        for (var rownr = 0; rownr < board.length; rownr++) {
            for (var colnr = 0; colnr < board[rownr].length; colnr++) {
                switch (counts[rownr][colnr]) {
                    case 0:
                    case 1:
                        /* Any live cell with fewer than two live neighbours dies, as if caused by underpopulation. */
                        board[rownr][colnr] = DEAD;
                        break;
                    case 2:
                        /* Any live cell with two or three live neighbours lives on to the next generation. */
                        break;
                    case 3:
                        /* Any live cell with two or three live neighbours lives on to the next generation. */
                        /* Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction. */
                        board[rownr][colnr] = ALIVE;
                        break;
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                        /* Any live cell with more than three live neighbours dies, as if by overpopulation. */
                        board[rownr][colnr] = DEAD;
                        break;
                    default:
                        throw new Error("The number of neighbours is incorrect!");
                }
            }
        }
        return board;
    }

    function do_step(board) {
        var counts = count_board(board);
        board = do_updates(board, counts);
        return board;
    }

    function step_and_show_repeat() {
        board = do_step(board);
        show_board(board);
        setTimeout(step_and_show_repeat, 1000.0 / FPS);
    }

    var WIDTH = 30, HEIGHT = 25;
    var board = make_board(WIDTH, HEIGHT);
    board[1][1] = true;
    board[2][2] = true;
    board[2][3] = true;
    board[3][1] = true;
    board[3][2] = true;
    show_board(board);

    setTimeout(step_and_show_repeat, 1000.0 / FPS);
});


