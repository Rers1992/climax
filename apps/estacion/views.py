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

def importarEstacion(request, v_rut):
   if request.method == 'POST':  
     persona_resource = AnoResource()  
     dataset = Dataset()
     nuevas_personas = request.FILES['xlsfile']
     imported_data = dataset.load(nuevas_personas.read())
     result = persona_resource.import_data(dataset, dry_run=True) # Test the data import
     if not result.has_errors():  
       persona_resource.import_data(dataset, dry_run=False) # Actually import now  
   else:
       persona_resource = AnoResource()  
   return render(request, 'memoria/estacion/importar.html')