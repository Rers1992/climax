#resources.py  
from import_export import resources  
from apps.memoria.models import MemSeriedetiempo  
class SerieTiempoResource(resources.ModelResource):  
    class Meta:  
        model = MemSeriedetiempo  