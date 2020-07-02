from django.urls import path
from django.contrib.auth.decorators import login_required
from .views import estacion, crearEstacion, importarEstacion, dashboard, tablaHecho
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('estacion', login_required(estacion), name = 'estacion'),
    path('crearEstacion/', login_required(crearEstacion), name = 'crearEstacion'),
    path('importarEstacion/<int:codigoEstacion>', login_required(importarEstacion), name = 'importarEstacion'),
    path('dashboard', login_required(dashboard), name = 'dashboard'),
    path('indices2', login_required(tablaHecho), name = 'indices2'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)