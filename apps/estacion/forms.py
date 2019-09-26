from django import forms
from apps.memoria.models import MemEstacionmeteorologica

class MemEstacionForm(forms.ModelForm):
    class Meta:
        model = MemEstacionmeteorologica
        fields = ['codigoubicacion', 'rutusuario','nombreestacion', 'longitudestacion', 'latitudestacion', 'alturaestacion', 'medicionestacion']
        labels={
            'codigoubicacion':'Ubicación',
            'rutusuario':'Rut Usuario',
            'nombreestacion':'Nombre de Estación',
            'longitudestacion':'Longitud',
            'latitudestacion':'Latitud',
            'alturaestacion':'Altura',
            'medicionestacion':'Medición',
        }