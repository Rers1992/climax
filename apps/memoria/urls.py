from django.urls import path
from .views import Home
from .views import crearEntidad, editarEntidad, eliminarEntidad, usuario, crearUsuario, editarUsuario, login_page
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', Home, name = 'index'),
    path('usuario', usuario, name = 'usuario'),
    path('crearEntidad/', crearEntidad, name = 'crearEntidad'),
    path('crearUsuario/', crearUsuario, name = 'crearUsuario'),
    path('editarEntidad/<slug:v_rut>', editarEntidad, name = 'editarEntidad'),
    path('editarUsuario/<slug:v_rut>', editarUsuario, name = 'editarUsuario'),
    path('eliminarEntidad/<slug:v_rut>', eliminarEntidad, name = 'eliminarEntidad'),
    path('login', login_page, name = 'login')
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)