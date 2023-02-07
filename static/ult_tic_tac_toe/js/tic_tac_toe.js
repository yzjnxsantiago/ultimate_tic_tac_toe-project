/*
 File:          tic_tac_toe.js
 Purpose:       Javascript for an ultimate tic-tac-toe game
 Author:		yzjnxsantiago
 Date:			December 1, 2022
 */

let brodcast_move
let current_outer_square = 4
const outer_square = [false, false, false, false, false, false, false, false, false]
let inner_squares = db_to_2D_array(game_state)
let player_move = [next_move]
let local_win = [null, null, null, null]

const potential_solutions = [   [0, 1, 2],
                                [3, 4, 5],
                                [6, 7, 8],
                                [0, 3, 6],
                                [1, 4, 7],
                                [2, 5, 8],
                                [0, 4, 8],
                                [2, 4, 6],
                            ]

const chatSocket = new WebSocket(
    'ws://'
    + window.location.host
    + '/ws/socket-server/'
);

$( document ).ready(function() {

    if (user != ""){

        if (p1 != user && p2 != user){
        
            if (p1 == 'none') {
                updatePlayer1('Game Object (1)', user)
            }
            else if (p2 == 'none'){

                updatePlayer2('Game Object (1)', user)
            }
            else console.log("Lobby is full :(")
        
        }
    }
})

//

chatSocket.onmessage = function(e){

        let data = JSON.parse(e.data)

        player_move[0] = data.message[5]
        
        brodcast_move = data
        obj           = data.message[3]
        inner_cell_id = data.message[2]
        outer_cell_id = data.message[1]
        cell          = document.getElementById(data.message[3])
        big_square    = document.getElementById(data.message[4])
        

        local_win[0] = data.message[6]
        local_win[1] = data.message[7]
        local_win[2] = data.message[8]
        local_win[3] = document.getElementById(data.message[9])

        is_move      = data.message[10]

        let next_parent_id  = "inner_play" + String(inner_cell_id)
        let next_parent     = document.getElementById(next_parent_id)
        big_square.parentElement.innerHTML  

        if (data.message[0] == "X"){

            cell.innerHTML = "X"

        }

        else if (data.message[0] == "O"){

            cell.innerHTML = "O"

        }

        if (local_win[0] == true) {

            if (inner_type == 'X') {

                local_win[3].parentElement.innerHTML += "<h style='z-index: 2; font-size: 200; position: absolute;'>X</h>"

            }

            else if (inner_type == 'O') {

                local_win[3].parentElement.innerHTML += "<h style='z-index: 2; font-size: 200; position: absolute;'>O</h>"


            }
            


        }
        
        if (is_move == true) { 

            is_move = false

            for (let i = 0; i < outer_square.length; i++){

                if (outer_square[i] == true){
                    
                    outer_square[i] == false
                    setNoplay(big_square)

                }


                if (i == obj[obj.length-1]){
                    
                    setPlay(next_parent)
                    outer_square[i] = true
                    current_outer_square = i

                }
            }   
        }
}

function place_x(obj, parent) {

    var cell            = document.getElementById(obj)
    var inner_cell_id   = obj[obj.length-1] 
    var outer_cell_id   = obj[0]
    let xo_bit          = ''
    let inner_win = false
    let inner_type = ''
    let inner_location
    let outer_location
    let move_made = false

    if (obj[0] == current_outer_square) {
        
        if (cell.childNodes.length === 0){ 
            
            if (player_move[0] == "False" && user == p1) {
                inner_squares[outer_cell_id][inner_cell_id] = "X"
                updateBoardDatabase('Game object (1)', get_game_state(inner_squares), 'O')
                player_move[0] = "True"
                xo_bit = 'X'
                move_made = true
            }

            else if (player_move[0] == "True" && user == p2) {
                inner_squares[outer_cell_id][inner_cell_id] = "O"
                updateBoardDatabase('Game object (1)', get_game_state(inner_squares), 'X')
                player_move[0] = "False"
                xo_bit = 'O'
                move_made = true
            }

        }
        
        for (let i = 0; i < potential_solutions.length; i++){
            
            const [a, b, c] = potential_solutions[i]

            if ((inner_squares[a] == 'x' || inner_squares[a] == 'o') && 
                (inner_squares[b] == 'x' || inner_squares[b] == 'o') && 
                (inner_squares[c] == 'x' || inner_squares[c] == 'o'))  {
                
                inner_win = true

                inner_location = [a, b, c]

                outer_location = parent.id

                if (inner_squares[a] == 'x') { inner_type = 'X' }
                else if (inner_squares[a] == 'o') { inner_type = 'O' }

            }


        }

        chatSocket.send(JSON.stringify({
            'message': [xo_bit, outer_cell_id, inner_cell_id, obj, parent.id, player_move[0], 
                        inner_win, inner_type, inner_location, outer_location, move_made]
        }))
   
    }
}

function setPlay (parent){

    var current_inner_squares = parent.children // find the correct html
    
    for (let i = 0; i < current_inner_squares.length; i++){ 

        current_inner_squares[i].style.borderColor = "green" // change the css of the border to green

    }

}

function setNoplay (parent){

    var current_inner_squares = parent.children
    
    for (let i = 0; i < current_inner_squares.length; i++){

        current_inner_squares[i].style.borderColor = "black" //change css to black border

    }

}

function updateBoardDatabase (room, gameState, player_move) {

    $.ajax({
        url: 'boarddata/',
        cache: 'false',
        dataType: 'json',
        type: 'POST',
        data: {

            game_id: room,
            state: gameState,
            player_move: player_move,
            csrfmiddlewaretoken: csrftoken,

        }, 
        

      });
}


function updatePlayer1(room, player){

    $.ajax({
        url: 'boarddata/',
        cache: 'false',
        dataType: 'json',
        type: 'POST',
        data: {

            game_id: room,
            player1: player,
            csrfmiddlewaretoken: csrftoken,

        }, 
        

      });
}

function updatePlayer2(room, player){

    $.ajax({
        url: 'boarddata/',
        cache: 'false',
        dataType: 'json',
        type: 'POST',
        data: {

            game_id: room,
            player2: player,
            csrfmiddlewaretoken: csrftoken,

        }, 
        

      });

}


function get_game_state(game_map) {

    let game_state_1d = ''; // Changing the game from a 2d array to a string of 81 characters u_ttt 

    // Make the 2d array into a string that will be stored in the database

    for (let i = 0; i < game_map.length; i++) {
        for (let j = 0; j < 9; j++) {
           if (game_map[i][j] == 'X' || game_map[i][j] == 'x') { // If there is no x or o

                game_state_1d = game_state_1d.concat('x'); // Check for x

           }
           else if (game_map[i][j] == 'O' || game_map[i][j] == 'o'){

                game_state_1d = game_state_1d.concat('o'); // Check for o
           }

           else {

                game_state_1d = game_state_1d.concat(' '); // Check for no x or o
           }
            
        }

    }

    return game_state_1d;

}

function db_to_2D_array(game_map) {

    let game_state = [];
    let count = 0

    // setup a 2d array from the 1d char in the db (would be so much easier if it was all 1d but good note for next time)
    for (let i = 0; i < 9; i++) { // 9 for ttt board

        game_state.push([]); // Create another []

        for (let j = 0; j < 9; j++){ //9 for ttt board

            game_state[i].push(game_map[count]); // push the letter to the char array 
            count ++; 

        }

       
    }

    return game_state

}

function place_big_xo(){



}