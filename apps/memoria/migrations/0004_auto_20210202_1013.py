# Generated by Django 2.2.2 on 2021-02-02 13:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('memoria', '0003_auto_20201111_2154'),
    ]

    operations = [
        migrations.AddField(
            model_name='memestadisticas',
            name='atipicosupmax',
            field=models.DecimalField(blank=True, decimal_places=0, max_digits=1000, null=True),
        ),
        migrations.AddField(
            model_name='memestadisticas',
            name='atipicosupmin',
            field=models.DecimalField(blank=True, decimal_places=0, max_digits=1000, null=True),
        ),
        migrations.AddField(
            model_name='memestadisticas',
            name='atipicosuppre',
            field=models.DecimalField(blank=True, decimal_places=0, max_digits=1000, null=True),
        ),
    ]