from django.shortcuts import render, redirect
from django.http import JsonResponse
from tablib import Dataset
from .resources import SerieTiempoResource
from .indicadores import *
from apps.memoria.models import MemEstacionmeteorologica, MemSeriedetiempo, MemAno, MemMes, MemIndicesextremosclimaticos, MemEstadisticas
from .forms import MemEstacionForm
import tablib
from import_export import resources  
from django.db.models import Q
import numpy as np
from scipy import stats


# Create your views here.

def estacion(request):
    estaciones = MemEstacionmeteorologica.objects.filter(estadoestacion = True).select_related('codigoubicacion')
    return render(request, 'memoria/estacion/index.html', {'estaciones':estaciones})

def estacionJson(request):
    json = []
    estaciones = MemEstacionmeteorologica.objects.filter(estadoestacion = True).select_related('rutusuario')
    for x in estaciones:
        json.append({'codigo': x.codigoestacion, 'nombre' : x.nombreestacion, 'propietario': x.rutusuario.nombreusuario})

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
    serie = MemSeriedetiempo.objects.filter(codigoestacion=codigoEstacion)
    for i in serie:
        años.append(i.fechaserie)
        temMax.append(i.temperaturamaxserie)
        temMin.append(i.temperaturaminserie)
        preci.append(i.precipitacionserie)
    estadisticas = MemEstadisticas.objects.filter(codigoestacion = codigoEstacion).select_related('codigoano')
    estaciones = MemEstacionmeteorologica.objects.filter(codigoestacion = codigoEstacion).select_related('codigoubicacion')
    estacionJson = {'codigo': codigoEstacion, 'ubicacion': estaciones[0].codigoubicacion.nombreubicacion, 'nombre': estaciones[0].nombreestacion,
    'fechaI': estaciones[0].fechainstalacion, 'fechaT': estaciones[0].fechatermino, 'long': estaciones[0].longitudestacion, 
    'lat': estaciones[0].latitudestacion, 'altura': estaciones[0].alturaestacion, 'cuenca': estaciones[0].cuenca, 'rio': estaciones[0].rio, 
    'medi': estaciones[0].medicionestacion, 'comentario': estaciones[0].comentario}
    for x in estadisticas:
        estadisticasJson.append({'ano': x.codigoano.ano,'mediamax' : x.mediamax, 'mediamin' : x.mediamin, 
        'mediapre' : x.mediapre, 'medianamax' : x.medianamax, 'medianamin' : x.medianamin, 
        'medianapre' : x.medianapre, 'modamax' : x.modamax, 'modamin' : x.modamin, 'modapre' : x.modapre, 
        'desviacionesmax' : x.desviacionesmax, 'desviacionesmin' : x.desviacionesmin, 
        'desviacionespre' : x.desviacionespre, 'varianzamax' : x.varianzamax, 
        'varianzamin' : x.varianzamin, 'varianzapre' : x.varianzapre})
    estadisticasJson.sort(key=get_my_key)
    return JsonResponse({'estadisticas': estadisticasJson, 'estacion': estacionJson, 'fechas': años, 'temMax': temMax, 'temMin':temMin,
    'preci': preci})

def get_my_key(obj):
  return obj['ano']

