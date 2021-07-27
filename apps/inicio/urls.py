from django.urls import path
from django.contrib.auth.decorators import login_required
from .views import (estacion, getBitacora, detalle, 
estadisticos, regiones, regionesJson, estacionesRegion)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('inicio', estacion, name = 'inicio'),
    path('inicioRegion', regiones, name = 'inicioRegion'),
    path('estacionesRegion/<int:codigoEstacion>', estacionesRegion, name = 'estacionesRegion'),
    path('regionJson', regionesJson, name = 'regionJson'),
    path('bitacoraInicio/<int:codigoEstacion>', getBitacora, name = 'bitacoraInicio'),
    path('indices/<int:codigoEstacion>', detalle, name = 'indices'),
    path('estadisticos/<int:codigoEstacion>', estadisticos, name = 'estadisticos'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)