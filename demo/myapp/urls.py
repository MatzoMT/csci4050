from django.urls import path
# Below: import all functions from views.py
from .views import *

urlpatterns = [
    path('', index, name='index'),
    path('finland', test)
]


# /v1/api/get-dafdfa
# /v1/api/get-something-else