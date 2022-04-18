from django.contrib import admin

# Register your models here.
from .models import UserType, User, PaymentCard, Promotion

admin.site.register(UserType)
admin.site.register(User)
admin.site.register(PaymentCard)
admin.site.register(Promotion)