from django.urls import path
from django.contrib.auth.decorators import login_required
from .views import crearEntidad, editarEntidad, eliminarEntidad, entidad, logoutUsuario #, usuario, crearUsuario, editarUsuario
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('entidad', login_required(entidad), name = 'entidad'),
#    path('usuario', login_required(usuario), name = 'usuario'),
    path('crearEntidad/', crearEntidad, name = 'crearEntidad'),
    #path('crearUsuario/', login_required(crearUsuario), name = 'crearUsuario'),
    path('editarEntidad/<slug:v_rut>', login_required(editarEntidad), name = 'editarEntidad'),
    #path('editarUsuario/<slug:v_rut>', login_required(editarUsuario), name = 'editarUsuario'),
    path('eliminarEntidad/<slug:v_rut>', login_required(eliminarEntidad), name = 'eliminarEntidad'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)