from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)

# Create your models here.
class MemAno(models.Model):
    codigoano = models.CharField(primary_key=True, max_length=20)
    ano = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mem_ano'


class MemBitacora(models.Model):
    codigobitacora = models.CharField(primary_key=True, max_length=20)
    codigoestacion = models.ForeignKey('MemEstacionmeteorologica', models.DO_NOTHING, db_column='codigoestacion')
    descripcionbitacora = models.CharField(max_length=1000, blank=True, null=True)
    fechainiciobitacora = models.DateField(blank=True, null=True)
    fechafinbitacora = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mem_bitacora'


class MemDesextremosclimaticos(models.Model):
    codigoindicador = models.CharField(primary_key=True, max_length=20)
    nombreindicador = models.CharField(max_length=20, blank=True, null=True)
    descripcionindicador = models.CharField(max_length=20, blank=True, null=True)
    medidaindicador = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mem_desextremosclimaticos'


class MemDia(models.Model):
    codigodia = models.CharField(primary_key=True, max_length=20)
    codigomes = models.ForeignKey('MemMes', models.DO_NOTHING, db_column='codigomes')
    dia = models.DateField()

    class Meta:
        managed = False
        db_table = 'mem_dia'

"""
class MemEmpresa(models.Model):
    rutempresa = models.CharField(primary_key=True, max_length=20)
    nombreempresa = models.CharField(max_length=50, blank=True, null=True)
    razonsocialempresa = models.CharField(max_length=20, blank=True, null=True)
    contrasenaempresa = models.CharField(max_length=20, blank=True, null=True)
    estadoempresa = models.BooleanField('estadoempresa', default = True )

    class Meta:
        db_table = 'mem_empresa'
"""
class MemEmpresa(BaseUserManager):
    def create_user(rutempresa, self, nombreempresa, razonsocialempresa, estadoempresa, contrasenaempresa=None):
        if not rutempresa:
            raise ValueError('la entidad tiene que tener rut')

        user = self.model(
            rutempresa=self.models.CharField(primary_key=True, max_length=20),
            nombreempresa = models.CharField(max_length=50, blank=True, null=True),
            razonsocialempresa = models.CharField(max_length=20, blank=True, null=True),
            estadoempresa = models.BooleanField('estadoempresa', default = True ),
        )

        user.set_password(contrasenaempresa)
        user.save(using=self._db)
        return user

    def create_superuser(rutempresa,self, nombreempresa, razonsocialempresa, estadoempresa, contrasenaempresa):
        user = self.create_user(
            rutempresa= models.CharField(primary_key=True, max_length=20),
            contrasenaempresa=models.CharField(max_length=20, blank=True, null=True),
            nombreempresa = models.CharField(max_length=50, blank=True, null=True),
            razonsocialempresa = models.CharField(max_length=20, blank=True, null=True),
            estadoempresa = models.BooleanField('estadoempresa', default = True ),
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

    class Meta:
        db_table = 'mem_empresa'

class MyUser(AbstractBaseUser):
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = MemEmpresa()

    USERNAME_FIELD = 'rutempresa'
    REQUIRED_FIELDS = ['nombreempresa']

    def __str__(self):
        return self.rutempresa
    
    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

class MemEstacionmeteorologica(models.Model):
    codigoestacion = models.CharField(primary_key=True, max_length=20)
    codigoubicacion = models.ForeignKey('MemUbicacion', models.DO_NOTHING, db_column='codigoubicacion', blank=True, null=True)
    codigoserie = models.ForeignKey('MemSeriedetiempo', models.DO_NOTHING, db_column='codigoserie', blank=True, null=True)
    rutusuario = models.ForeignKey('MemUsuario', models.DO_NOTHING, db_column='rutusuario')
    nombreestacion = models.CharField(max_length=20, blank=True, null=True)
    longitudestacion = models.CharField(max_length=20, blank=True, null=True)
    latitudestacion = models.CharField(max_length=20, blank=True, null=True)
    alturaestacion = models.CharField(max_length=20, blank=True, null=True)
    medicionestacion = models.CharField(max_length=20)
    estadoestacion = models.BooleanField('EstadoEstacion', default = True )

    class Meta:
        db_table = 'mem_estacionmeteorologica'


class MemHora(models.Model):
    codigohora = models.CharField(primary_key=True, max_length=20)
    codigodia = models.ForeignKey(MemDia, models.DO_NOTHING, db_column='codigodia')
    hora = models.TimeField()

    class Meta:
        managed = False
        db_table = 'mem_hora'


class MemIndicesextremosclimaticos(models.Model):
    codigoano = models.ForeignKey(MemAno, models.DO_NOTHING, db_column='codigoano', blank=True, null=True)
    codigoindicador = models.ForeignKey(MemDesextremosclimaticos, models.DO_NOTHING, db_column='codigoindicador', blank=True, null=True)
    codigoestacion = models.ForeignKey(MemEstacionmeteorologica, models.DO_NOTHING, db_column='codigoestacion', blank=True, null=True)
    cdd = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    csdi = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    cwd = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    dtr = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    fd0 = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    gsl = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    id0 = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    prcptot = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    r10mm = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    r20mm = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    r95p = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    r99p = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    r50mm = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    rx1day = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    rx5day = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    sdii = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    su25 = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    tn10p = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    tn90p = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    tnn = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    txn = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    tr20 = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    tx10p = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    tx90p = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    tnx = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    txx = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    wsdi = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mem_indicesextremosclimaticos'


class MemMes(models.Model):
    codigomes = models.CharField(primary_key=True, max_length=20)
    codigoano = models.ForeignKey(MemAno, models.DO_NOTHING, db_column='codigoano')
    nombremes = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mem_mes'


class MemSeriedetiempo(models.Model):
    codigoserie = models.CharField(primary_key=True, max_length=20)
    codigoestacion = models.ForeignKey(MemEstacionmeteorologica, models.DO_NOTHING, db_column='codigoestacion', blank=True, null=True)
    fechaserie = models.DateField(blank=True, null=True)
    temperaturamaxserie = models.CharField(max_length=20, blank=True, null=True)
    temperaturaminserie = models.CharField(max_length=20, blank=True, null=True)
    temperaturamediaserie = models.CharField(max_length=20, blank=True, null=True)
    precipitacionserie = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mem_seriedetiempo'


class MemUbicacion(models.Model):
    codigoubicacion = models.CharField(primary_key=True, max_length=20)
    nombreubicacion = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mem_ubicacion'


class MemUsuario(models.Model):
    rutusuario = models.CharField(primary_key=True, max_length=13)
    rutempresa = models.ForeignKey(MemEmpresa, models.DO_NOTHING, db_column='rutempresa')
    nombreusuario = models.CharField(max_length=20, blank=True, null=True)
    cargousuario = models.BooleanField('CargoUsuario', default = True )
    contrasenausuario = models.CharField(max_length=20, blank=True, null=True)
    estadousuario = models.BooleanField('EstadoUsuario', default = True )

    class Meta:
        managed = True
        db_table = 'mem_usuario'