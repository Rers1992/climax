from django.shortcuts import render, redirect
from apps.memoria.models import MemBitacora
from .forms import MemBitacoraForm
# Create your views here.

def getBitacora(request, codigoEstacion):
    bitacoras = MemBitacora.objects.filter(codigoestacion = codigoEstacion)
    return render(request, 'memoria/bitacora/index.html', {'bitacoras':bitacoras, 'estacion': codigoEstacion})

def crearBitacora(request, codigoEstacion):
    if request.method == 'POST':
        bitacoraForm = MemBitacoraForm(request.POST)
        if bitacoraForm.is_valid():
            bitacoraForm.save()
            return redirect('bitacora:bitacora', codigoEstacion)
    else:
        bitacoraForm = MemBitacoraForm()
        return render (request, 'memoria/bitacora/modal.html', {'bitacoraForm':bitacoraForm, 'codigoEstacion': codigoEstacion})