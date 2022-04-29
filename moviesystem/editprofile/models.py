import code
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

class Promotion(models.Model):
	promotion_code = models.CharField(max_length=255)
	promotion_discount = models.IntegerField()
	promotion_expiry = models.CharField(max_length=255)
	def __str__(self):
		return self.promotion_code

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
	image_source = models.CharField(max_length=255) #trailer image
	rating = models.CharField(max_length=10) #reviews
	video_link = models.CharField(max_length=255) #trailer video
	description = models.CharField(max_length=255) #synopsis
	director = models.CharField(max_length=255) #director
	#producer = models.CharField(max_length=255) #producer
	def __str__(self):
		return self.title

class Cast(models.Model):
	actor = models.CharField(max_length=255)
	movieID = models.ForeignKey(
		Movie, 
		on_delete=models.PROTECT
	)
	def __str__(self):
		return self.movieID.title #+ " - " + self.genre

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
	
	#print(TYPE_CHOICES[1])

	movieID = models.ForeignKey(
		Movie, 
		on_delete=models.PROTECT
	)
	
	genre = models.CharField(max_length=3, choices=TYPE_CHOICES)
	def __str__(self):
		#print(self.genre)
		return self.movieID.title #+ " - " + self.genre


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

class Seat(models.Model):
	number = models.CharField(max_length=5)
	roomID = models.ForeignKey(
		Room,
		on_delete=models.CASCADE
	)
	def __str__(self):
		return self.row + self.number
	
class Ticket(models.Model):
	TYPE_CHOICES = [
		('A', 'Adult'),
		('C', 'Child'),
		('S', 'Senior'),
	]
	ticket_type = models.CharField(max_length=1, choices=TYPE_CHOICES)
	seatID = models.ForeignKey(
		Seat,
		on_delete = models.CASCADE
	)
	show_time = models.ForeignKey(
		MovieShow,
		on_delete=models.CASCADE
	)
	ticket_price = models.CharField(max_length=10)

class Booking(models.Model):
	userID = models.ForeignKey(
		User,
		on_delete=models.CASCADE
	)
	showTimeID = models.ForeignKey(
		MovieShow,
		on_delete=models.CASCADE
	)
	cardID = models.ForeignKey(
		PaymentCard,
		on_delete=models.PROTECT
	)
	promoID = models.ForeignKey(
		Promotion,
		on_delete=models.PROTECT
	)
	reserved = models.BooleanField()
	paid = models.BooleanField()

class ReservedSeat(models.Model):
	seatID = models.ForeignKey(
		Seat,
		on_delete=models.CASCADE
	)
	showTimeID = models.ForeignKey(
		MovieShow,
		on_delete=models.CASCADE
	)
	BookingID = models.ForeignKey(
		Booking,
		on_delete=models.CASCADE
	)