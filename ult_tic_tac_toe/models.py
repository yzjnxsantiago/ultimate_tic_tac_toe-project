from django.db import models

class Game(models.Model):

    room = models.CharField(max_length=100, default='test')
    game_state = models.CharField(max_length=100)
    player1 = models.CharField(max_length=25, default='none')
    player2 = models.CharField(max_length=25, default='none')