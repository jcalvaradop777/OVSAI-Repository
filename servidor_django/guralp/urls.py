from .views import trazas, fecha2Subfolders, nombresArchivos, anomalias
from django.urls import path, include
from rest_framework import routers

urlpatterns = [
    path('api/fecha2Subfolders/', fecha2Subfolders, name='fecha2Subfolders'),
    path('api/nombresArchivos/', nombresArchivos, name='nombresArchivos'),
    path('api/trazas/', trazas, name='trazas'),
    path('api/anomalias/', anomalias, name='anomalias'),
]    