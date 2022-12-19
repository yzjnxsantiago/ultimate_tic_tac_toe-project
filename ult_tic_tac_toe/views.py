from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.contrib.auth import login, logout, authenticate

def home(request):
    return render(request, 'tic_tac_toe/tic_tac_toe.html')

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
