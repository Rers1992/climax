from django.shortcuts import render, redirect
from apps.memoria.models import MemUbicacion
from .forms import MemUbicacionForm
from django.template import RequestContext
# Create your views here.

def ubicacion(request):
    ubicaciones = MemUbicacion.objects.all()
    return render(request, 'memoria/ubicacion/index.html', {'ubicaciones':ubicaciones})

def crearUbicacion(request):
    if request.method == 'POST':
        ubicacionForm = MemUbicacionForm(request.POST)
        if ubicacionForm.is_valid():
            ubicacionForm.save()
            return redirect('ubicacion:ubicacion')
    else:
        ubicacionForm = MemUbicacionForm()
        return render (request, 'memoria/ubicacion/modal.html', {'ubicacionForm':ubicacionForm})