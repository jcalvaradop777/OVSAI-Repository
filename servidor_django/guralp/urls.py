from .views import trazas, procesar_fecha
from django.urls import path, include
from rest_framework import routers

urlpatterns = [
    path('api/data/', trazas, name='data'),
    path('api/procesar_fecha/', procesar_fecha, name='procesar_fecha')
]    