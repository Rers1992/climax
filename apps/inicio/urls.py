from django.urls import path
from django.contrib.auth.decorators import login_required
from .views import estacion, getBitacora, detalle
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('inicio', estacion, name = 'inicio'),
    path('bitacoraInicio/<int:codigoEstacion>', getBitacora, name = 'bitacoraInicio'),
    path('indices/<int:codigoEstacion>', detalle, name = 'indices'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)