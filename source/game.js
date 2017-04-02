
$('document').ready(function(){
    /*
    Only start running when the document has fully loaded (except images).
    */
    var DEAD = false, ALIVE = true;

    function make_board(width, height) {

        // var is_top_left_alive = true;
        // var is_the_one_right_of_the_top_left_alive = true;
        // var is_1_1_alive = true;
        // var is_1_2_alive = true;
        // var is_1_3_alive = true;
        // var is_2_1_alive = true;
        // var is_2_2_alive = true;

        var board = new Array(width);

        /*
        This `for` loop will do stuff for each column.
        It will create an Array to use as column, then it will fill the array with `false`s,
        and finally it will insert the array as column into the `board`.
         */
        for (var colnr = 0; colnr < width; colnr++) {

            // console.log("now creating and filling columb number " + colnr);

            // console.log("colnr = " + colnr + " ; val = " + board[colnr]);
            // $('#game-area').append("<em style='color: yellow;'>colnr = " + colnr + " ; val = " + board[colnr] + "; </em>");

            var column = new Array(height);

            for (var cellnr = 0; cellnr < height; cellnr++) {
                // console.log("colnr = " + colnr + " ; val = " + board[colnr]);
                column[cellnr] = false;
                // console.log("now filling cell " + cellnr + " for column " + colnr);
            }

            board[colnr] = column;
        }
        return board;
    }

    function show_board(board) {

    }

    function do_step(old_board) {

    }

    var WIDTH = 8, HEIGHT = 7;
    var board = make_board(WIDTH, HEIGHT);
    console.log(board);
    // console.log(board[5]);
    // show_board(board);

    // var double_board = make_board(2 * WIDTH, 2 * HEIGHT);
    // show_board(double_board);
});


