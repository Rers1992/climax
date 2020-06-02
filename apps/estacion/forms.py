from django import forms
from apps.memoria.models import MemEstacionmeteorologica

class DateInput(forms.DateInput):
    input_type = 'date'

class MemEstacionForm(forms.ModelForm):
    class Meta:
        model = MemEstacionmeteorologica
        fields = ['codigoubicacion', 'rutusuario','nombreestacion', 'fechainstalacion', 'fechatermino', 'longitudestacion', 
        'latitudestacion', 'alturaestacion', 'cuenca', 'rio', 'medicionestacion', 'comentario']
        widgets = {
            'fechainstalacion': DateInput(),
            'fechatermino': DateInput(),
        }
        labels={
            'codigoubicacion':'Ubicación',
            'rutusuario':'Rut Usuario',
            'nombreestacion':'Nombre de Estación',
            'fechainstalacion' : 'Fecha de Instalación',
            'fechatermino' : 'Fecha de Termino',
            'longitudestacion':'Longitud',
            'latitudestacion':'Latitud',
            'alturaestacion':'Altura',
            'cuenca' : 'Cuenca',
            'rio'   : 'Rio',
            'medicionestacion':'Medición',
            'comentario' : 'Comentario',
        }