from django.shortcuts import render, redirect
from tablib import Dataset
from .resources import SerieTiempoResource
from apps.memoria.models import MemEstacionmeteorologica, MemSeriedetiempo, MemAno, MemMes
from .forms import MemEstacionForm
import tablib
from import_export import resources  
from django.db.models import Q
import math

# Create your views here.
def FUNCION_PERCENTIL_10(datos):
      datos2 = datos.sort('temperaturaminserie')
      n = len(datos2)
      i = n * 0.1
      if(i % 1 == 0):
          p = (datos2['temperaturaminserie'][int(i)] + datos2['temperaturaminserie'][int(i+1)])/2
          return p
      else:
          return datos2['temperaturaminserie'][math.ceil(i)]

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
     contador = 0
     cddcount = 0
     cdd = 0
     ciclo = 0
     percentil_10 = FUNCION_PERCENTIL_10(imported_data)
     for x in imported_data:
         imported_data['temperaturaminserie'][contador] = float(codigoEstacion)
         ciclo += 1
         if( float(imported_data['precipitacionserie'][contador]) < 1):
             cddcount += 1
         if(float(imported_data['precipitacionserie'][contador]) >= 1 or ciclo == len(imported_data)):
             if(cdd < cddcount):
                 cdd = cddcount  
             cddcount = 0
         data2 = imported_data['fechaserie'][contador].split('-')
         existeAno = MemAno.objects.filter(ano = data2[0])
         existeMes = []
         contador += 1
         if(len(existeAno) > 0):
            existeMes = MemMes.objects.filter(codigoano = existeAno[0].codigoano, nombremes= data2[1])
         if(len(existeAno) == 0):
             ano = MemAno(ano=data2[0])
             ano.save()
             if(len(existeMes) == 0):
                 mes = MemMes(codigoano = MemAno.objects.get(codigoano=ano.codigoano), nombremes= data2[1])
                 mes.save()
         else:
             if(len(existeMes) == 0):
                 mes = MemMes(codigoano = MemAno.objects.get(codigoano=existeAno[0].codigoano), nombremes= data2[1])
                 mes.save()
     result = serie_resource.import_data(dataset, dry_run=True) # Test the data import
     if not result.has_errors():  
       serie_resource.import_data(dataset, dry_run=False) # Actually import now
       return redirect ('estacion:estacion')
   return render(request, 'memoria/estacion/importar.html', {'codigoEstacion':codigoEstacion})


   