from django import forms
from django.contrib.auth.forms import AuthenticationForm

class FormularioLogin(AuthenticationForm):
   def __init__(self, *args, **kwargs):
      super(FormularioLogin, self).__init__(*args, **kwargs)
      Rut = forms.CharField()
      Contraseña = forms.CharField(widget=forms.PasswordInput())