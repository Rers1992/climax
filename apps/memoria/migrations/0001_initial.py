# Generated by Django 2.2.2 on 2021-05-20 20:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MemEmpresa',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('rutempresa', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('nombreempresa', models.CharField(blank=True, max_length=50, null=True)),
                ('razonsocialempresa', models.CharField(blank=True, max_length=20, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_admin', models.BooleanField(default=False)),
            ],
            options={
                'db_table': 'mem_empresa',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='MemAno',
            fields=[
                ('codigoano', models.AutoField(primary_key=True, serialize=False)),
                ('ano', models.DecimalField(blank=True, decimal_places=0, max_digits=1000, null=True)),
            ],
            options={
                'db_table': 'mem_ano',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='MemDesextremosclimaticos',
            fields=[
                ('codigoindicador', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('nombreindicador', models.CharField(blank=True, max_length=20, null=True)),
                ('descripcionindicador', models.CharField(blank=True, max_length=20, null=True)),
                ('medidaindicador', models.CharField(blank=True, max_length=20, null=True)),
            ],
            options={
                'db_table': 'mem_desextremosclimaticos',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='MemEstacionmeteorologica',
            fields=[
                ('codigoestacion', models.AutoField(primary_key=True, serialize=False)),
                ('nombreestacion', models.CharField(blank=True, max_length=20, null=True)),
                ('fechainstalacion', models.DateField(blank=True, null=True)),
                ('fechatermino', models.DateField(blank=True, null=True)),
                ('longitudestacion', models.CharField(blank=True, max_length=20, null=True)),
                ('latitudestacion', models.CharField(blank=True, max_length=20, null=True)),
                ('alturaestacion', models.CharField(blank=True, max_length=20, null=True)),
                ('cuenca', models.CharField(max_length=20)),
                ('rio', models.CharField(max_length=20)),
                ('medicionestacion', models.CharField(max_length=20)),
                ('comentario', models.CharField(max_length=20)),
                ('estadoestacion', models.BooleanField(default=True, verbose_name='EstadoEstacion')),
            ],
            options={
                'db_table': 'mem_estacionmeteorologica',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='MemUbicacion',
            fields=[
                ('codigoubicacion', models.AutoField(primary_key=True, serialize=False)),
                ('nombreubicacion', models.CharField(blank=True, max_length=20, null=True)),
            ],
            options={
                'db_table': 'mem_ubicacion',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='MemUsuario',
            fields=[
                ('rutusuario', models.CharField(max_length=13, primary_key=True, serialize=False)),
                ('nombreusuario', models.CharField(blank=True, max_length=20, null=True)),
                ('cargousuario', models.BooleanField(default=True, verbose_name='CargoUsuario')),
                ('contrasenausuario', models.CharField(blank=True, max_length=20, null=True)),
                ('estadousuario', models.BooleanField(default=True, verbose_name='EstadoUsuario')),
                ('rutempresa', models.ForeignKey(db_column='rutempresa', on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'mem_usuario',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='MemSeriedetiempo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fechaserie', models.DateField(blank=True, null=True)),
                ('temperaturamaxserie', models.CharField(blank=True, max_length=20, null=True)),
                ('temperaturaminserie', models.CharField(blank=True, max_length=20, null=True)),
                ('precipitacionserie', models.CharField(blank=True, max_length=20, null=True)),
                ('codigoestacion', models.ForeignKey(blank=True, db_column='codigoestacion', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='memoria.MemEstacionmeteorologica')),
            ],
            options={
                'db_table': 'mem_seriedetiempo',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='MemMes',
            fields=[
                ('codigomes', models.AutoField(primary_key=True, serialize=False)),
                ('nombremes', models.DecimalField(blank=True, decimal_places=0, max_digits=1000, null=True)),
                ('codigoano', models.ForeignKey(db_column='codigoano', on_delete=django.db.models.deletion.DO_NOTHING, to='memoria.MemAno')),
            ],
            options={
                'db_table': 'mem_mes',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='MemIndicesextremosclimaticos',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cdd', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('csdi', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('cwd', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('dtr', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('fd0', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('gsl', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('gsl2', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('id0', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('prcptot', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('r10mm', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('r20mm', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('r95p', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('r99p', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('r50mm', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('rx1day', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('rx5day', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('sdii', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('su25', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('tn10p', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('tn90p', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('tnn', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('txn', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('tr20', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('tx10p', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('tx90p', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('tnx', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('txx', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('wsdi', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('temmax', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('temmin', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('premax', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('codigoano', models.ForeignKey(blank=True, db_column='codigoano', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='memoria.MemAno')),
                ('codigoestacion', models.ForeignKey(blank=True, db_column='codigoestacion', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='memoria.MemEstacionmeteorologica')),
            ],
            options={
                'db_table': 'mem_indicesextremosclimaticos',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='MemEstadisticas',
            fields=[
                ('codigoestadisticas', models.AutoField(primary_key=True, serialize=False)),
                ('mediamax', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('mediamin', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('mediapre', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('medianamax', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('medianamin', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('medianapre', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('modamax', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('modamin', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('modapre', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('desviacionesmax', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('desviacionesmin', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('desviacionespre', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('varianzamax', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('varianzamin', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('varianzapre', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('cuartil1max', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('cuartil1min', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('cuartil1pre', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('cuartil3max', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('cuartil3min', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('cuartil3pre', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('intecuartilmax', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('intecuartilmin', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('intecuartilpre', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('atipicoinfmax', models.DecimalField(blank=True, decimal_places=0, max_digits=1000, null=True)),
                ('atipicoinfmin', models.DecimalField(blank=True, decimal_places=0, max_digits=1000, null=True)),
                ('atipicoinfpre', models.DecimalField(blank=True, decimal_places=0, max_digits=1000, null=True)),
                ('atipicosupmax', models.DecimalField(blank=True, decimal_places=0, max_digits=1000, null=True)),
                ('atipicosupmin', models.DecimalField(blank=True, decimal_places=0, max_digits=1000, null=True)),
                ('atipicosuppre', models.DecimalField(blank=True, decimal_places=0, max_digits=1000, null=True)),
                ('extremoinfmax', models.DecimalField(blank=True, decimal_places=0, max_digits=1000, null=True)),
                ('extremoinfmin', models.DecimalField(blank=True, decimal_places=0, max_digits=1000, null=True)),
                ('extremoinfpre', models.DecimalField(blank=True, decimal_places=0, max_digits=1000, null=True)),
                ('extremosupmax', models.DecimalField(blank=True, decimal_places=0, max_digits=1000, null=True)),
                ('extremosupmin', models.DecimalField(blank=True, decimal_places=0, max_digits=1000, null=True)),
                ('extremosuppre', models.DecimalField(blank=True, decimal_places=0, max_digits=1000, null=True)),
                ('kstestmax', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('kstestmin', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('kstestpre', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('kstestpmax', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('kstestpmin', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('kstestppre', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('shapiromax', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('shapiromin', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('shapiropre', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('shapiropmax', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('shapiropmin', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('shapiroppre', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('kurtosismax', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('kurtosismin', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('kurtosispre', models.DecimalField(blank=True, decimal_places=1, max_digits=1000, null=True)),
                ('codigoano', models.ForeignKey(db_column='codigoano', on_delete=django.db.models.deletion.DO_NOTHING, to='memoria.MemAno')),
                ('codigoestacion', models.ForeignKey(blank=True, db_column='codigoestacion', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='memoria.MemEstacionmeteorologica')),
            ],
            options={
                'db_table': 'mem_estadisticas',
                'managed': True,
            },
        ),
        migrations.AddField(
            model_name='memestacionmeteorologica',
            name='codigoubicacion',
            field=models.ForeignKey(blank=True, db_column='codigoubicacion', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='memoria.MemUbicacion'),
        ),
        migrations.AddField(
            model_name='memestacionmeteorologica',
            name='rutusuario',
            field=models.ForeignKey(db_column='rutusuario', on_delete=django.db.models.deletion.DO_NOTHING, to='memoria.MemUsuario'),
        ),
        migrations.CreateModel(
            name='MemDia',
            fields=[
                ('codigodia', models.AutoField(primary_key=True, serialize=False)),
                ('dia', models.DecimalField(blank=True, decimal_places=0, max_digits=1000, null=True)),
                ('codigomes', models.ForeignKey(db_column='codigomes', on_delete=django.db.models.deletion.DO_NOTHING, to='memoria.MemMes')),
            ],
            options={
                'db_table': 'mem_dia',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='MemBitacora',
            fields=[
                ('codigobitacora', models.AutoField(primary_key=True, serialize=False)),
                ('descripcionbitacora', models.CharField(blank=True, max_length=1000, null=True)),
                ('fechainiciobitacora', models.DateField(auto_now_add=True, null=True)),
                ('fechafinbitacora', models.DateField(blank=True, null=True)),
                ('codigoestacion', models.ForeignKey(db_column='codigoestacion', on_delete=django.db.models.deletion.DO_NOTHING, to='memoria.MemEstacionmeteorologica')),
                ('rutusuario', models.ForeignKey(db_column='rutusuario', on_delete=django.db.models.deletion.DO_NOTHING, to='memoria.MemUsuario')),
            ],
            options={
                'db_table': 'mem_bitacora',
                'managed': True,
            },
        ),
    ]
