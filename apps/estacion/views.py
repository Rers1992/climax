from django.shortcuts import render, redirect
from django.http import JsonResponse
from tablib import Dataset
from .resources import SerieTiempoResource
from .indicadores import *
from apps.memoria.models import( MemEstacionmeteorologica, MemSeriedetiempo, 
MemAno, MemMes, MemIndicesextremosclimaticos, MemEstadisticas, MemEmpresa)
from .forms import MemEstacionForm
import tablib
from import_export import resources  
from django.db.models import Q
import numpy as np
from scipy import stats


# Create your views here.

def estacion(request):
    empresas = MemEmpresa.objects.get(rutempresa = request.user)
    if empresas.empresa_padre:
        empresasHijas = MemEmpresa.objects.filter(
            Q(rutempresa = empresas.empresa_padre.rutempresa)|Q(empresa_padre=empresas.empresa_padre.rutempresa))
    else:
        empresasHijas = MemEmpresa.objects.filter(
            Q(rutempresa = request.user)|Q(empresa_padre=request.user))
    estaciones = MemEstacionmeteorologica.objects.filter(
        estadoestacion = True, rutusuario__in=list(
            empresasHijas.values_list('rutempresa', flat=True)
        )).select_related('codigoubicacion')
    return render(request, 'memoria/estacion/index.html', {'estaciones':estaciones})

def estacionJson(request):
    json = []
    estaciones = MemEstacionmeteorologica.objects.filter(estadoestacion = True).select_related('rutusuario').order_by('codigoestacion')
    for x in estaciones:
        json.append({'codigo': x.codigoestacion, 'nombre' : x.nombreestacion, 'propietario': x.rutusuario.nombreempresa, 
        'latitud': x.latitudestacion, 'longitud': x.longitudestacion})

    return JsonResponse({'estacionesJson': json})

def dashboard(request, codigoEstacion):
    return render(request, 'memoria/dashboard/index.html', {'codigoEstacion':codigoEstacion})

def estadisticas(request, codigoEstacion):
    return render(request, 'memoria/estadisticas/index.html', {'codigoEstacion':codigoEstacion})