def tablaHecho(request, codigoEstacion):
    indicesJson = []
    años = []
    temMax = []
    temMin = []
    preci = []
    serie = MemSeriedetiempo.objects.filter(codigoestacion=codigoEstacion)
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
        indicesJson.append({'ano': x.codigoano.ano,'cdd' : x.cdd, 'csdi' : x.csdi, 'cwd' : x.cwd, 
        'dtr' : x.dtr, 'fd0' : x.fd0, 'gsl' : x.gsl,
        'gsl2' : x.gsl2, 'id0' : x.id0, 'prcptot' : x.prcptot, 
        'r10mm' : x.r10mm, 'r20mm' : x.r20mm, 'r95p' : x.r95p,
        'r99p' : x.r99p, 'r50mm' : x.r50mm, 'rx1day' : x.rx1day, 'rx5day' : x.rx5day,
        'sdii' : x.sdii, 'su25' : x.su25,
        'tn10p' : x.tn10p, 'tn90p' : x.tn90p, 'tnn' : x.tnn, 'txn' : x.txn, 
        'tr20' : x.tr20, 'tx10p' : x.tx10p,
        'tx90p' : x.tx90p, 'tnx' : x.tnx, 'txx' : x.txx, 'wsdi' : x.wsdi})
    indicesJson.sort(key=get_my_key)
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
        separar_anos= []
        temperaturaMaxEs = []
        temperaturaMinEs = []
        precipitacionEs = []
        años = []
        preciPercentiles = []
        temMaxPercentiles = []
        temMinPercentiles = []
        contador = 0
        fecha_año = imported_data['fechaserie'][0].split('-')
        año_cambio= fecha_año[0]
        años.append(fecha_año[0])
        for i in imported_data:
            año_for = i[2].split('-')  
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
                año_for_k = k[2].split('-')
                if(j == año_for_k[0]):
                    separar_anos[largoAños].append(k)
                    temperaturaMaxEs[largoAños].append(k[3])
                    temperaturaMinEs[largoAños].append(k[4])
                    precipitacionEs[largoAños].append(k[5])
                    if(int(j) > int(fechaInicio) and int(j) < int(fechaFin)):
                        preciPercentiles.append(k[5])
                        temMaxPercentiles.append(k[3])
                        temMinPercentiles.append(k[4])
            largoAños +=1
        contAños = 0
        percentil_10 = funcion_percentil(temMinPercentiles, 0.1)
        percentil_10TemMAX = funcion_percentil(temMaxPercentiles, 0.1)
        percentil_90 = funcion_percentil(temMinPercentiles, 0.9)
        percentil_90TemMax = funcion_percentil(temMaxPercentiles, 0.9)
        percentil_95 = funcion_percentil_95(preciPercentiles, 0.95)
        percentil_99 = funcion_percentil_95(preciPercentiles, 0.99)
        for z in separar_anos:
            mediaMax = np.mean(temperaturaMaxEs[contAños])
            mediaMin = np.mean(temperaturaMinEs[contAños])
            mediaPre = np.mean(precipitacionEs[contAños])
            medianaMax = np.median(temperaturaMaxEs[contAños])
            medianaMin = np.median(temperaturaMinEs[contAños])
            medianaPre = np.median(precipitacionEs[contAños])
            modaMax = stats.mode(temperaturaMaxEs[contAños])
            modaMin = stats.mode(temperaturaMinEs[contAños])
            modaPre = stats.mode(precipitacionEs[contAños])
            desviacionEsMax = np.std(temperaturaMaxEs[contAños])
            desviacionEsMin = np.std(temperaturaMinEs[contAños])
            desviacionEsPre = np.std(precipitacionEs[contAños])
            varianzaMax = np.var(temperaturaMaxEs[contAños])
            varianzaMin = np.var(temperaturaMinEs[contAños])
            varianzaPre = np.var(precipitacionEs[contAños])
            contAños += 1
            cddCount = [0, 0]; csdiCount = [0, 0]; cwdCount= [0, 0]; fd0 = 0; id0 = 0; prcptot = 0; 
            r10mm= 0; r20mm = 0; r95p = 0; r99p = 0; r50mm = 0
            sdiiCount = [0,0]; su25 = 0; tn10p = 0; tn90p = 0; tx10p = 0; tx90p = 0; wsdi = [0,0]
            glsCount = [0,0]; glsCount1 = [0,0]; tr20Count = [0,0]; rx5day = 0
            temperaturasMaxMin = [0,0]
            ciclo = 0; largo = len(z)
            rx1day = funcion_rx1day(z, largo)
            rx5day = funcion_rx5day(z, rx5day)
            tnn = funcion_tnn(z)
            txn = funcion_txn(z)
            tnx = funcion_tnx(z)
            txx = funcion_txx(z)
            z.sort(key = takeFecha)
            for x in z:
                ciclo += 1
                cddCount = funcion_cdd(x[5], largo, cddCount, ciclo)
                csdiCount = funcion_csdi(x[4], largo, csdiCount, ciclo, percentil_10)
                cwdCount = funcion_cwd(x[5], largo, cwdCount, ciclo)
                temperaturasMaxMin = funcion_dtr(temperaturasMaxMin, x[3], x[4])
                fd0 = funcion_fd0(x[4], fd0)
                fecha_mes = x[2].split('-')
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
                MemSeriedetiempo.objects.filter(codigoestacion=codigoEstacion).filter(fechaserie=x[2]).delete()
                serieTiempo = MemSeriedetiempo(codigoestacion = MemEstacionmeteorologica.objects.get(codigoestacion = codigoEstacion), 
                fechaserie = x[2], temperaturamaxserie = x[3], temperaturaminserie = x[4], precipitacionserie = x[5])
                serieTiempo.save()
                contador += 1
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
            tx90p = tx90p, tnx = tnx, txx = txx, wsdi = wsdi[1])
            indices.save()
            estadisticas = MemEstadisticas(codigoano = MemAno.objects.get(codigoano=año),
            codigoestacion = MemEstacionmeteorologica.objects.get(codigoestacion=codigoEstacion), mediamax = mediaMax,
            mediamin = mediaMin, mediapre = mediaPre, medianamax = medianaMax, medianamin = medianaMin, 
            medianapre = medianaPre, modamax = modaMax.mode[0], modamin = modaMin.mode[0], modapre = modaPre.mode[0], 
            desviacionesmax = desviacionEsMax, desviacionesmin = desviacionEsMin, desviacionespre = desviacionEsPre,
            varianzamax = varianzaMax, varianzamin = varianzaMin, varianzapre = varianzaPre)
            estadisticas.save()
        return redirect ('estacion:estacion')
   return render(request, 'memoria/estacion/importar.html', {'codigoEstacion':codigoEstacion})


   