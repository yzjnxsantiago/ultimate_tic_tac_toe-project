from django.shortcuts import render

def home(request):
    return render(request, 'tic_tac_toe/tic_tac_toe.html')