def estadisticasJson(request, codigoEstacion):
    estadisticasJson = []
    años = []
    temMax = []
    temMin = []
    preci = []
    temMed = []
    añosEs = []
    medianamaxA = []
    mediamaxA = []
    desviacionesmaxA = []
    varianzamaxA = []
    mediaminA = []
    medianaminA = []
    desviacionesminA = []
    varianzaminA = []
    mediaproA = []
    medianaproA = []
    desviacionesproA = []
    varianzaproA = []
    mediapreA = []
    medianapreA = []
    desviacionespreA = []
    varianzapreA = []
    mediamax = 0
    mediamin = 0
    mediapre = 0
    medianamax = 0 
    medianamin = 0
    medianapre = 0
    modamax = 0 
    modamin = 0 
    modapre = 0 
    desviacionesmax = 0 
    desviacionesmin = 0 
    desviacionespre = 0 
    varianzamax = 0 
    varianzamin = 0 
    varianzapre = 0
    cuartil1max = 0
    cuartil1min = 0
    cuartil1pre = 0
    cuartil3max = 0
    cuartil3min = 0
    cuartil3pre = 0
    intecuartilmax = 0
    intecuartilmin = 0
    intecuartilpre = 0
    atipicoinfmax = 0
    atipicoinfmin = 0
    atipicoinfpre = 0
    atipicosupmax = 0
    atipicosupmin = 0
    atipicosuppre = 0
    extremoinfmax = 0
    extremoinfmin = 0
    extremoinfpre = 0
    extremosupmax = 0
    extremosupmin = 0
    extremosuppre = 0
    kstestmax = 0
    kstestmin = 0
    kstestpre = 0
    kstestpmax = 0
    kstestpmin = 0
    kstestppre = 0
    shapiromax = 0
    shapiromin = 0
    shapiropre = 0
    shapiropmax = 0
    shapiropmin = 0
    shapiroppre = 0
    kurtosismax = 0
    kurtosismin = 0
    kurtosispre = 0
    serie = MemSeriedetiempo.objects.filter(codigoestacion=codigoEstacion).order_by('fechaserie')
    estadisticas = MemEstadisticas.objects.filter(codigoestacion = codigoEstacion).select_related('codigoano')
    estaciones = MemEstacionmeteorologica.objects.filter(codigoestacion = codigoEstacion).select_related('codigoubicacion')
    estacionJson = {'codigo': codigoEstacion, 'ubicacion': estaciones[0].codigoubicacion.nombreubicacion, 'nombre': estaciones[0].nombreestacion,
    'fechaI': estaciones[0].fechainstalacion, 'fechaT': estaciones[0].fechatermino, 'long': estaciones[0].longitudestacion, 
    'lat': estaciones[0].latitudestacion, 'altura': estaciones[0].alturaestacion, 'cuenca': estaciones[0].cuenca, 'rio': estaciones[0].rio, 
    'medi': estaciones[0].medicionestacion, 'comentario': estaciones[0].comentario}
    for x in estadisticas:
        añosEs.append(x.codigoano.ano)
        if x.mediamax:
            medianamaxA.append(x.mediamax)
            mediamaxA.append(x.medianamax)
            desviacionesmaxA.append(x.desviacionesmax)
            varianzamaxA.append(x.varianzamax)
            mediamax += x.mediamax
            modamax += x.modamax
            medianamax += x.medianamax
            desviacionesmax += x.desviacionesmax
            varianzamax += x.varianzamax
            cuartil1max += x.cuartil1max
            cuartil3max += x.cuartil3max
            intecuartilmax += x.intecuartilmax
            atipicoinfmax += x.atipicoinfmax
            atipicosupmax += x.atipicosupmax
            extremoinfmax += x.extremoinfmax
            extremosupmax += x.extremosupmax
            kstestmax += x.kstestmax
            kstestpmax += x.kstestpmax
            shapiromax += x.shapiromax
            shapiropmax += x.shapiropmax
            kurtosismax += x.kurtosismax
        if x.medianamax and x.medianamin:
            mediaproA.append((x.mediamax+x.mediamin)/2)
            medianaproA.append((x.medianamax+x.medianamin)/2)
            desviacionesproA.append((x.desviacionesmax+x.desviacionesmin)/2)
            varianzaproA.append((x.varianzamax+x.varianzamin)/2)
        if x.mediamin:
            mediaminA.append(x.mediamin)
            medianaminA.append(x.medianamin)
            desviacionesminA.append(x.desviacionesmin)
            varianzaminA.append(x.varianzamin)
            mediamin += x.mediamin
            medianamin += x.medianamin
            modamin += x.modamin
            desviacionesmin += x.desviacionesmin
            varianzamin += x.varianzamin
            cuartil1min += x.cuartil1min
            cuartil3min += x.cuartil3min
            intecuartilmin += x.intecuartilmin
            atipicoinfmin += x.atipicoinfmin
            atipicosupmin += x.atipicosupmin
            extremoinfmin += x.extremoinfmin
            extremosupmin += x.extremosupmin
            kstestmin += x.kstestmin
            kstestpmin += x.kstestpmin
            shapiromin += x.shapiromin
            shapiropmin += x.shapiropmin
            kurtosismin += x.kurtosismin
        if x.mediapre:
            mediapreA.append(x.mediapre)
            medianapreA.append(x.medianapre)
            desviacionespreA.append(x.desviacionespre)
            varianzapreA.append(x.varianzapre)
            mediapre += x.mediapre
            medianapre += x.medianapre
            modapre += x.modapre 
            desviacionespre += x.desviacionespre
            varianzapre += x.varianzapre
            cuartil1pre += x.cuartil1pre
            cuartil3pre += x.cuartil3pre
            intecuartilpre += x.intecuartilpre
            atipicoinfpre += x.atipicoinfpre
            atipicosuppre += x.atipicosuppre
            extremoinfpre += x.extremoinfpre
            extremosuppre += x.extremosuppre
            kstestpre += x.kstestpre
            kstestppre += x.kstestppre
            shapiropre += x.shapiropre
            shapiroppre += x.shapiroppre
            kurtosispre += x.kurtosispre
        val1max =  None
        val2max= None
        val3max= None
        val4max= None
        val1min =  None
        val2min= None
        val3min= None
        val4min= None
        val1pre =  None
        val2pre= None
        val3pre= None
        val4pre= None

        if x.cuartil1max:
            val1max =  float(x.cuartil1max)-1.5 * float(x.intecuartilmax)
            val2max= float(x.cuartil3max)+1.5* float(x.intecuartilmax)
            val3max= float(x.cuartil1max)-3 * float(x.intecuartilmax)
            val4max= float(x.cuartil3max)+3* float(x.intecuartilmax)
        if x.cuartil1min:
            val1min =  float(x.cuartil1min)-1.5 * float(x.intecuartilmin)
            val2min= float(x.cuartil3min)+1.5* float(x.intecuartilmin)
            val3min= float(x.cuartil1min)-3 * float(x.intecuartilmin)
            val4min= float(x.cuartil3min)+3* float(x.intecuartilmin)
        if x.cuartil1pre:
            val1pre =  float(x.cuartil1pre)-1.5 * float(x.intecuartilpre)
            val2pre= float(x.cuartil3pre)+1.5* float(x.intecuartilpre)
            val3pre= float(x.cuartil1pre)-3 * float(x.intecuartilpre)
            val4pre= float(x.cuartil3pre)+3* float(x.intecuartilpre)
        estadisticasJson.append({'ano': x.codigoano.ano,'mediamax' : x.mediamax, 'mediamin' : x.mediamin, 
        'mediapre' : x.mediapre, 'medianamax' : x.medianamax, 'medianamin' : x.medianamin, 
        'medianapre' : x.medianapre, 'modamax' : x.modamax, 'modamin' : x.modamin, 'modapre' : x.modapre, 
        'desviacionesmax' : x.desviacionesmax, 'desviacionesmin' : x.desviacionesmin, 
        'desviacionespre' : x.desviacionespre, 'varianzamax' : x.varianzamax, 
        'varianzamin' : x.varianzamin, 'varianzapre' : x.varianzapre, 'q1max': x.cuartil1max, 
        'val1max': val1max,'q1min': x.cuartil1min,
        'val1min': val1min,
        'q1pre': x.cuartil1pre, 
        'val1pre': val1pre,
        'q3max': x.cuartil3max, 
        'val2max': val2max,
        'val3max': val3max,
        'val4max': val4max,
        'q3min': x.cuartil3min, 
        'val2min': val2min,
        'val3min': val3min,
        'val4min': val4min,
        'q3pre': x.cuartil3pre, 
        'val2pre': val2pre,
        'val3pre': val3pre,
        'val4pre': val4pre,
        'iqrmax': x.intecuartilmax, 
        'iqrmin': x.intecuartilmin, 'iqrpre': x.intecuartilpre, 'atipicoinfmax': x.atipicoinfmax, 'atipicosupmax': x.atipicosupmax,
        'atipicoinfmin': x.atipicoinfmin, 'atipicosupmin': x.atipicosupmin, 'atipicoinfpre': x.atipicoinfpre, 
        'atipicosuppre': x.atipicosuppre, 'extremoinfmax': x.extremoinfmax, 'extremosupmax': x.extremosupmax,
        'extremoinfmin': x.extremoinfmin, 'extremosupmin': x.extremosupmin, 'extremoinfpre': x.extremoinfpre, 
        'extremosuppre': x.extremosuppre, 'kstestmax': x.kstestmax, 'kstestmin': x.kstestmin, 
        'kstestpre': x.kstestpre, 'kstestpmax': x.kstestpmax, 'kstestpmin': x.kstestpmin, 
        'kstestppre': x.kstestppre, 'shapiromax': x.shapiromax, 'shapiromin': x.shapiromin, 
        'shapiropre': x.shapiropre, 'shapiropmax': x.shapiropmax, 'shapiropmin': x.shapiropmin, 
        'shapiroppre': x.shapiroppre, 'kurtosismax': x.kurtosismax, 'kurtosismin': x.kurtosismin, 
        'kurtosispre': x.kurtosispre})
    estadisticasJson.sort(key=get_my_key)
    if len(estadisticas):
        estadisticasJson.insert(0,{'ano': 'todos','mediamax' : "{:.1f}".format(mediamax/len(estadisticas)), 
            'mediamin' : "{:.1f}".format(mediamin/len(estadisticas)), 
            'mediapre' : "{:.1f}".format(mediapre/len(estadisticas)), 
            'medianamax' : "{:.1f}".format(medianamax/len(estadisticas)), 
            'medianamin' : "{:.1f}".format(medianamin/len(estadisticas)), 
            'medianapre' : "{:.1f}".format(medianapre/len(estadisticas)), 
            'modamax' : "{:.1f}".format(modamax/len(estadisticas)), 
            'modamin' : "{:.1f}".format(modamin/len(estadisticas)), 
            'modapre' : "{:.1f}".format(modapre/len(estadisticas)), 
            'desviacionesmax' : "{:.1f}".format(desviacionesmax/len(estadisticas)), 
            'desviacionesmin' : "{:.1f}".format(desviacionesmin/len(estadisticas)), 
            'desviacionespre' : "{:.1f}".format(desviacionespre/len(estadisticas)), 
            'varianzamax' : "{:.1f}".format(varianzamax/len(estadisticas)), 
            'varianzamin' : "{:.1f}".format(varianzamin/len(estadisticas)), 
            'varianzapre' : "{:.1f}".format(varianzapre/len(estadisticas)), 
            'q1max': "{:.1f}".format(cuartil1max/len(estadisticas)),
            'val1max':  "{:.1f}".format(float(cuartil1max/len(estadisticas))-1.5 * float(intecuartilmax/len(estadisticas))),
            'q1min': "{:.1f}".format(cuartil1min/len(estadisticas)),
            'val1min':  "{:.1f}".format(float(cuartil1min/len(estadisticas))-1.5 * float(intecuartilmin/len(estadisticas))),
            'q1pre': "{:.1f}".format(cuartil1pre/len(estadisticas)), 
            'val1pre':  "{:.1f}".format(float(cuartil1pre/len(estadisticas))-1.5 * float(intecuartilpre/len(estadisticas))),
            'q3max': "{:.1f}".format(cuartil3max/len(estadisticas)), 
            'val2max':  "{:.1f}".format(float(cuartil3max/len(estadisticas))-1.5 * float(intecuartilmax/len(estadisticas))),
            'val3max':  "{:.1f}".format(float(cuartil1max/len(estadisticas))-3 * float(intecuartilmax/len(estadisticas))),
            'val4max':  "{:.1f}".format(float(cuartil3max/len(estadisticas))-3 * float(intecuartilmax/len(estadisticas))),
            'q3min': "{:.1f}".format(cuartil3min/len(estadisticas)),
            'val2min':  "{:.1f}".format(float(cuartil3min/len(estadisticas))-1.5 * float(intecuartilmin/len(estadisticas))),
            'val3min':  "{:.1f}".format(float(cuartil1min/len(estadisticas))-3 * float(intecuartilmin/len(estadisticas))),
            'val4min':  "{:.1f}".format(float(cuartil3min/len(estadisticas))-3 * float(intecuartilmin/len(estadisticas))), 
            'q3pre': "{:.1f}".format(cuartil3pre/len(estadisticas)), 
            'val2pre':  "{:.1f}".format(float(cuartil3pre/len(estadisticas))-1.5 * float(intecuartilpre/len(estadisticas))),
            'val3pre':  "{:.1f}".format(float(cuartil1pre/len(estadisticas))-3 * float(intecuartilpre/len(estadisticas))),
            'val4pre':  "{:.1f}".format(float(cuartil3pre/len(estadisticas))-3 * float(intecuartilpre/len(estadisticas))),
            'iqrmax': "{:.1f}".format(intecuartilmax/len(estadisticas)), 
            'iqrmin': "{:.1f}".format(intecuartilmin/len(estadisticas)), 
            'iqrpre': "{:.1f}".format(intecuartilpre/len(estadisticas)), 
            'atipicoinfmax': "{:.0f}".format(atipicoinfmax/len(estadisticas)), 
            'atipicosupmax': "{:.0f}".format(atipicosupmax/len(estadisticas)),
            'atipicoinfmin': "{:.0f}".format(atipicoinfmin/len(estadisticas)), 
            'atipicosupmin': "{:.0f}".format(atipicosupmin/len(estadisticas)), 
            'atipicoinfpre': "{:.0f}".format(atipicoinfpre/len(estadisticas)), 
            'atipicosuppre': "{:.0f}".format(atipicosuppre/len(estadisticas)), 
            'extremoinfmax': "{:.0f}".format(extremoinfmax/len(estadisticas)), 
            'extremosupmax': "{:.0f}".format(extremosupmax/len(estadisticas)),
            'extremoinfmin': "{:.0f}".format(extremoinfmin/len(estadisticas)), 
            'extremosupmin': "{:.0f}".format(extremosupmin/len(estadisticas)), 
            'extremoinfpre': "{:.0f}".format(extremoinfpre/len(estadisticas)), 
            'extremosuppre': "{:.0f}".format(extremosuppre/len(estadisticas)), 'kstestmax': "{:.1f}".format(kstestmax/len(estadisticas)), 
            'kstestmin': "{:.1f}".format(kstestmin/len(estadisticas)), 
            'kstestpre': "{:.1f}".format(kstestpre/len(estadisticas)), 'kstestpmax': "{:.1f}".format(kstestpmax/len(estadisticas)), 
            'kstestpmin': "{:.1f}".format(kstestpmin/len(estadisticas)), 
            'kstestppre': "{:.1f}".format(kstestppre/len(estadisticas)), 'shapiromax': "{:.1f}".format(shapiromax/len(estadisticas)), 
            'shapiromin': "{:.1f}".format(shapiromin/len(estadisticas)), 
            'shapiropre': "{:.1f}".format(shapiropre/len(estadisticas)), 'shapiropmax': "{:.1f}".format(shapiropmax/len(estadisticas)), 
            'shapiropmin': "{:.1f}".format(shapiropmin/len(estadisticas)), 
            'shapiroppre': "{:.1f}".format(shapiroppre/len(estadisticas)), 'kurtosismax': "{:.1f}".format(kurtosismax/len(estadisticas)), 
            'kurtosismin': "{:.1f}".format(kurtosismin/len(estadisticas)), 
            'kurtosispre': "{:.1f}".format(kurtosispre/len(estadisticas))})
    atipicosmaxA = []
    atipicosminA = []
    atipicospreA = []
    atipicosmedA = []
    for i in serie:
        años.append(i.fechaserie)
        temMax.append(i.temperaturamaxserie)
        temMin.append(i.temperaturaminserie)
        preci.append(i.precipitacionserie)
        temMed.append(i.temperaturamedserie)
        if i.temperaturamaxserie and 'val1max' in estadisticasJson[0]: 
            if (float(estadisticasJson[0]['val1max']) < float(i.temperaturamaxserie) and float(estadisticasJson[0]['val2max']) > float(i.temperaturamaxserie) 
            and float(estadisticasJson[0]['val3max']) < float(i.temperaturamaxserie) and float(estadisticasJson[0]['val2max']) > float(i.temperaturamaxserie)):
                atipicosmaxA.append(i.temperaturamaxserie)
        if i.temperaturaminserie and 'val1min' in estadisticasJson[0]:
            if (float(estadisticasJson[0]['val1min']) < float(i.temperaturaminserie) and float(estadisticasJson[0]['val2min']) > float(i.temperaturaminserie) 
            and float(estadisticasJson[0]['val3min']) < float(i.temperaturaminserie) and float(estadisticasJson[0]['val2min']) > float(i.temperaturaminserie)):
                atipicosminA.append(i.temperaturaminserie)
        if i.precipitacionserie and 'val1pre' in estadisticasJson[1]:
            if (float(estadisticasJson[1]['val1pre']) < float(i.precipitacionserie) and float(estadisticasJson[1]['val2pre']) > float(i.precipitacionserie) 
            and float(estadisticasJson[1]['val3pre']) < float(i.precipitacionserie) and float(estadisticasJson[1]['val2pre']) > float(i.precipitacionserie)):
                atipicospreA.append(i.precipitacionserie)
        if i.temperaturamedserie and 'val1max' in estadisticasJson[0] and 'val1min' in estadisticasJson[0]: 
            if ((float(estadisticasJson[0]['val1max'])+ float(estadisticasJson[0]['val1min']))/2 < float(i.temperaturamedserie) 
            and (float(estadisticasJson[0]['val2max']) + float(estadisticasJson[0]['val2min']))/2 > float(i.temperaturamedserie) 
            and (float(estadisticasJson[0]['val3max']) + float(estadisticasJson[0]['val3min']))/2 < float(i.temperaturamedserie) 
            and (float(estadisticasJson[0]['val2max']) + float(estadisticasJson[0]['val2min']))/2 > float(i.temperaturamedserie)):
                atipicosmedA.append(i.temperaturamedserie)
    return JsonResponse({'estadisticas': estadisticasJson, 'estacion': estacionJson, 'fechas': años, 'temMax': temMax, 'temMin':temMin,
    'preci': preci, 'temMed':temMed , 'añosEs': añosEs, 'medianamaxA': medianamaxA, 'mediamaxA': mediamaxA, 'desviacionesmaxA': desviacionesmaxA,
    'varianzamaxA': varianzamaxA, 'mediaminA': mediaminA, 'medianaminA': medianaminA, 'desviacionesminA': desviacionesminA,
    'varianzaminA': varianzaminA, 'mediaproA': mediaproA, 'medianaproA': medianaproA, 'desviacionesproA': desviacionesproA,
    'varianzaproA': varianzaproA, 'mediapreA': mediapreA, 'medianapreA': medianapreA, 'desviacionespreA': desviacionespreA,
    'varianzapreA': varianzapreA, 'atipicosmaxA': atipicosmaxA, 'atipicosminA':atipicosminA, 'atipicospreA': atipicospreA, 'atipicosmedA':atipicosmedA})

