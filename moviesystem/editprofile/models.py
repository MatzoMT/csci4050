from unicodedata import name
from django.db import models
from django.core.validators import EmailValidator 	

# Create your models here.

class UserType(models.Model):
	description = models.CharField(max_length=20)
	def __str__(self):
		return self.description

class User(models.Model):
	first_name = models.CharField(max_length=255)
	last_name = models.CharField(max_length=255)
	password = models.CharField(default='password',max_length=100)
	email = models.CharField(
		unique=True, 
		max_length=255,
		validators=[EmailValidator]
	)
	phone = models.CharField(default='12345678',max_length=255)
	promotion = models.BooleanField(default=False, blank=True)
	status = models.CharField(default='Inactive',max_length=255)
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
	card_number = models.CharField(max_length=255, primary_key=True)
	user = models.ForeignKey(
		User, 
		on_delete=models.CASCADE
	)
	card_type = models.CharField(max_length=1, choices=TYPE_CHOICES)
	billing_address = models.CharField(max_length=255)
	last_digits = models.CharField(default='0000', max_length=4)

	expiration_date = models.DateField()
	def __str__(self):
		return self.card_number

"""
{ "movieID": 1, "title": "Gran Torino", "imageSource": require("../images/grantorino.jpg"), "rating": "R", "videoLink": "https://www.youtube.com/embed/RMhbr2XQblk?&autoplay=1", "description": "Disgruntled Korean War veteran Walt Kowalski sets out to reform his neighbor, Thao Lor, a Hmong teenager who tried to steal Kowalski's prized possession: a 1972 Gran Torino.", "director": "Clint Eastwood", "genre": ""},
"""

class Movie(models.Model):

	title = models.CharField(max_length=255)
	image_source = models.CharField(max_length=255)
	rating = models.CharField(max_length=10)
	video_link = models.CharField(max_length=255)
	description = models.CharField(max_length=255)
	director = models.CharField(max_length=255)

	def __str__(self):
		return self.title


class Cast(models.Model):
	actor = models.CharField(max_length=255)
	movieID = models.ForeignKey(
		Movie, 
		on_delete=models.PROTECT
	)


class Genre(models.Model):
	TYPE_CHOICES = [
		('1', 'COMEDY'),
		('2', 'HORROR'),
		('3', 'ACTION'),
		('4', 'ADVENTURE'),
		('5', 'ANIMATION'),
		('6', 'DRAMA'),
		('7', 'FANTASY'),
		('8', 'HISTORICAL'),
		('9', 'SCIENCE FICTION'),
		('10', 'THRILLER'),
		('11', 'WESTERN')
	]
	
	movieID = models.ForeignKey(
		Movie, 
		on_delete=models.PROTECT
	)
	genre = models.CharField(max_length=3, choices=TYPE_CHOICES)


class Room(models.Model):
	room_name = models.CharField(max_length=255, unique=True)
	number_seats = models.IntegerField()
	def __str__(self):
		return self.room_name


class MovieShow(models.Model):
	movieID = models.ForeignKey(
		Movie, 
		on_delete=models.PROTECT
	)

	roomID = models.ForeignKey(
		Room, 
		on_delete=models.PROTECT
	)

	show_date = models.CharField(max_length=255)
	show_time = models.CharField(max_length=255)

	class Meta: 
		constraints = [
			models.UniqueConstraint(fields=['show_date', 'show_time'], name='unique_datetime')
		]
