# Generated by Django 2.2.2 on 2021-03-01 20:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('memoria', '0006_auto_20210301_1735'),
    ]

    operations = [
        migrations.AlterField(
            model_name='memestadisticas',
            name='kstestmax',
            field=models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True),
        ),
        migrations.AlterField(
            model_name='memestadisticas',
            name='kstestmin',
            field=models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True),
        ),
        migrations.AlterField(
            model_name='memestadisticas',
            name='kstestpmax',
            field=models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True),
        ),
        migrations.AlterField(
            model_name='memestadisticas',
            name='kstestpmin',
            field=models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True),
        ),
        migrations.AlterField(
            model_name='memestadisticas',
            name='kstestppre',
            field=models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True),
        ),
        migrations.AlterField(
            model_name='memestadisticas',
            name='kstestpre',
            field=models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True),
        ),
    ]