
$('document').ready(function(){
    /*
    Only start running when the document has fully loaded (except images).
    */
    var DEAD = false, ALIVE = true;

    function make_board(width, height) {

        var board = new Array(width);

        /*
        This `for` loop will do stuff for each column.
        It will create an Array to use as column, then it will fill the array with `false`s,
        and finally it will insert the array as column into the `board`.
         */
        for (var colnr = 0; colnr < width; colnr++) {

            var column = new Array(height);

            for (var cellnr = 0; cellnr < height; cellnr++) {
                column[cellnr] = false;
            }

            board[colnr] = column;
        }
        return board;
    }

    function show_board(board) {
        var table = $("#game-area");
        table.empty();
        for (var rownr = 0; rownr < board.length; rownr++) {
            var tr = $("<tr />");
            for (var cellnr = 0; cellnr < board[rownr].length; cellnr++) {
                var td = $("<td class='dead' />");
                tr.append(td);
            }
            table.append(tr);
        }
    }

    function do_step(old_board) {

    }

    var WIDTH = 8, HEIGHT = 7;
    var board = make_board(WIDTH, HEIGHT);
    console.log(board);
    // console.log(board[5]);
    show_board(board);

    // var double_board = make_board(2 * WIDTH, 2 * HEIGHT);
    // show_board(double_board);
});


