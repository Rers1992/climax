#resources.py  
from import_export import resources  
from apps.memoria.models import MemAno  
class AnoResource(resources.ModelResource):  
    class Meta:  
        model = MemAno  