def get_my_key(obj):
  return obj['ano']

def tablaHecho(request, codigoEstacion):
    indicesJson = []
    años = []
    temMax = []
    temMin = []
    preci = []
    cdd = 0
    csdi = 0
    cwd = 0
    dtr = 0
    fd0 = 0
    gsl = 0
    gsl2 = 0
    id0 = 0
    prcptot = 0
    r10mm = 0
    r20mm = 0
    r95p = 0
    r99p = 0
    r50mm = 0
    rx1day = 0
    rx5day = 0
    sdii = 0
    su25 = 0
    tn10p = 0
    tn90p = 0
    tnn = 0
    txn = 0
    tr20 = 0
    tx10p = 0
    tx90p = 0
    tnx = 0
    txx = 0
    wsdi = 0
    temmax = 0
    temmin = 0
    premax = 0
    serie = MemSeriedetiempo.objects.filter(codigoestacion=codigoEstacion).order_by('fechaserie')
    for i in serie:
        años.append(i.fechaserie)
        temMax.append(i.temperaturamaxserie)
        temMin.append(i.temperaturaminserie)
        preci.append(i.precipitacionserie)
    indices = MemIndicesextremosclimaticos.objects.filter(codigoestacion = codigoEstacion).select_related('codigoano')
    estaciones = MemEstacionmeteorologica.objects.filter(codigoestacion = codigoEstacion).select_related('codigoubicacion')
    estacionJson = {'codigo': codigoEstacion, 'ubicacion': estaciones[0].codigoubicacion.nombreubicacion, 'nombre': estaciones[0].nombreestacion,
    'fechaI': estaciones[0].fechainstalacion, 'fechaT': estaciones[0].fechatermino, 'long': estaciones[0].longitudestacion, 
    'lat': estaciones[0].latitudestacion, 'altura': estaciones[0].alturaestacion, 'cuenca': estaciones[0].cuenca, 'rio': estaciones[0].rio, 
    'medi': estaciones[0].medicionestacion, 'comentario': estaciones[0].comentario}
    for x in indices:
        cdd += x.cdd
        csdi += x.csdi
        cwd += x.cwd
        dtr += x.dtr
        fd0 += x.fd0
        gsl += x.gsl
        gsl2 += x.gsl2
        id0 += x.id0
        prcptot += x.prcptot
        r10mm += x.r10mm
        r20mm += x.r20mm
        r95p += x.r95p
        r99p += x.r99p
        r50mm += x.r50mm
        rx1day += x.rx1day
        rx5day += x.rx5day
        sdii += x.sdii
        su25 += x.su25
        tn10p += x.tn10p
        tn90p += x.tn90p
        tnn += x.tnn
        txn += x.txn
        tr20 += x.tr20
        tx10p += x.tx10p
        tx90p += x.tx90p
        tnx += x.tnx
        txx += x.txx
        wsdi += x.wsdi
        temmax += x.temmax
        temmin += x.temmin
        premax += x.premax
        indicesJson.append({'ano': x.codigoano.ano,'cdd' : x.cdd, 'csdi' : x.csdi, 'cwd' : x.cwd, 
        'dtr' : x.dtr, 'fd0' : x.fd0, 'gsl' : x.gsl,
        'gsl2' : x.gsl2, 'id0' : x.id0, 'prcptot' : x.prcptot, 
        'r10mm' : x.r10mm, 'r20mm' : x.r20mm, 'r95p' : x.r95p,
        'r99p' : x.r99p, 'r50mm' : x.r50mm, 'rx1day' : x.rx1day, 'rx5day' : x.rx5day,
        'sdii' : x.sdii, 'su25' : x.su25,
        'tn10p' : x.tn10p, 'tn90p' : x.tn90p, 'tnn' : x.tnn, 'txn' : x.txn, 
        'tr20' : x.tr20, 'tx10p' : x.tx10p,
        'tx90p' : x.tx90p, 'tnx' : x.tnx, 'txx' : x.txx, 'wsdi' : x.wsdi, 'temmax': x.temmax, 'temmin': x.temmin, 'premax': x.premax})
    indicesJson.sort(key=get_my_key)
    indicesJson.insert(0,{'ano': "todos",'cdd' : "{:.1f}".format(cdd/len(indices)), 'csdi' : "{:.1f}".format(csdi/len(indices)), 
    'cwd' : "{:.1f}".format(cwd/len(indices)), 
        'dtr' : "{:.1f}".format(dtr/len(indices)), 'fd0' : "{:.1f}".format(fd0/len(indices)), 
        'gsl' : "{:.1f}".format(gsl/len(indices)),
        'gsl2' : "{:.1f}".format(gsl2/len(indices)), 'id0' : "{:.1f}".format(id0/len(indices)), 
        'prcptot' : "{:.1f}".format(prcptot/len(indices)), 
        'r10mm' : "{:.1f}".format(r10mm/len(indices)), 'r20mm' : "{:.1f}".format(r20mm/len(indices)), 
        'r95p' : "{:.1f}".format(r95p/len(indices)),
        'r99p' : "{:.1f}".format(r99p/len(indices)), 'r50mm' : "{:.1f}".format(r50mm/len(indices)), 
        'rx1day' : "{:.1f}".format(rx1day/len(indices)), 'rx5day' : "{:.1f}".format(rx5day/len(indices)),
        'sdii' : "{:.1f}".format(sdii/len(indices)), 'su25' : "{:.1f}".format(su25/len(indices)),
        'tn10p' : "{:.1f}".format(tn10p/len(indices)), 'tn90p' : "{:.1f}".format(tn90p/len(indices)), 
        'tnn' : "{:.1f}".format(tnn/len(indices)), 'txn' : "{:.1f}".format(txn/len(indices)), 
        'tr20' : "{:.1f}".format(tr20/len(indices)), 'tx10p' : "{:.1f}".format(tx10p/len(indices)),
        'tx90p' : "{:.1f}".format(tx90p/len(indices)), 'tnx' : "{:.1f}".format(tnx/len(indices)), 
        'txx' : "{:.1f}".format(txx/len(indices)), 'wsdi' : "{:.1f}".format(wsdi/len(indices)), 
        'temmax': "{:.1f}".format(temmax/len(indices)), 'temmin': "{:.1f}".format(temmin/len(indices)), 
        'premax': "{:.1f}".format(premax/len(indices))})
    return JsonResponse({'indices':indicesJson, 'estacion': estacionJson, 'fechas': años, 'temMax': temMax, 'temMin':temMin,
    'preci': preci})

