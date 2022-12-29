/*
 File:          tic_tac_toe.js
 Purpose:       Load the information of the room from the database when every time the document loads
 Author:		yzjnxsantiago
 Date:			December 28, 2022
 */

 $( document ).ready(function() {

    let cell_id = "0inner_0";
    let cell_obj = document.getElementById(cell_id);

    //Goes through each char in the db game_state and places an x or o accordingly
    let count = 0; // init count, 2d array needs to map to a 1d char array
    for (let i = 0; i < 9; i++){ // 9 is for the number of cells in a tic tac toe board
        for(let j = 0; j < 9; j++){
            cell_id = String(i) + "inner_" + String(j); // get the html id and update each iteration of the loop
            cell_obj = document.getElementById(cell_id); 
            if (game_state[count] == 'x') cell_obj.innerHTML = 'X'; // place an x if this position in the db is an x
           
            else if (game_state[count] == 'o'){ 
                cell_obj.innerHTML = 'O'; // same as above except for o

            }
            count++;
        }
        

    }

});