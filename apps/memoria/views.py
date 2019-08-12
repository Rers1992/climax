from django.shortcuts import render, redirect
from django.core.exceptions import ObjectDoesNotExist
from .forms import MemEmpresaForm, MemUsurioForm, LoginForm
from .models import MemEmpresa, MemUsuario
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.contrib.auth import authenticate, login
# Create your views here.

def Home(request):
    empresas = MemEmpresa.objects.filter(estadoempresa = True)
    return render(request, 'memoria/entidad/index.html', {'empresas':empresas})

def usuario(request):
    empresas = MemUsuario.objects.filter(estadousuario = True)
    return render(request, 'memoria/usuario/index.html', {'empresas':empresas})

def crearEntidad(request):
    if request.method == 'POST':
        empresaForm = MemEmpresaForm(request.POST)
        if empresaForm.is_valid():
            empresaForm.save()
            return redirect('memoria:index')
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
            return redirect('memoria:index')
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
    empresa.estadoempresa = False
    empresa.save()
    return redirect('memoria:index')

def login_page(request):
    message = None
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            username = request.POST['username']
            password = request.POST['password']
            try:
                user = authenticate(request, MemEmpresa.objects.get(rutempresa = username), MemEmpresa.objects.get(contrasenaempresa = password))
            except MemEmpresa.DoesNotExist:
                user = None
            if user is not None:
                if user.is_active:
                    login(request, user)
                    message = "Te has identificado de modo correcto"
                else:
                    message = "Tu usuario esta inactivo"
            else: 
                message = "Nombre de usuario y/o password incorrecto"
    else:
        form = LoginForm()
    return render(request, 'memoria/login.html', {'message': message, 'form': form})