from django.db import models
#from django_cryptography_fields import encrypt
from django.core.validators import EmailValidator

# Create your models here.

class UserType(models.Model):
	description = models.CharField(max_length=20)
	def __str__(self):
		return self.description

class User(models.Model):
	first_name = models.CharField(max_length=20)
	last_name = models.CharField(max_length=20)
	password = models.CharField(default='password',max_length=20)
	email = models.CharField(
		unique=True, 
		max_length=32,
		validators=[EmailValidator]
	)
	phone = models.CharField(default='12345678',max_length=20)
	promotion = models.BooleanField(default=False, blank=True)
	status = models.CharField(default='Inactive',max_length=20)
	user_type = models.ForeignKey(
		UserType, 
		on_delete=models.RESTRICT
	)
	def __str__(self):
		return self.email

class PaymentCard(models.Model):
	TYPE_CHOICES = [
		('C', 'CREDIT'),
		('D', 'DEBIT'),
	]
	card_number = models.CharField(max_length=20, primary_key=True)
	user = models.ForeignKey(
		User, 
		on_delete=models.CASCADE
	)
	card_type = models.CharField(max_length=1, choices=TYPE_CHOICES)
	billing_address = models.CharField(max_length=20)
	expiration_date = models.DateField()
	def __str__(self):
		return self.card_number