from django.urls import include, path
from testapi import views 
 
urlpatterns = [ 
    path('v1/finland', views.route_get_finland),
    path('v1/get-cards', views.route_get_cards),
    path('v1/edit-profile', views.route_edit_profile),
    path('v1/login', views.route_login),
    path('v1/create-user', views.route_create_user),
    path('v1/get-user-information', views.route_get_user_information),
    #path('v1/get-user-by-email', views.route_get_user_by_email)
    path('v1/send-password-reset-email', views.route_send_password_reset_email),
    path('v1/edit-password', views.route_edit_password),
    path('v1/create-payment', views.route_create_payment),
    path('v1/delete-payment', views.route_delete_payment)
]