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
const inner_squares = [        [null, null, null,  
                                null, null, null, 
                                null, null, null],

                                [null, null, null,  
                                 null, null, null, 
                                 null, null, null],

                                [null, null, null,  
                                null, null, null, 
                                null, null, null],

                                [null, null, null,  
                                null, null, null, 
                                null, null, null],

                                [null, null, null,  
                                null, null, null, 
                                null, null, null],

                                [null, null, null,  
                                null, null, null, 
                                null, null, null],

                                [null, null, null,  
                                null, null, null, 
                                null, null, null],

                                [null, null, null,  
                                null, null, null, 
                                null, null, null],

                                [null, null, null,  
                                null, null, null, 
                                null, null, null],
                                
                      ]

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
                cell.innerHTML = "X";
                inner_squares[outer_cell_id][inner_cell_id] = "X"
                updateBoardDatabase('Game object (1)', 'xxx')
                chatSocket.send(JSON.stringify({
                    'message': ["X", outer_cell_id, inner_cell_id, obj, parent.id]
                }))
            }

            else {
                
                cell.innerHTML = "O";
                inner_squares[outer_cell_id][inner_cell_id] = "O"
                updateBoardDatabase('Game Object (1)', 'ooo')

                chatSocket.send(JSON.stringify({
                    'message': ["O", outer_cell_id, inner_cell_id, obj, parent.id]
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