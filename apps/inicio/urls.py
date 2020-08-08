from django.urls import path
from django.contrib.auth.decorators import login_required
from .views import estacion
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('inicio', estacion, name = 'inicio'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)