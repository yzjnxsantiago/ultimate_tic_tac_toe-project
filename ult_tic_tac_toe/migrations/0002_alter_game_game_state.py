# Generated by Django 4.1.3 on 2022-12-28 04:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ult_tic_tac_toe', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='game_state',
            field=models.CharField(max_length=100),
        ),
    ]