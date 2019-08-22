from django.urls import reverse_lazy
from django.views.generic.edit import CreateView, View, FormView
from django.shortcuts import render, redirect
from django.core.exceptions import ObjectDoesNotExist
from .forms import MemEmpresaForm, MemUsurioForm, LoginForm
from .models import MemEmpresa, MemUsuario
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.contrib.auth import authenticate, login

from .forms import MemEmpresa
# Create your views here.

def entidad(request):
    empresas = MemEmpresa.objects.filter(is_active = True)
    return render(request, 'memoria/entidad/index.html', {'empresas':empresas})

def usuario(request):
    empresas = MemUsuario.objects.filter(estadousuario = True)
    return render(request, 'memoria/usuario/index.html', {'empresas':empresas})

def crearEntidad(request):
    if request.method == 'POST':
        empresaForm = MemEmpresaForm(request.POST)
        if empresaForm.is_valid():
            empresaForm.save()
            return redirect('memoria:entidad')
    else:
        empresaForm = MemEmpresaForm()
        return render (request, 'memoria/entidad/modal.html', {'empresaForm':empresaForm})

def crearUsuario(request):
    if request.method == 'POST':
        empresaForm = MemUsurioForm(request.POST)
        if empresaForm.is_valid():
            empresaForm.save()
            return redirect('memoria:usuario')
    else:
        empresaForm = MemUsurioForm()
        return render (request, 'memoria/usuario/modal.html', {'empresaForm':empresaForm})

def editarEntidad(request, v_rut):
    empresaForm = None
    empresa = None
    error = None
    try:
        empresa = MemEmpresa.objects.get(rutempresa = v_rut)
        if request.method == 'GET':
            empresaForm = MemEmpresaForm(instance = empresa)
        else:
            empresaForm = MemEmpresaForm(request.POST, instance = empresa)
        if empresaForm.is_valid():
            empresaForm.save()
            return redirect('memoria:entidad')
    except ObjectDoesNotExist as e:
        error = e
    return render(request, 'memoria/entidad/modal.html', {'empresaForm':empresaForm, 'empresa':empresa, 'error':error })

def editarUsuario(request, v_rut):
    empresaForm = None
    empresa = None
    error = None
    try:
        empresa = MemUsuario.objects.get(rutusuario = v_rut)
        if request.method == 'GET':
            empresaForm = MemUsurioForm(instance = empresa)
        else:
            empresaForm = MemUsurioForm(request.POST, instance = empresa)
        if empresaForm.is_valid():
            empresaForm.save()
            return redirect('memoria:usuario')
    except ObjectDoesNotExist as e:
        error = e
    return render(request, 'memoria/usuario/modal.html', {'empresaForm':empresaForm, 'empresa':empresa, 'error':error })

def eliminarEntidad(request, v_rut):
    empresa = MemEmpresa.objects.get(rutempresa = v_rut)
    empresa.is_active = False
    empresa.save()
    return redirect('memoria:entidad')

class SignUpView(CreateView):
    form_class = MemEmpresaForm
    success_url = reverse_lazy('login')
    template_name = 'signup.html'