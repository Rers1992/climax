from django import forms
from django_select2 import forms as s2forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import MemEmpresa #, MemUsuario


class AuthorWidget(s2forms.ModelSelect2Widget):
    search_fields = [
        "rutempresa",
        "nombreempresa",
    ]


class MemEmpresaForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = MemEmpresa
        fields = ['rutempresa', 'nombreempresa', 'razonsocialempresa', 'is_admin', 'empresa_padre']
        #widgets = {
        #    "empresa_padre": AuthorWidget,
        #}
        labels={
            'rutempresa':'Rut',
            'nombreempresa':'Nombre',
            'razonsocialempresa':'Razón social',
            'empresa_padre': 'Empresa',
            'is_admin': 'Admin',
        }

# class MemUsurioForm(forms.ModelForm):
#     class Meta:
#         model = MemUsuario
#         fields = ['rutusuario', 'rutempresa','nombreusuario', 'cargousuario', 'contrasenausuario']
#         labels={
#             'rutusuario':'Rut',
#             'rutempresa':'Empresa',
#             'nombreusuario':'Nombre',
#             'cargousuario':'Admin',
#             'contrasenausuario':'Contraseña',
#         }

class LoginForm(forms.Form):
    Rut = forms.CharField()
    Contraseña = forms.CharField(widget=forms.PasswordInput())