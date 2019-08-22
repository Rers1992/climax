# Generated by Django 2.2.2 on 2019-08-18 04:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('memoria', '0004_auto_20190728_2352'),
    ]

    operations = [
        migrations.RenameField(
            model_name='memempresa',
            old_name='contrasenaempresa',
            new_name='password',
        ),
        migrations.AddField(
            model_name='memempresa',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='memempresa',
            name='is_admin',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='memempresa',
            name='last_login',
            field=models.DateTimeField(blank=True, null=True, verbose_name='last login'),
        ),
        migrations.AddField(
            model_name='memusuario',
            name='estadousuario',
            field=models.BooleanField(default=True, verbose_name='EstadoUsuario'),
        ),
        migrations.AddField(
            model_name='memusuario',
            name='rutempresa',
            field=models.ForeignKey(db_column='rutempresa', default=1, on_delete=django.db.models.deletion.DO_NOTHING, to='memoria.MemEmpresa'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='memusuario',
            name='cargousuario',
            field=models.BooleanField(default=True, verbose_name='CargoUsuario'),
        ),
    ]
