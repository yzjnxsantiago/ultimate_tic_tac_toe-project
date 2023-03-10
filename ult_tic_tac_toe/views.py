from django.shortcuts import render, redirect
from json import dumps
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.contrib.auth import login, logout, authenticate
from .models import Game
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

def home(request):

    game = Game.objects.get(room = 'test')
    game_id = game.room
    gameState = game.game_state
    p1 = game.player1
    p2 = game.player2
    next_move = game.player_move
    
    return render(request, 'tic_tac_toe/tic_tac_toe.html', {'game_room': game_id, 'game_state': gameState, 'p1': p1, 'p2': p2, 'next_move': next_move})

def signupuser(request):
    if request.method == 'GET':
        return render(request, 'tic_tac_toe/signupuser.html', {'form': UserCreationForm()})
    else:
        if request.POST['password1'] == request.POST['password2']:
            try:
                user = User.objects.create_user(request.POST['username'], password=request.POST['password1'])
                user.save()
                login(request, user)
                return redirect('home')
            except IntegrityError:
                return render(request, 'tic_tac_toe/signupuser.html', {'form': UserCreationForm(), 'error': 'That username has already been taken'})

        else:
            return render(request, 'tic_tac_toe/signupuser.html', {'form': UserCreationForm(), 'error': 'Passwords did not match'})

def logoutuser(request):
    if request.method == 'POST':
        logout(request)
        return redirect('home')

def loginuser(request):
    if request.method == 'GET':
        return render(request, 'tic_tac_toe/loginuser.html', {'form': AuthenticationForm()})
    else:
        user = authenticate(request, username=request.POST['username'],password=request.POST['password'])
        if user is None:
            return render(request, 'tic_tac_toe/loginuser.html', {'form': AuthenticationForm(), 'error': 'Incorrect username or password'})
        else:
           login(request, user)
           return redirect('home') 

@csrf_exempt
def boarddata(request):
    if request.method == 'POST':
        game = Game.objects.get(room = 'test')
        try:
            game_id = request.POST['game_id']
        except:
            pass
        try:
            gameState = request.POST['state']
            game.game_state = gameState
            print(game_id, gameState)
        except:
            pass
        try:
             
             game.player1 = request.POST['player1']
        except:
            pass
        try:
            game.player2 = request.POST['player2']
        except:
            pass
        try:
            next_move = request.POST['player_move']
            if next_move == 'X':
                game.player_move = False
            elif next_move == 'O':
                game.player_move = True
        except:
            pass
        game.save()
        return HttpResponse('')
