
$('document').ready(function(){
    /*
    Only start running when the document has fully loaded (except images).
    */
    var DEAD = false, ALIVE = true;

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
                row[colnr] = false;
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
                var state = board[rownr][colnr] ? 'alive' : 'dead';
                var td = $("<td class='" + state + "' />");
                tr.append(td);
            }
            table.append(tr);
        }
    }

    function do_step(old_board) {

    }

    var WIDTH = 8, HEIGHT = 7;
    var board = make_board(WIDTH, HEIGHT);
    board[1][2] = true;
    console.log(board);
    // console.log(board[5]);
    show_board(board);

    // var double_board = make_board(2 * WIDTH, 2 * HEIGHT);
    // show_board(double_board);
});


