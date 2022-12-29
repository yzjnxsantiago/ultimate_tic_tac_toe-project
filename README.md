# Ultimate Tic-Tac-Toe

## Note: Not currently in production 

Welcome to ultimate tic tac toe. Create a user and start playing against random players and friends.

![website preview](https://github.com/yzjnxsantiago/ultimate_tic_tac_toe-project/blob/main/images/u_ttt_board.png)

Here is a preview of the website. I have create a user signup, signout and login feature. The board is a functional ultimate tic tac toe board. The rules of this game are as follows: Player one will start by placing an x or an o. Depending on which of the 9 squares the first player plays, will determine which outer square the next player will need to play. For example if the first player plays at the top left corner, the second user must also play in the top left corner. 

Currently I am using Django Channels and websockets so that multiple users can play with each other.

I am also using Ajax with jQuery to update the game state and save it into a database (sqlite3 for development)

