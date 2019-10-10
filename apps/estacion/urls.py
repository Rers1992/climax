from django.urls import path
from django.contrib.auth.decorators import login_required
from .views import estacion, crearEstacion, importarEstacion
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('estacion', login_required(estacion), name = 'estacion'),
    path('crearEstacion/', login_required(crearEstacion), name = 'crearEstacion'),
    path('importarEstacion/<slug:v_rut>', login_required(importarEstacion), name = 'importarEstacion'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)