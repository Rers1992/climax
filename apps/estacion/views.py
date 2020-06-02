from django.shortcuts import render, redirect
from tablib import Dataset
from .resources import SerieTiempoResource
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
     contador = 0
     cddcount = 0
     cdd = 0
     ciclo = 0
     for x in imported_data:
         ciclo += 1
         data = str(x).split(',')
         data[1] = codigoEstacion + 0.0
         data6 = data[6].split(')')
         data22 = data[2].split("'")
         imported_data[contador] = '',data[1],data22[1],data[3],data[4],data[5],data6[0]
         if( float(data6[0]) < 1):
             cddcount += 1
         if(float(data6[0]) >= 1 or ciclo == len(imported_data)):
             if(cdd < cddcount):
                 cdd = cddcount  
             cddcount = 0
         data2 = data[2].split('-')
         data3 = data2[0].split("'")
         existeAno = MemAno.objects.filter(ano = data3[1])
         existeMes = []
         contador += 1
         if(len(existeAno) > 0):
            existeMes = MemMes.objects.filter(codigoano = existeAno[0].codigoano, nombremes= data2[1])
         if(len(existeAno) == 0):
             ano = MemAno(ano=data3[1])
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