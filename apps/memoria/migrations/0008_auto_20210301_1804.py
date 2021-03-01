# Generated by Django 2.2.2 on 2021-03-01 21:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('memoria', '0007_auto_20210301_1744'),
    ]

    operations = [
        migrations.AddField(
            model_name='memestadisticas',
            name='shapiromax',
            field=models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True),
        ),
        migrations.AddField(
            model_name='memestadisticas',
            name='shapiromin',
            field=models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True),
        ),
        migrations.AddField(
            model_name='memestadisticas',
            name='shapiropmax',
            field=models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True),
        ),
        migrations.AddField(
            model_name='memestadisticas',
            name='shapiropmin',
            field=models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True),
        ),
        migrations.AddField(
            model_name='memestadisticas',
            name='shapiroppre',
            field=models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True),
        ),
        migrations.AddField(
            model_name='memestadisticas',
            name='shapiropre',
            field=models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True),
        ),
    ]