def crearEstacion(request):
    if request.method == 'POST':
        estacionForm = MemEstacionForm(request.POST)
        if estacionForm.is_valid():
            estacionForm.save()
            return redirect('estacion:estacion')
    else:
        estacionForm = MemEstacionForm()
        return render (request, 'memoria/estacion/modal.html', {'estacionForm':estacionForm})

def takeFecha(elem):
    return elem[2]

def importarEstacion(request, codigoEstacion):
   if request.method == 'POST':  
     serie_resource = SerieTiempoResource()  
     dataset = Dataset()
     fechaInicio= request.POST['fecha1']
     fechaFin= request.POST['fecha2']
     nuevas_anos = request.FILES['xlsfile']
     imported_data = dataset.load(nuevas_anos.read())
     result = serie_resource.import_data(dataset, dry_run=True) # Test the data import
     if not result.has_errors():
        if request.POST['horario'] == "horas":
            print("holi")
        else:
            separar_anos= []
            temperaturaMaxEs = []
            temperaturaMinEs = []
            precipitacionEs = []
            años = []
            preciPercentiles = []
            temMaxPercentiles = []
            temMinPercentiles = []
            contador = 0
            fecha_año = str(imported_data['fechaserie'][0]).split('-')
            año_cambio= fecha_año[0]
            años.append(fecha_año[0])
            for i in imported_data:
                año_for = str(i[2]).split('-')  
                if(año_for[0] != año_cambio):
                    años.append(año_for[0])
                    año_cambio = año_for[0]
            largoAños = 0
            for j in años:
                separar_anos.append([])
                temperaturaMaxEs.append([])
                temperaturaMinEs.append([])
                precipitacionEs.append([])
                for k in imported_data:
                    año_for_k = str(k[2]).split('-')
                    if(j == año_for_k[0]):
                        separar_anos[largoAños].append(k)
                        if k[5]:
                            precipitacionEs[largoAños].append(k[5])
                        if k[3]:
                            temperaturaMaxEs[largoAños].append(k[3])
                        if k[4]:
                            temperaturaMinEs[largoAños].append(k[4])    
                        if(int(j) > int(fechaInicio) and int(j) < int(fechaFin)):
                            if k[5]:
                                preciPercentiles.append(k[5])
                            if k[3]:
                                temMaxPercentiles.append(k[3])
                            if k[4]:
                                temMinPercentiles.append(k[4])
                largoAños +=1
            contAños = 0
            if len(preciPercentiles):
                percentil_95 = funcion_percentil_95(preciPercentiles, 0.95)
                percentil_99 = funcion_percentil_95(preciPercentiles, 0.99)
            if len(temMinPercentiles):
                percentil_10 = funcion_percentil(temMinPercentiles, 0.1)
                percentil_90 = funcion_percentil(temMinPercentiles, 0.9)
            if len(preciPercentiles) and len(temMaxPercentiles) and len(temMinPercentiles):
                percentil_10TemMAX = funcion_percentil(temMaxPercentiles, 0.1)
                percentil_90TemMax = funcion_percentil(temMaxPercentiles, 0.9)
            for z in separar_anos:
                largo = len(z)
                mediaMax = None
                medianaMax = None
                modaMax = None
                kurtosisMax = None
                desviacionEsMax = None
                kstestMax, kstestPMax = None, None
                shapiroMax, shapiroPMax = None, None
                varianzaMax = None
                q1max = None
                q3max = None
                iqrmax = None 
                atipicoInfMax = None
                atipicoSupMax = None
                extremoInfMax = None
                extremoSupMax = None
                temMax = None
                if temperaturaMaxEs[contAños]:
                    mediaMax = np.mean(temperaturaMaxEs[contAños])
                    medianaMax = np.median(temperaturaMaxEs[contAños])
                    modaMax = stats.mode(temperaturaMaxEs[contAños])
                    kurtosisMax = stats.kurtosis(temperaturaMaxEs[contAños])
                    desviacionEsMax = np.std(temperaturaMaxEs[contAños])
                    kstestMax, kstestPMax = stats.kstest(temperaturaMaxEs[contAños], cdf='norm',
                    args=(mediaMax, desviacionEsMax), N=largo)
                    shapiroMax, shapiroPMax = stats.shapiro(temperaturaMaxEs[contAños])
                    varianzaMax = np.var(temperaturaMaxEs[contAños])
                    q1max = funcion_percentil(temperaturaMaxEs[contAños], 0.25)
                    q3max = funcion_percentil(temperaturaMaxEs[contAños], 0.75)
                    iqrmax = q3max - q1max 
                    atipicoInfMax = atipicoInferior(q1max-1.5*iqrmax, temperaturaMaxEs[contAños])
                    atipicoSupMax = atipicoSuperior(q3max+1.5*iqrmax, temperaturaMaxEs[contAños])
                    extremoInfMax = atipicoInferior(q1max-3*iqrmax, temperaturaMaxEs[contAños])
                    extremoSupMax = atipicoSuperior(q3max+3*iqrmax, temperaturaMaxEs[contAños])
                    temMax = temMaxima(temperaturaMaxEs[contAños])
                mediaMin = None
                medianaMin = None
                modaMin = None
                kurtosisMin = None
                desviacionEsMin = None
                kstestMin, kstestPMin = None, None
                shapiroMin, shapiroPMin = None, None
                varianzaMin = None
                q1min = None
                q3min = None
                iqrmin = None
                atipicoInfMin = None
                atipicoSupMin = None
                extremoInfMin = None
                extremoSupMin = None
                temMin = None
                if temperaturaMinEs[contAños]:
                    mediaMin = np.mean(temperaturaMinEs[contAños])
                    medianaMin = np.median(temperaturaMinEs[contAños])
                    modaMin = stats.mode(temperaturaMinEs[contAños])
                    kurtosisMin = stats.kurtosis(temperaturaMinEs[contAños])
                    desviacionEsMin = np.std(temperaturaMinEs[contAños])
                    kstestMin, kstestPMin = stats.kstest(temperaturaMinEs[contAños], cdf='norm',
                    args=(medianaMin, desviacionEsMin), N=largo)
                    shapiroMin, shapiroPMin = stats.shapiro(temperaturaMinEs[contAños])
                    varianzaMin = np.var(temperaturaMinEs[contAños])
                    q1min = funcion_percentil(temperaturaMinEs[contAños], 0.25)
                    q3min = funcion_percentil(temperaturaMinEs[contAños], 0.75)
                    iqrmin = q3min - q1min
                    atipicoInfMin = atipicoInferior(q1min-1.5*iqrmin, temperaturaMinEs[contAños])
                    atipicoSupMin = atipicoSuperior(q3min+1.5*iqrmin, temperaturaMinEs[contAños])
                    extremoInfMin = atipicoInferior(q1min-3*iqrmin, temperaturaMinEs[contAños])
                    extremoSupMin = atipicoSuperior(q3min+3*iqrmin, temperaturaMinEs[contAños])
                    temMin = temMinima(temperaturaMaxEs[contAños])
                mediaPre = None
                medianaPre = None
                modaPre = None
                kurtosisPre = None
                desviacionEsPre = None
                kstestPre, kstestPPre = None, None
                shapiroPre, shapiroPPre = None, None
                varianzaPre = None
                q1pre = None
                q3pre = None
                iqrpre = None
                atipicoInfPre = None
                atipicoSupPre = None
                extremoInfPre = None
                extremoSupPre = None
                preMax = None
                if precipitacionEs[contAños]:
                    mediaPre = np.mean(precipitacionEs[contAños])
                    medianaPre = np.median(precipitacionEs[contAños])
                    modaPre = stats.mode(precipitacionEs[contAños])
                    kurtosisPre = stats.kurtosis(precipitacionEs[contAños])
                    desviacionEsPre = np.std(precipitacionEs[contAños])
                    kstestPre, kstestPPre = stats.kstest(precipitacionEs[contAños], cdf='norm',
                    args=(mediaPre, medianaPre), N=largo)
                    shapiroPre, shapiroPPre = stats.shapiro(precipitacionEs[contAños])
                    varianzaPre = np.var(precipitacionEs[contAños])
                    q1pre = funcion_percentil(precipitacionEs[contAños], 0.25)
                    q3pre = funcion_percentil(precipitacionEs[contAños], 0.75)
                    iqrpre = q3pre - q1pre
                    atipicoInfPre = atipicoInferior(q1pre-1.5*iqrpre, precipitacionEs[contAños])
                    atipicoSupPre = atipicoSuperior(q3pre+1.5*iqrpre, precipitacionEs[contAños])
                    extremoInfPre = atipicoInferior(q1pre-3*iqrpre, precipitacionEs[contAños])
                    extremoSupPre = atipicoSuperior(q3pre+3*iqrpre, precipitacionEs[contAños])
                    preMax = temMaxima(precipitacionEs[contAños])
                if temperaturaMaxEs[contAños] and temperaturaMinEs[contAños] and precipitacionEs[contAños]:
                    cddCount = [0, 0]; csdiCount = [0, 0]; cwdCount= [0, 0]; fd0 = 0; id0 = 0; prcptot = 0; 
                    r10mm= 0; r20mm = 0; r95p = 0; r99p = 0; r50mm = 0
                    sdiiCount = [0,0]; su25 = 0; tn10p = 0; tn90p = 0; tx10p = 0; tx90p = 0; wsdi = [0,0]
                    glsCount = [0,0]; glsCount1 = [0,0]; tr20Count = [0,0]; rx5day = 0
                    temperaturasMaxMin = [0,0]
                    rx1day = funcion_rx1day(z, largo)
                    rx5day = funcion_rx5day(z, rx5day)
                    tnn = funcion_tnn(z)
                    txn = funcion_txn(z)
                    tnx = funcion_tnx(z)
                    txx = funcion_txx(z)
                    z.sort(key = takeFecha)
                contAños += 1
                ciclo = 0
                for x in z:
                    ciclo += 1
                    MemSeriedetiempo.objects.filter(codigoestacion=codigoEstacion).filter(fechaserie=x[2]).delete()
                    serieTiempo = MemSeriedetiempo(codigoestacion = MemEstacionmeteorologica.objects.get(codigoestacion = codigoEstacion), 
                    fechaserie = x[2], temperaturamaxserie = x[3], temperaturaminserie = x[4], precipitacionserie = x[5], 
                    temperaturamedserie = x[6])
                    serieTiempo.save()
                    auxBool = False
                    fecha_mes = str(x[2]).split('-')
                    if x[3] and x[4] and x[5]:
                        auxBool = True
                        cddCount = funcion_cdd(x[5], largo, cddCount, ciclo)
                        csdiCount = funcion_csdi(x[4], largo, csdiCount, ciclo, percentil_10)
                        cwdCount = funcion_cwd(x[5], largo, cwdCount, ciclo)
                        temperaturasMaxMin = funcion_dtr(temperaturasMaxMin, x[3], x[4])
                        fd0 = funcion_fd0(x[4], fd0)
                        temMedia = (x[4]+x[3])/2
                        glsCount = funcion_gls(temMedia, largo, glsCount, ciclo)
                        if(int(fecha_mes[1]) > 6):
                            glsCount1 = funcion_gls1(temMedia, largo, glsCount1, ciclo)
                        id0 = funcion_id0(x[3], id0)
                        prcptot = funcion_prcptot(x[5], prcptot)
                        r10mm = funcion_r10mm(x[5], r10mm)
                        r20mm = funcion_r20mm(x[5], r20mm)
                        r95p = funcion_r95p(x[5], r95p, percentil_95)
                        r99p = funcion_r99p(x[5], r99p, percentil_99)
                        r50mm = funcion_r50mm(x[5], r50mm)
                        sdiiCount = funcion_sdii(x[5], sdiiCount)
                        su25 = funcion_su25(x[3], su25)
                        tn10p = funcion_tn10p(percentil_10, x[4], ciclo, largo, tn10p)
                        tn90p = funcion_tn90p(percentil_90, x[4], ciclo, largo, tn90p)
                        tr20Count = funcion_tr20(x[4], largo, tr20Count, ciclo)
                        tx10p = funcion_tx10p(percentil_10TemMAX, x[3], ciclo, largo, tx10p)
                        tx90p = funcion_tx90p(percentil_90TemMax, x[3], ciclo, largo, tx90p)
                        wsdi = funcion_wsdi(percentil_90TemMax, x[3], wsdi)
                    año = anos_meses(fecha_mes)
                    contador += 1
                if auxBool:
                    dtr = (temperaturasMaxMin[0] - temperaturasMaxMin[1])/largo
                    if(sdiiCount[0] != 0):
                        sdii = sdiiCount[1]/sdiiCount[0]
                    else:
                        sdii = sdiiCount[1]
                    MemIndicesextremosclimaticos.objects.filter(codigoano=año).filter(codigoestacion=codigoEstacion).delete()
                    MemEstadisticas.objects.filter(codigoano=año).filter(codigoestacion=codigoEstacion).delete()
                    indices = MemIndicesextremosclimaticos(codigoano = MemAno.objects.get(codigoano=año),
                    codigoestacion = MemEstacionmeteorologica.objects.get(codigoestacion=codigoEstacion),
                    cdd = cddCount[1], csdi = csdiCount[1], cwd = cwdCount[1], dtr = dtr, fd0 = fd0, gsl = glsCount[1],
                    gsl2 = glsCount1[1], id0 = id0, prcptot = prcptot, r10mm = r10mm, r20mm = r20mm, r95p = r95p,
                    r99p = r99p, r50mm = r50mm, rx1day = rx1day, rx5day = rx5day, sdii = sdii, su25 = su25,
                    tn10p = tn10p, tn90p = tn90p, tnn = tnn, txn = txn, tr20 = tr20Count[0], tx10p = tx10p,
                    tx90p = tx90p, tnx = tnx, txx = txx, wsdi = wsdi[1], temmax = temMax, temmin = temMin, premax = preMax)
                    indices.save()
                if modaMax:
                    modaMax = modaMax.mode[0]
                if modaMin:
                    modaMin = modaMin.mode[0]
                if modaPre:
                    modaPre = modaPre.mode[0]
                estadisticas = MemEstadisticas(codigoano = MemAno.objects.get(codigoano=año),
                    codigoestacion = MemEstacionmeteorologica.objects.get(codigoestacion=codigoEstacion), mediamax = mediaMax,
                    mediamin = mediaMin, mediapre = mediaPre, medianamax = medianaMax, medianamin = medianaMin, 
                    medianapre = medianaPre, modamax = modaMax, modamin = modaMin, modapre = modaPre, 
                    desviacionesmax = desviacionEsMax, desviacionesmin = desviacionEsMin, desviacionespre = desviacionEsPre,
                    varianzamax = varianzaMax, varianzamin = varianzaMin, varianzapre = varianzaPre, cuartil1max = q1max, cuartil1min = q1min,
                    cuartil1pre = q1pre, cuartil3max = q3max, cuartil3min = q3min, cuartil3pre = q3pre, intecuartilmax = iqrmax, intecuartilmin = iqrmin, 
                    intecuartilpre = iqrpre, atipicoinfmax = atipicoInfMax, atipicoinfmin = atipicoInfMin, atipicoinfpre = atipicoInfPre,
                    atipicosupmax = atipicoSupMax, atipicosupmin= atipicoSupMin, atipicosuppre= atipicoSupPre, extremoinfmax = extremoInfMax, 
                    extremoinfmin = extremoInfMin, extremoinfpre = extremoInfPre, extremosupmax = extremoSupMax, extremosupmin= extremoSupMin, 
                    extremosuppre= extremoSupPre, kstestmax= kstestMax, kstestpmax= kstestPMax, kstestmin=kstestMin, 
                    kstestpmin = kstestPMin, kstestpre= kstestPre, kstestppre= kstestPPre, shapiromax= shapiroMax,
                    shapiropmax= shapiroPMax, shapiromin= shapiroMin, shapiropmin= shapiroPMin, shapiropre= shapiroPre, 
                    shapiroppre= shapiroPPre, kurtosismax= kurtosisMax, kurtosismin= kurtosisMin, kurtosispre= kurtosisPre)
                estadisticas.save()
            return redirect ('estacion:estacion')
   return render(request, 'memoria/estacion/importar.html', {'codigoEstacion':codigoEstacion})


   