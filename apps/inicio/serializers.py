from rest_framework import serializers
from apps.memoria.models import (MemEstacionmeteorologica, MemBitacora, MemRegionUbicacion)


class RegionUbicacionSerializer(serializers.ModelSerializer):    
    class Meta:
        model = MemRegionUbicacion
        fields = '__all__'

class EstacionmeteorologicaSerializer(serializers.ModelSerializer):    
    class Meta:
        model = MemEstacionmeteorologica
        fields = '__all__'