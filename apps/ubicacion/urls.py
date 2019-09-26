from django.urls import path
from django.contrib.auth.decorators import login_required
from .views import ubicacion, crearUbicacion
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('ubicacion', login_required(ubicacion), name = 'ubicacion'),
    path('crearUbicacion/', login_required(crearUbicacion), name = 'crearUbicacion'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)