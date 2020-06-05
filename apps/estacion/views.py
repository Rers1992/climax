from django.shortcuts import render, redirect
from tablib import Dataset
from .resources import SerieTiempoResource
from .indicadores import *
from apps.memoria.models import MemEstacionmeteorologica, MemSeriedetiempo, MemAno, MemMes
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
     cddCount = [0, 0]; csdiCount = [0, 0]; cwdCount= [0, 0]; fd0 = 0; id0 = 0; prcptot = 0
     temperaturasMaxMin = [0,0]
     percentil_10 = funcion_percentil_10(imported_data)
     #me salte el indicador 6
     for x in imported_data:
        imported_data['codigoestacion'][contador] = codigoEstacion
        ciclo += 1
        cddCount = funcion_cdd(imported_data['precipitacionserie'][contador], largo, cddCount, ciclo)
        csdiCount = funcion_csdi(imported_data['temperaturaminserie'][contador], largo, csdiCount, ciclo, percentil_10)
        cwdCount = funcion_cwd(imported_data['precipitacionserie'][contador], largo, cwdCount, ciclo)
        temperaturasMaxMin = funcion_dtr(temperaturasMaxMin, imported_data['temperaturamaxserie'][contador], imported_data['temperaturaminserie'][contador])
        fd0 = funcion_fd0(imported_data['temperaturaminserie'][contador], fd0)
        id0 = funcion_id0(imported_data['temperaturamaxserie'][contador], id0)
        prcptot = funcion_prcptot(imported_data['precipitacionserie'][contador], prcptot)
        data2 = imported_data['fechaserie'][contador].split('-')
        anos_meses(data2)
        contador += 1
     dtr = (temperaturasMaxMin[0] - temperaturasMaxMin[1])/largo
     print(cddCount[1])
     print(csdiCount[1])
     print(cwdCount[1])
     print(dtr)
     print(fd0)
     print(id0)
     print(prcptot)
     result = serie_resource.import_data(dataset, dry_run=True) # Test the data import
     if not result.has_errors():  
       serie_resource.import_data(dataset, dry_run=False) # Actually import now
       return redirect ('estacion:estacion')
   return render(request, 'memoria/estacion/importar.html', {'codigoEstacion':codigoEstacion})


   