from django.urls import include, path
from testapi import views 
 
urlpatterns = [ 
    path('v1/finland', views.route_get_finland),
    path('v1/get-cards', views.route_get_cards),
    path('v1/edit-profile', views.route_edit_profile),
    path('v1/login', views.route_login),
    path('v1/create-user', views.route_create_user)
]