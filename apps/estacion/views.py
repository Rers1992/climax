from django.shortcuts import render, redirect
from tablib import Dataset
from .resources import SerieTiempoResource
from apps.memoria.models import MemEstacionmeteorologica
from .forms import MemEstacionForm

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

def importarEstacion(request):
   if request.method == 'POST':  
     ano_resource = SerieTiempoResource()  
     dataset = Dataset()
     nuevas_anos = request.FILES['myfile']
     print(nuevas_anos) 
     imported_data = dataset.load(nuevas_anos.read())
     print(dataset) 
     print(imported_data) 
     result = ano_resource.import_data(dataset, dry_run=True) # Test the data import
     print(result.has_errors())  
     return redirect ('estacion:estacion')
     if not result.has_errors():  
       ano_resource.import_data(dataset, dry_run=False) # Actually import now
   return render(request, 'memoria/estacion/importar.html')