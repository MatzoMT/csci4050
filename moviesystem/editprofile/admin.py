from django.contrib import admin

# Register your models here.
from .models import UserType, User, PaymentCard

admin.site.register(UserType)
admin.site.register(User)
admin.site.register(PaymentCard)
