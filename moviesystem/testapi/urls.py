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
    path('v1/change-password', views.route_change_password),
    path('v1/create-payment', views.route_create_payment),
    path('v1/delete-payment', views.route_delete_payment),
    path('v1/generate-password-reset-link', views.route_generate_password_reset_link),
    path('v1/decode-jwt', views.route_decode_jwt),
    path('v1/generate-activation-link', views.route_generate_activation_link),
    path('v1/activate-account', views.route_activate_account),
    path('v1/schedule-movie', views.route_schedule_movie),
    path('v1/save-image', views.route_save_image),
    path('v1/get-currently-showing-movies', views.route_get_currently_showing_movies),
    path('v1/get-coming-soon-movies', views.route_get_coming_soon_movies),
    path('v1/get-movies-genres', views.route_get_movies_genres),
    path('v1/add-movie', views.route_add_movie),
    path('v1/get-movies', views.route_get_movies)
]