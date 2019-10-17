from django.shortcuts import render, redirect
from tablib import Dataset
from apps.estacion.resources import AnoResource
from apps.memoria.models import MemEstacionmeteorologica
from .forms import MemEstacionForm

# Create your views here.

def estacion(request):
    estaciones = MemEstacionmeteorologica.objects.filter(estadoestacion = True)
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
     persona_resource = AnoResource()  
     dataset = Dataset()
     print("holi")  
     print(dataset)
     nuevas_personas = request.FILES['xlsfile']
     print("holi2")
     print(nuevas_personas)
     imported_data = dataset.load(nuevas_personas.read())
     print(dataset)  
     result = persona_resource.import_data(dataset, dry_run=True) # Test the data import
     print(result.has_errors())
     return redirect('estacion:estacion')
     if not result.has_errors():  
       persona_resource.import_data(dataset, dry_run=False) # Actually import now
   return render(request, 'memoria/estacion/importar.html')