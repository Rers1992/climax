from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import MemEmpresa, MemUsuario

class MemEmpresaForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = MemEmpresa
        fields = ['rutempresa', 'nombreempresa', 'razonsocialempresa']
        labels={
            'rutempresa':'Rut',
            'nombreempresa':'Nombre',
            'razonsocialempresa':'Razón social'
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