from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from apps.memoria.models import MemSeriedetiempo

# Register your models here.


class SerieTiempoResource(resources.ModelResource):  
    class Meta:  
        model = MemSeriedetiempo  

class SerieTiempoAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    search_fields = ['codigoserie']
    list_display = ('codigoserie',	'fechaserie',	'temperaturamaxserie',	'temperaturaminserie',	
    'temperaturamediaserie',	'precipitacionserie',	'codigoestacion')
    resources_class = SerieTiempoResource
