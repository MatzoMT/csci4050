from django.urls import include, path
from testapi import views 
 
urlpatterns = [ 
    path('v1/finland', views.route_get_finland)
]