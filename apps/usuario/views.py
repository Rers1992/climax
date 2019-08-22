from django.shortcuts import render
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
from django.views.generic.edit import FormView
from django.contrib.auth import authenticate, login
from django.http import HttpResponseRedirect
from .forms import FormularioLogin

class Login(FormView):
    template_name = 'login'
    #form_class = FormularioLogin
    success_url = reverse_lazy('index')

    @method_decorator(csrf_protect)
    @method_decorator(never_cache)
    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return  HttpResponseRedirect(self.get_success_url())
        else:
            return super(Login, self).dispatch(request, *args, **kwargs)
    def form_valid(self, form):
        login(self.request, form.get_user())
        return super(Login, self).form_valid(form)
"""
def Login(request):
    username = request.POST.get('Rut')
    password = request.POST.get('Contraseña')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        print("hola")
    else:
        # Return an 'invalid login' error message.
        print("asdsa")
"""        
"""
def Login(request):
    message = None
    if request.method == "POST":
        form = FormularioLogin(request.POST)
        if form.is_valid():
            username = request.POST['Rut']
            password = request.POST['Contraseña']
            user = authenticate(request, rutempresa=username, password=password)
            if user is not None:
                if user.is_active:
                    login(request, user)
                    message = "Te has identificado de modo correcto"
                else:
                    message = "Tu usuario esta inactivo"
            else: 
                message = "Nombre de usuario y/o password incorrecto"
    else:
        form = FormularioLogin()
    return render(request, 'memoria/login.html', {'message': message, 'form': form})
"""