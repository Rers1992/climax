from django.shortcuts import render, redirect
from django.http import JsonResponse
from tablib import Dataset
from apps.memoria.models import MemEstacionmeteorologica, MemSeriedetiempo, MemAno, MemMes, MemIndicesextremosclimaticos, MemEstadisticas, MemBitacora
import tablib
from import_export import resources  
from django.db.models import Q
import numpy as np
from scipy import stats


def estacion(request):
    estaciones = MemEstacionmeteorologica.objects.filter(estadoestacion = True).select_related('codigoubicacion')
    return render(request, 'memoria/inicio/index.html', {'estaciones':estaciones})

def getBitacora(request, codigoEstacion):
    bitacoras = MemBitacora.objects.filter(codigoestacion = codigoEstacion)
    return render(request, 'memoria/bitacoraInicio/index.html', {'bitacoras':bitacoras, 'estacion': codigoEstacion})

def detalle(request, codigoEstacion):
    return render(request, 'memoria/detallesInicio/index.html', {'codigoEstacion': codigoEstacion})

def estadisticos(request, codigoEstacion):
    return render(request, 'memoria/estadisticos/index.html', {'codigoEstacion': codigoEstacion})