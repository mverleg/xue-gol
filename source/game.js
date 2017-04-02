
$('document').ready(function(){
    /*
    Only start running when the document has fully loaded (except images).
    */
    function make_board(width, height) {

        // var is_top_left_alive = true;
        // var is_the_one_right_of_the_top_left_alive = true;
        // var is_1_1_alive = true;
        // var is_1_2_alive = true;
        // var is_1_3_alive = true;
        // var is_2_1_alive = true;
        // var is_2_2_alive = true;

        var board = new Array(width);

        for (i = 0; i < width; i++) {

            // console.log("i = " + i + " ; val = " + board[i]);
            // $('#game-area').append("<p style='color: yellow;'>i = " + i + " ; val = " + board[i] + "</p>");

            // var column =
            for (j = 0; j < height; j++) {

            }
        }
        return board;
    }

    function show_board(board) {

    }

    function do_step(old_board) {

    }

    var WIDTH = 20, HEIGHT = 18;
    var board = make_board(WIDTH, HEIGHT);
    // show_board(board);

    var double_board = make_board(2 * WIDTH, 2 * HEIGHT);
    show_board(double_board);
});


