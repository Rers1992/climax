"""memoria URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import path, include
from django.views.generic.base import TemplateView
from apps.usuario.views import logoutUsuario

urlpatterns = [
    path('admin/', admin.site.urls),
    path('memoria/', include(('apps.memoria.urls','memoria'))),
    path('', auth_views.LoginView.as_view()),
    path('admin/', admin.site.urls),
    path('memoria/', include('apps.memoria.urls')),
    path("select2/", include("django_select2.urls")),
    path('memoria/', include(('apps.ubicacion.urls', 'ubicacion'))),
    path('memoria/', include(('apps.estacion.urls', 'estacion'))),
    path('memoria/', include(('apps.bitacora.urls', 'bitacora'))),
    path('', include(('apps.inicio.urls', 'inicio'))),
    path('memoria/', include('django.contrib.auth.urls')),
    path('accounts/login/', auth_views.LoginView.as_view(), name='login'),
    path('memoria/login.html/', logoutUsuario, name = 'logout')
]
