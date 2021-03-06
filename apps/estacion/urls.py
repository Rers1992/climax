from django.urls import path
from django.contrib.auth.decorators import login_required
from .views import estacion, crearEstacion, importarEstacion, dashboard, tablaHecho, estadisticas, estadisticasJson, estacionJson
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('estacion', login_required(estacion), name = 'estacion'),
    path('estacionJson', estacionJson, name = 'estacionJson'),
    path('crearEstacion/', login_required(crearEstacion), name = 'crearEstacion'),
    path('importarEstacion/<int:codigoEstacion>', login_required(importarEstacion), name = 'importarEstacion'),
    path('dashboard/<int:codigoEstacion>', login_required(dashboard), name = 'dashboard'),
    path('estadisticas/<int:codigoEstacion>', login_required(estadisticas), name = 'estadisticas'),
    path('indices2/<int:codigoEstacion>', tablaHecho, name = 'indices2'),
    path('estadisticasJson/<int:codigoEstacion>', estadisticasJson, name = 'estadisticasJson'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)