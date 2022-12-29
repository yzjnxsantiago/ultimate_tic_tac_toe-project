/*
 File:          tic_tac_toe.js
 Purpose:       Javascript for an ultimate tic-tac-toe game
 Author:		yzjnxsantiago
 Date:			December 1, 2022
 */

let brodcast_move
let x_o_count = 0
let current_outer_square = 4
const outer_square = [false, false, false, false, false, false, false, false, false]
let   inner_squares = db_to_2D_array(game_state)

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

chatSocket.onmessage = function(e){

        let data = JSON.parse(e.data)
        
        brodcast_move = data
        obj           = data.message[3]
        inner_cell_id = data.message[2]
        outer_cell_id = data.message[1]
        cell          = document.getElementById(data.message[3])
        big_square    = document.getElementById(data.message[4])
        x_or_o        = data.message[5]
        
        x_o_count     = x_or_o

        let next_parent_id  = "inner_play" + String(inner_cell_id)
        let next_parent     = document.getElementById(next_parent_id)
        
        if (data.message[0] == "X"){

            cell.innerHTML = "X"

        }

        else if (data.message[0] == "O"){

            cell.innerHTML = "O"

        }
        
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

function place_x(obj, parent) {

    var cell            = document.getElementById(obj)
    var inner_cell_id   = obj[obj.length-1] 
    var outer_cell_id   = obj[0]

    if (obj[0] == current_outer_square) {
        
        if (cell.childNodes.length === 0){ 
            
            x_o_count = x_o_count + 1;
            
            if (x_o_count % 2 == 0) {
                inner_squares[outer_cell_id][inner_cell_id] = "X"
                updateBoardDatabase('Game object (1)', get_game_state(inner_squares))
                chatSocket.send(JSON.stringify({
                    'message': ["X", outer_cell_id, inner_cell_id, obj, parent.id, x_o_count]
                }))
            }

            else {
                inner_squares[outer_cell_id][inner_cell_id] = "O"
                updateBoardDatabase('Game object (1)', get_game_state(inner_squares))

                chatSocket.send(JSON.stringify({
                    'message': ["O", outer_cell_id, inner_cell_id, obj, parent.id, x_o_count]
                }))

            }
        }
        
        /*for (let i = 0; i < potential_solutions.length; i++){
            const check[a, b, c] = potential_solutions[i]
                


        }*/
   
    }
}

function setPlay (parent){

    var current_inner_squares = parent.children
    
    for (let i = 0; i < current_inner_squares.length; i++){

        current_inner_squares[i].style.borderColor = "green"

    }

}

function setNoplay (parent){

    var current_inner_squares = parent.children
    
    for (let i = 0; i < current_inner_squares.length; i++){

        current_inner_squares[i].style.borderColor = "black"

    }

}

function updateBoardDatabase (room, gameState) {

    $.ajax({
        url: 'boarddata/',
        cache: 'false',
        dataType: 'json',
        type: 'POST',
        data: {

            game_id: room,
            state: gameState,
            csrfmiddlewaretoken: csrftoken,

        }, 
        

      });
}

function getBoardState (room_id, gameState) {
    

    $.get({
        url: 'boarddata/',
        cache: 'false',
        dataType: 'json',
        type: 'GET',
        data: {

            room: room_id,
            game_state: gameState,

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