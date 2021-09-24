from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.db.models import Avg, Sum
from rest_framework.response import Response
from tablib import Dataset
from apps.memoria.models import (MemEstacionmeteorologica, MemBitacora, 
MemRegionUbicacion, MemSeriedetiempo, MemIndicesextremosclimaticos, MemUbicacion, MemAno)
from apps.inicio import serializers


def estacion(request):
    estaciones = MemEstacionmeteorologica.objects.filter(
        estadoestacion = True).select_related('codigoubicacion')
    return render(request, 'memoria/inicio/index.html', {'estaciones':estaciones})

def getBitacora(request, codigoEstacion):
    bitacoras = MemBitacora.objects.filter(codigoestacion = codigoEstacion)
    return render(request, 'memoria/bitacoraInicio/index.html', 
    {'bitacoras':bitacoras, 'estacion': codigoEstacion})

def detalle(request, codigoEstacion):
    return render(request, 'memoria/detallesInicio/index.html', {'codigoEstacion': codigoEstacion})

def estadisticos(request, codigoEstacion):
    return render(request, 'memoria/estadisticos/index.html', {'codigoEstacion': codigoEstacion})


#views de region

def regiones(request):
    return render(request, 'memoria/inicioRegion/index.html')

def regionesJson(request):
    regiones = serializers.RegionUbicacionSerializer(MemRegionUbicacion.objects.all(), many=True).data
    estaciones = serializers.EstacionmeteorologicaSerializer(
        MemEstacionmeteorologica.objects.all(), many=True).data
    return JsonResponse({'regiones':regiones, 'estaciones':estaciones})


def get_my_key(obj):
  return obj['ano']

def estacionesRegion(request, codigoEstacion):
    indicesJson = []
    años = []
    temMax = []
    temMin = []
    preci = []
    region = MemRegionUbicacion.objects.get(codigoregion= codigoEstacion)
    ciudades = MemUbicacion.objects.filter(region = codigoEstacion)
    estaciones = MemEstacionmeteorologica.objects.filter(estadoestacion = True, codigoubicacion__in=list(
            ciudades.values_list('codigoubicacion', flat=True)
        ))
    array_wheres = ''
    aux = 0
    if len(estaciones):
        for z in estaciones:
            if aux == 0:
                array_wheres += 'where codigoestacion = '+str(z.codigoestacion)
            else:
                array_wheres += ' or codigoestacion = '+str(z.codigoestacion)
            aux +=1
        serie = MemSeriedetiempo.objects.raw(
        'select fechaserie as id, AVG(temperaturamaxserie) as temperaturamaxserie,'+
        ' AVG(temperaturaminserie) as temperaturaminserie, AVG(precipitacionserie)'+
        ' as precipitacionserie from mem_seriedetiempo '+ array_wheres+' group by fechaserie')
        for i in serie:
            años.append(i.id)
            temMax.append(i.temperaturamaxserie)
            temMin.append(i.temperaturaminserie)
            preci.append(i.precipitacionserie)
        indices = MemIndicesextremosclimaticos.objects.raw('select codigoano as id, AVG(cdd) as cdd, '+
        'AVG(csdi) as csdi, AVG(cwd) as cwd, AVG(dtr) as dtr, AVG(fd0) as fd0, AVG(gsl) as gsl '+
        ', AVG(gsl2) as gsl2, AVG(id0) as id0, AVG(prcptot) as prcptot, AVG(r10mm) as r10mm'+
        ', AVG(r20mm) as r20mm, AVG(r95p) as r95p, AVG(r99p) as r99p, AVG(r50mm) as r50mm'+ 
        ', AVG(rx1day) as rx1day, AVG(rx5day) as rx5day, AVG(sdii) as sdii, AVG(su25) as su25'+ 
        ', AVG(tn10p) as tn10p, AVG(tn90p) as tn90p, AVG(tnn) as tnn , AVG(txn) as txn'+
        ', AVG(tr20) as tr20, AVG(tx10p) as tx10p, AVG(tx90p) as tx90p, AVG(tnx) as tnx,'+ 
        'AVG(txx) as txx, AVG(wsdi) as wsdi, AVG(temmax) as temmax, AVG(temmin) as temmin,'+ 
        'AVG(premax) as premax from mem_indicesextremosclimaticos '+ array_wheres+' group by codigoano')

        for x in indices:
            año = MemAno.objects.get(codigoano = x.id)
            indicesJson.append({'ano': año.ano,'cdd' : x.cdd, 'csdi' : x.csdi, 'cwd' : x.cwd, 
            'dtr' : x.dtr, 'fd0' : x.fd0, 'gsl' : x.gsl,
            'gsl2' : x.gsl2, 'id0' : x.id0, 'prcptot' : x.prcptot, 
            'r10mm' : x.r10mm, 'r20mm' : x.r20mm, 'r95p' : x.r95p,
            'r99p' : x.r99p, 'r50mm' : x.r50mm, 'rx1day' : x.rx1day, 'rx5day' : x.rx5day,
            'sdii' : x.sdii, 'su25' : x.su25,
            'tn10p' : x.tn10p, 'tn90p' : x.tn90p, 'tnn' : x.tnn, 'txn' : x.txn, 
            'tr20' : x.tr20, 'tx10p' : x.tx10p,
            'tx90p' : x.tx90p, 'tnx' : x.tnx, 'txx' : x.txx, 'wsdi' : x.wsdi, 'temmax': x.temmax, 'temmin': x.temmin, 'premax': x.premax})
        indicesJson.sort(key=get_my_key)
    return JsonResponse({'indices':indicesJson, 'fechas': años, 'temMax': temMax, 'temMin':temMin,
    'preci': preci, 'long':region.longitud, 'lat':region.latitud})