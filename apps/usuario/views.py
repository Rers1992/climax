from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect

def logoutUsuario(request):
    logout(request)
    return HttpResponseRedirect('accounts/login/')