from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('cardsview/', views.cards_view, name='cardsview'),
    path('editbasic/', views.edit_profile, name='editbasic'),
    path('editcard/<int:number>/', views.edit_card, name='editcard'),
    path('editpassword/', views.edit_password, name='editpassword')
    #path('edit', views.edit_profile, name='edit')
]
