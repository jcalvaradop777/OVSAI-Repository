from .views import get_data
from django.urls import path, include
from rest_framework import routers

urlpatterns = [
    path('api/data/', get_data, name='get_data')
]    