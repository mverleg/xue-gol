
var DEAD = 0, ALIVE = 1;

/*
Create an 2D array to represent the board, and fill it with dead cells.
 */
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

/*
During initialization, toggle a cell from alive to dead or the reverse.
 */
function toggle_cell(board, rownr, colnr) {
    var cell_elem = $("#cell-" + rownr + "-" + colnr);
    if (board[rownr][colnr] == ALIVE) {
        cell_elem.removeClass("alive");
        cell_elem.addClass("dead");
        board[rownr][colnr] = DEAD;
    } else {
        board[rownr][colnr] = ALIVE;
        cell_elem.removeClass("dead");
        cell_elem.addClass("alive");
    }
}

/*
This function is called when a cell on the input board is clicked.
* `rownr`/`colnr`: this is the position of the the `td` cell which was clicked
* `event`: this is the event object, which all click functions get (it isn't used here)
* `board`: we can change the board without returning it, because it's an array (of arrays).
 */
function deal_with_click(rownr, colnr, board, event) {
    toggle_cell(board, rownr, colnr)
}

/*
Show a board of input cells, user can click to choose the initial state.
 */
function show_input_board(board) {
    var table = $("#game-area");
    table.empty();
    for (var rownr = 0; rownr < board.length; rownr++) {
        var tr = $("<tr />");
        for (var colnr = 0; colnr < board[rownr].length; colnr++) {
            /* Give each sell a unique id, so we can select it later when it's clicked. */
            var td = $("<td id='cell-" + rownr + "-" + colnr + "' class='dead input' />");
            tr.append(td);
            /* Here `bind` is used to attach the `td` cell to the function
             Note that this click event happens LATER, so `td` will already have changed,
             so we need to bind it. This is difficult, but later it's important (can skip now). */
            td.click(deal_with_click.bind(null, rownr, colnr, board));
        }
        table.append(tr);
    }
}

/*
Show a frame in the evolution of the game.
 */
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

/*
Count all the neighbours of the board.
 */
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

/*
Based on the number of neighbours (`counts`), kill or create cells.
 */
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

function step_and_show_repeat(board, delay) {
    var counts = count_board(board);
    board = do_updates(board, counts);
    show_board(board);
    setTimeout(step_and_show_repeat.bind(null, board, delay), delay);
}

/*
This will look at the # part of the address, and try to load a board based on those positions.
 */
function init_from_hash(board) {
    if(window.location.hash) {
        /*
        Here we use a regular expression. It's useful to know a little about them, no need to
        know everything. It is used to see if a string has a certain pattern. For example, in
        this case we want a string like "1,5" or "17,109".
        * `^` and `$` are the start and end of the string
        * `[-0-9]` means a minus sign or digit, and `+` means 'at least one',
          so `[-0-9]+` means 'one or more (positive or negative) numbers'
        * `,` is just ',', so in total it says 'start with a number, then a comma, then another
          number at the end'
         */
        var position_re = new RegExp('^[\\-0-9]+,[\\-0-9]+$', 'i');
        /*
        `window.location.hash` is the part of the url starting with #
        `.slice(1)` gets all letters after 0, and `split('_')` splits
        the text into a list at '_', e.g. "a-bcd-ef" => ["a", "bcd", "ef"]
         */
        var positions = [];
        var parts = window.location.hash.slice(1).split('_');
        parts.forEach(function(part) {
            if (! position_re.test(part)) {
                console.log("Page hash not properly formatted ('" + part +
                    "' not understood). Not loading board");
                return;
            }
            /*
            Now the text part is like "10,7", so we split it into ["10", "7"] and
            then we convert "10" to 10 (number) and "7" to 7, and add it to list.
            */
            var indices = part.split(',');
            positions.push([parseInt(indices[0]), parseInt(indices[1])]);
        });
        positions_set_alive(board, positions);
    }
}

/*
Set all the given positions in an array to alive.
 */
function positions_set_alive(board, positions) {
    for (var rownr = 0; rownr < board.length; rownr++) {
        for (var colnr = 0; colnr < board[rownr].length; colnr++) {
            if (board[rownr][colnr] == ALIVE) {
                toggle_cell(board, pos[0], pos[1]);
            }
        }
    }
    positions.forEach(function (pos) {
        if (board[pos[0]][pos[1]] == DEAD) {
            toggle_cell(board, pos[0], pos[1]);
        }
    });
}

/*
Create a string that represents the currently alive board positions.
 */
function create_board_str(board) {
    position_texts = [];
    for (var rownr = 0; rownr < board.length; rownr++) {
        for (var colnr = 0; colnr < board[rownr].length; colnr++) {
            if (board[rownr][colnr] == ALIVE) {
                position_texts.push(rownr + "," + colnr);
            }
        }
    }
    return position_texts.join('_');
}

/*
Update the current hash (#) part of the domain to match the state of the board.
 */
function state_to_hash(board) {
    positions_text = create_board_str(board);
    window.location.hash = '#' + positions_text;
    var ptrn_elem = $('#pattern-container');
    ptrn_elem.empty();
    var disp_text = positions_text;
    if (disp_text.length > 100) {
        disp_text = disp_text.substr(0, 100) + "...";
    }
    ptrn_elem.append("share: <a href='#" + positions_text + "'>#" + disp_text + "...</a>");
}

/*
This starts the game, doing the first iteration with `step_and_show_repeat`,
which will subsequently keep calling itself.
 */
function start_game (init_board, event) {
    state_to_hash(init_board);
    $('#start-game-button').remove();
    setTimeout(step_and_show_repeat.bind(null, init_board, 1000.0 / FPS), 1000.0 / FPS);
}

$('document').ready(function() {
    /*
     Only start running when the document has fully loaded (except images).
     */
    var FPS = 5;
    var WIDTH = 50, HEIGHT = 30;
    var init_board = make_board(WIDTH, HEIGHT);

    show_input_board(init_board);
    init_from_hash(init_board);

    $('#start-game-button').click(start_game.bind(null, init_board));
    $(window).keypress(function(init_board, event) {
        /* Can also press spacebar to start the game. */
        if (event.which === 32) {
            start_game(init_board);
            return false;
        }
    }.bind(null, init_board));
});


