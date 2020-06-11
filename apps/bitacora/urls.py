from django.urls import path
from django.contrib.auth.decorators import login_required
from .views import getBitacora, crearBitacora
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('bitacora/<int:codigoEstacion>', login_required(getBitacora), name = 'bitacora'),
    path('crearBitacora/<int:codigoEstacion>', login_required(crearBitacora), name = 'crearBitacora'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)