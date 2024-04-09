<<<<<<< HEAD
from .views import trazas, procesar_fecha
from django.urls import path, include
from rest_framework import routers

urlpatterns = [
    path('api/data/', trazas, name='data'),
    path('api/procesar_fecha/', procesar_fecha, name='procesar_fecha')
=======
from .views import trazas, procesar_fecha
from django.urls import path, include
from rest_framework import routers

urlpatterns = [
    path('api/data/', trazas, name='data'),
    path('api/procesar_fecha/', procesar_fecha, name='procesar_fecha')
>>>>>>> a3ae5695d3937190463fdf11d41378b13015bf77
]    