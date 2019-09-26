from django import forms
from apps.memoria.models import MemUbicacion

class MemUbicacionForm(forms.ModelForm):
    class Meta:
        model = MemUbicacion
        fields = ['nombreubicacion']
        labels={
            'nombreubicacion':'Ubicación'
        }