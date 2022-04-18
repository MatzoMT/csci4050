from django.contrib import admin

# Register your models here.
from .models import UserType, User, PaymentCard, Genre, Cast, Movie

admin.site.register(UserType)
admin.site.register(User)
admin.site.register(PaymentCard)
admin.site.register(Genre)
admin.site.register(Cast)
admin.site.register(Movie)
