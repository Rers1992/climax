from django import forms
from .models import MemEmpresa, MemUsuario

class MemEmpresaForm(forms.ModelForm):
    class Meta:
        model = MemEmpresa
        fields = ['rutempresa', 'nombreempresa', 'razonsocialempresa', 'contrasenaempresa']
        labels={
            'rutempresa':'Rut',
            'nombreempresa':'Nombre',
            'razonsocialempresa':'Razón social',
            'contrasenaempresa':'Contraseña',
        }

class MemUsurioForm(forms.ModelForm):
    class Meta:
        model = MemUsuario
        fields = ['rutusuario', 'rutempresa','nombreusuario', 'cargousuario', 'contrasenausuario']
        labels={
            'rutusuario':'Rut',
            'rutempresa':'Empresa',
            'nombreusuario':'Nombre',
            'cargousuario':'Admin',
            'contrasenausuario':'Contraseña',
        }

class LoginForm(forms.Form):
    Rut = forms.CharField()
    Contraseña = forms.CharField(widget=forms.PasswordInput())