# Generated by Django 4.1.5 on 2023-01-26 00:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ult_tic_tac_toe', '0004_game_player1_game_player2'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='player_move',
            field=models.BooleanField(default=False),
        ),
    ]
