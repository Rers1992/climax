from django import forms
from apps.memoria.models import MemBitacora

class DateInput(forms.DateInput):
    input_type = 'date'

class MemBitacoraForm(forms.ModelForm):
    class Meta:
        model = MemBitacora
        fields = ['rutusuario', 'codigoestacion', 'descripcionbitacora']
        widgets = {
            'fechainiciobitacora': DateInput(),
        }
        labels={
            'rutusuario':'Rut Usuario',
            'codigoestacion':'Estación',
            'descripcionbitacora':'Detalle',
        }