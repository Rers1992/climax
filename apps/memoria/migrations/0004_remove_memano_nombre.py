# Generated by Django 2.2.2 on 2020-03-22 05:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('memoria', '0003_auto_20200322_0241'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='memano',
            name='nombre',
        ),
    ]
