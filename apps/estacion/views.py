from django.shortcuts import render, redirect
from django.http import JsonResponse
from tablib import Dataset
from .resources import SerieTiempoResource
from .indicadores import *
from apps.memoria.models import MemEstacionmeteorologica, MemSeriedetiempo, MemAno, MemMes, MemIndicesextremosclimaticos
from .forms import MemEstacionForm
import tablib
from import_export import resources  
from django.db.models import Q


# Create your views here.

def estacion(request):
    estaciones = MemEstacionmeteorologica.objects.filter(estadoestacion = True).select_related('codigoubicacion')
    return render(request, 'memoria/estacion/index.html', {'estaciones':estaciones})

def crearEstacion(request):
    if request.method == 'POST':
        estacionForm = MemEstacionForm(request.POST)
        if estacionForm.is_valid():
            estacionForm.save()
            return redirect('estacion:estacion')
    else:
        estacionForm = MemEstacionForm()
        return render (request, 'memoria/estacion/modal.html', {'estacionForm':estacionForm})

def importarEstacion(request, codigoEstacion):
   if request.method == 'POST':  
     serie_resource = SerieTiempoResource()  
     dataset = Dataset()
     nuevas_anos = request.FILES['xlsfile'] 
     imported_data = dataset.load(nuevas_anos.read())
     contador = 0; ciclo = 0; largo = len(imported_data)
     cddCount = [0, 0]; csdiCount = [0, 0]; cwdCount= [0, 0]; fd0 = 0; id0 = 0; prcptot = 0; 
     r10mm= 0; r20mm = 0; r95p = 0; r99p = 0; r50mm = 0
     sdiiCount = [0,0]; su25 = 0; tn10p = 0; tn90p = 0; tx10p = 0; tx90p = 0; wsdi = [0,0]
     glsCount = [0,0]; glsCount1 = [0,0]; tr20Count = [0,0]; rx5day = 0
     temperaturasMaxMin = [0,0]
     percentil_10 = funcion_percentil(imported_data, 0.1, 'temperaturaminserie')
     percentil_10TemMAX = funcion_percentil(imported_data, 0.1, 'temperaturamaxserie')
     percentil_90 = funcion_percentil(imported_data, 0.9, 'temperaturaminserie')
     percentil_90TemMax = funcion_percentil(imported_data, 0.9, 'temperaturamaxserie')
     percentil_95 = funcion_percentil(imported_data, 0.95, 'precipitacionserie')
     percentil_99 = funcion_percentil(imported_data, 0.99, 'precipitacionserie')
     rx1day = funcion_rx1day(imported_data)
     rx5day = funcion_rx5day(imported_data['precipitacionserie'], rx5day)
     tnn = funcion_tnn(imported_data)
     txn = funcion_txn(imported_data)
     tnx = funcion_tnx(imported_data)
     txx = funcion_txx(imported_data)
     for x in imported_data:
        imported_data['codigoestacion'][contador] = codigoEstacion
        ciclo += 1
        cddCount = funcion_cdd(imported_data['precipitacionserie'][contador], largo, cddCount, ciclo)
        csdiCount = funcion_csdi(imported_data['temperaturaminserie'][contador], largo, csdiCount, ciclo, percentil_10)
        cwdCount = funcion_cwd(imported_data['precipitacionserie'][contador], largo, cwdCount, ciclo)
        temperaturasMaxMin = funcion_dtr(temperaturasMaxMin, imported_data['temperaturamaxserie'][contador], imported_data['temperaturaminserie'][contador])
        fd0 = funcion_fd0(imported_data['temperaturaminserie'][contador], fd0)
        fecha_mes = imported_data['fechaserie'][contador].split('-')
        if(int(fecha_mes[1]) < 6):
            glsCount = funcion_gls1(imported_data['temperaturamediaserie'][contador], largo, glsCount, ciclo)
        else:
            glsCount1 = funcion_gls1(imported_data['temperaturamediaserie'][contador], largo, glsCount1, ciclo)
        id0 = funcion_id0(imported_data['temperaturamaxserie'][contador], id0)
        prcptot = funcion_prcptot(imported_data['precipitacionserie'][contador], prcptot)
        r10mm = funcion_r10mm(imported_data['precipitacionserie'][contador], r10mm)
        r20mm = funcion_r20mm(imported_data['precipitacionserie'][contador], r20mm)
        r95p = funcion_r95p(imported_data['precipitacionserie'][contador], r95p, percentil_95)
        r99p = funcion_r99p(imported_data['precipitacionserie'][contador], r99p, percentil_99)
        r50mm = funcion_r50mm(imported_data['precipitacionserie'][contador], r50mm)
        sdiiCount = funcion_sdii(imported_data['precipitacionserie'][contador], sdiiCount)
        su25 = funcion_su25(imported_data['temperaturamaxserie'][contador], su25)
        tn10p = funcion_tn10p(percentil_10, imported_data['temperaturaminserie'][contador], ciclo, largo, tn10p)
        tn90p = funcion_tn90p(percentil_90, imported_data['temperaturaminserie'][contador], ciclo, largo, tn90p)
        tr20Count = funcion_tr20(imported_data['temperaturaminserie'][contador], largo, tr20Count, ciclo)
        tx10p = funcion_tx10p(percentil_10TemMAX, imported_data['temperaturamaxserie'][contador], ciclo, largo, tx10p)
        tx90p = funcion_tx90p(percentil_90TemMax, imported_data['temperaturamaxserie'][contador], ciclo, largo, tx90p)
        wsdi = funcion_wsdi(percentil_90TemMax, imported_data['temperaturamaxserie'][contador], wsdi)
        data2 = imported_data['fechaserie'][contador].split('-')
        año = anos_meses(data2)
        contador += 1
     dtr = (temperaturasMaxMin[0] - temperaturasMaxMin[1])/largo
     sdii = sdiiCount[1]/sdiiCount[0]
     indices = MemIndicesextremosclimaticos(codigoano = MemAno.objects.get(codigoano=año),
     codigoestacion = MemEstacionmeteorologica.objects.get(codigoestacion=codigoEstacion),
     cdd = cddCount[1], csdi = csdiCount[1], cwd = cwdCount[1], dtr = dtr, fd0 = fd0, gsl = glsCount[1],
     gsl2 = glsCount1[1], id0 = id0, prcptot = prcptot, r10mm = r10mm, r20mm = r20mm, r95p = r95p,
     r99p = r99p, r50mm = r50mm, rx1day = rx1day, rx5day = rx5day, sdii = sdii, su25 = su25,
     tn10p = tn10p, tn90p = tn90p, tnn = tnn, txn = txn, tr20 = tr20Count[1], tx10p = tx10p,
     tx90p = tx90p, tnx = tnx, txx = txx, wsdi = wsdi[1])
     indices.save()
     result = serie_resource.import_data(dataset, dry_run=True) # Test the data import
     if not result.has_errors():  
       #serie_resource.import_data(dataset, dry_run=False) # Actually import now
       return redirect ('estacion:estacion')
   return render(request, 'memoria/estacion/importar.html', {'codigoEstacion':codigoEstacion})


   