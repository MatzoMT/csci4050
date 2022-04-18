from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status

import jwt
from datetime import datetime
from django.utils import timezone
import time
 
from testapi.models import Tutorial
from testapi.serializers import TutorialSerializer
from rest_framework.decorators import api_view
from django.shortcuts import render, redirect
from editprofile.forms import EditBasicForm, EditCardForm
from django.views.generic.edit import UpdateView
from editprofile.models import *
from django.template import loader
from django.contrib import messages
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth.models import User as AuthUser
from django.http import HttpResponse, Http404
from django.contrib.auth.hashers import make_password, check_password

from django.template import loader
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm
from .forms import UserRegisterForm
from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template
from django.template import Context


@api_view(['GET', 'POST', 'DELETE'])
def tutorial_list(request):
    # GET list of tutorials, POST a new tutorial, DELETE all tutorials
    print("hello world")

@api_view(['GET'])
def route_get_finland(request):
    data = {
        'name': 'Pekka',
        'location': 'Finland',
        'city': 'Espoo'
    }
    return JsonResponse(data)

# Below route for rendering movies
@api_view(['POST'])
def route_get_movies(request):
    movies = Movie.objects.all()
    print(movies[0].description)
    movie_list = []
    for movie in movies:
        movie_dict = {}
        movie_dict["id"] = movie.id
        movie_dict["title"] = movie.title
        movie_dict["imageSource"] = movie.image_source
        movie_dict["rating"] = movie.rating
        movie_dict["videoLink"] = movie.video_link
        movie_dict["description"] = movie.description
        movie_dict["director"] = movie.director

        genres = Genre.objects.all().filter(movieID_id=movie.id)
        genre_list = []
        for genre in genres:
            genre_list.append(genre.TYPE_CHOICES[int(genre.genre) - 1])
        movie_dict["genres"] = genre_list#Genre.objects.all().filter(movieID_id=movie.id)
        cast = Cast.objects.all().filter(movieID_id=movie.id)
        cast_list = []
        for cast_member in cast:
            cast_list.append(cast_member.actor)
            #cast_list.append(genre.TYPE_CHOICES[int(genre.genre) - 1][1])
        movie_dict["cast"] = cast_list#Cast.objects.all().filter(movieID_id=movie.id)
        movie_list.append(movie_dict)  

    context = {
        'isSuccessful': 'true',
        'list': movie_list
    }
    return JsonResponse(context)

@api_view(['POST'])
def route_add_movie(request):
    print("adding a movie")
    request_success = "true"
    data = JSONParser().parse(request)
    print(data['description'])
    title = data['title']
    image_source = 'grantorino.jpg'#data['imageSource']
    rating = data['rating']
    video_link = data['videoLink']
    description = data['description']
    director = data['director']
    genres = data['genres']
    cast = data['cast']

    movie = Movie(title=title, image_source=image_source, rating=rating, video_link=video_link, description=description, director=director)
    movie.save()   

    for genre in genres:
        genreId = 0
        if genre == "COMEDY":
            genreId = 1
        elif genre == "HORROR":
            genreId = 2
        elif genre == "ACTION":
            genreId = 3
        elif genre == "ADVENTURE":
            genreId = 4
        elif genre == "ANIMATION":
            genreId = 5
        elif genre == "DRAMA":
            genreId = 6
        elif genre == "FANTASY":
            genreId = 7
        elif genre == "HISTORICAL":
            genreId = 8
        elif genre == "SCIENCE FICTION":
            genreId = 9
        elif genre == "THRILLER":
            genreId = 10
        elif genre == "WESTERN":
            genreId = 11
        movieGenre = Genre(movieID=movie, genre=genreId)
        movieGenre.save()

    for castMember in cast:
        castPerson = Cast(movieID=movie, actor=castMember)
        castPerson.save()

    #print(movie_id)
    response = {
        'requestSuccess': request_success
    }
    return JsonResponse(response)


# This route is for forgot password option
# Searches database to see if email is registered in system
# If email is found in DB, isSuccessful: "true" returned in JSON response + email
# Else, return isSuccessful: "false" in JSON respnose
"""
@api_view(['POST'])
def route_get_user_by_email(request):
    if 'year' not in request.json:
        response = {
            'isSuccessful': 'false'
        }
        return JsonResponse(response)
    data = JSONParser().parse(request)
    users = User.objects.all().filter(email=data['email'])
"""



@api_view(['POST'])
def route_get_user_information(request):
    data = JSONParser().parse(request)
    users = User.objects.all().filter(email=data['email'])
    request_success = "true"
    is_admin = "false"
    # user_type_id: 1 = customer, 2 = admin
    try:
        if users[0].user_type_id == 2:
            is_admin = "true"
        response = {
            'requestSuccess': request_success,
            'email': data['email'],
            'firstName': users[0].first_name,
            'lastName': users[0].last_name,
            'phone': users[0].phone,
            'promotion': users[0].promotion,
            'isAdmin': is_admin
        }
    except:
        request_success = "false"
        response = {
            'requestSuccess': request_success
        }
        print("hello")
    return JsonResponse(response)

# End point for email (username), password verification
# Checks for matches in Django / MySQL database
# JSON 'email' return values are "true" or "false"
@api_view(['POST'])
def route_login(request):
    data = JSONParser().parse(request)
    login_success = "false"
    is_admin = "false"
    is_inactive = "false"
    users = User.objects.all().filter(email=data['email'], user_type=1)
    # check_password(original_password, make_password result)
    if len(users) > 0 and check_password(data['password'], users[0].password)==True:
        if users[0].status != 'Inactive':
            login_success = "true"
        else:
            is_inactive = "true"
    # Below loop runs if login as normal user fails
    # Begins searching for admin credentials
    if login_success == "false":
        print("ATTEMPT ADMIN")
        admin_users = User.objects.all().filter(email=data['email'], user_type=2)
        if len(admin_users) > 0 and check_password(data['password'], admin_users[0].password)==True:
            login_success = "true"
            is_admin = "true"
    response = {
        'loginSuccess': login_success,
        'email': data['email'],
        'isAdmin': is_admin,
        'isInactive': is_inactive
    }
    return JsonResponse(response)

"""
@api_view(['POST'])
def route_get_payments(request):
    try:
        data = JSONParser().parse(request)
        user = User.objects.all.get(email=data["email"])
        cards = PaymentCards.objects.all
    except Exception as err:
        response = {
            'success': 'false'
        }
    return JsonResponse(response)
"""

@api_view(['POST'])
def route_create_promotion(request):
    data = JSONParser().parse(request)
    promo_code = data['promotionCode']
    promo_discount = data['promotionDiscount']
    promo_expiry = data['promotionExpiration']
    promotion = Promotion(promotion_code = promo_code, promotion_discount = promo_discount, promotion_expiry = promo_expiry)
    promotion.save()
    response = {
        'requestSuccess': 'true'
    }
    users = User.objects.all().filter(promotion = True)
    for user in users:
        htmly = loader.get_template('users/NewPromoEmail.html')
        d = { 'username': user.first_name, 'promoCode': promo_code, 'promoDiscount': promo_discount, 'promoExpiry': promo_expiry}
        subject, from_email, to = 'New Promotion Code!', user.first_name, user.email
        html_content = htmly.render(d)
        msg = EmailMultiAlternatives(subject, html_content, from_email, [to])
        msg.attach_alternative(html_content, "text/html")
        msg.send()
    return JsonResponse(response)

@api_view(['POST'])
def route_get_promotions(request):
    promotions = Promotion.objects.all()
    promo_list = []
    for promotion in promotions: 
        promotion.promotion_code
        promo_dict = {}
        promo_dict["promotionCode"] = promotion.promotion_code
        promo_dict["promotionDiscount"] = promotion.promotion_discount
        promo_dict["promotionExpiration"] = promotion.promotion_expiry
        promo_list.append(promo_dict)
    context = {
        'list': promo_list
    }
    return JsonResponse(context)


@api_view(['POST'])
def route_send_password_reset_email(request):
    try:
        data = JSONParser().parse(request)

        key = "secret"
        # 3600 seconds = 1 hr expiration after time token was generated
        encoded = jwt.encode({"exp": int(time.time()) + 3600, "email": data['email']}, key, algorithm="HS256")
        print(encoded)
        decoded = jwt.decode(encoded, key, algorithms="HS256")
        print(decoded)

        resetUrl = 'http://localhost:3000/reset-password-form?jwt=' + encoded
        
        name = data["name"]
        email = data["email"]
        #send email
        htmly = loader.get_template('users/ResetPasswordEmail.html')
        
        d = { 'username': name, "resetLink": resetUrl}
        subject, from_email, to = 'Welcome,', name, email
        html_content = htmly.render(d)
        msg = EmailMultiAlternatives(subject, html_content, from_email, [to])
        msg.attach_alternative(html_content, "text/html")
        msg.send()
        response = {
            'loginSuccess': "true",
            'resetUrl': reset_url
        }
    except:
        response = {
            'loginSuccess': "false"
        }
    return JsonResponse(response)



# Post username and password
# If there is a query with a matching username and password, return true
# else, return false
@api_view(['POST'])
def route_create_user(request):

    #duplicate first names can exist within the system
    #duplicate last names can exist within the system
    #email CANNOT exist within the system
    #duplicate phone numbers can exist within the system
    #password must be more than 8 characters and must match

    creation_success = "true"
    err_msg = ""
    data = JSONParser().parse(request)
    print(data)
    # Check request to see if it has all fields
    # replace below 
    users = User.objects.all()
    email = data['email']

    users = User.objects.all().filter(email=email)
    if len(users) > 0:
        creation_success = "false"
        err_msg = "This email is already in the system."


    if data['phone'] == "" or data['firstName'] == "" or data['lastName'] == "" or data['email'] == "":
        creation_success = "false"
        err_msg = "You cannot leave fields blank."

    name = data['firstName']
    confirm_password = data['confirm_password']
    password = data['password']
    if len(password) < 8:
        creation_success = "false"
        err_msg = "The password is not long enough."
    if password != confirm_password:
        creation_success = "false"
        err_msg = "The passwords do not match."

    if creation_success == "true":
        password
        print(make_password(password))
        testattu = make_password(password)
        print("LENGTH IS " + str(len(testattu)))
        # check_password(original_password, make_password result)
        matches = check_password(password, testattu)
        print(matches)
        user = User(first_name=name, last_name=data['lastName'], password=make_password(password), email=email, phone=data['phone'], status="Inactive", user_type_id=1, promotion=data['promotion'])
        # user = User(first_name=name, last_name=form_info.get('last_name'), password=form_info.get('password'), email=email, phone=form_info.get('phone'), status='Inactive', user_type_id=1, promotion=form_info.get('promotion'))
        user.save()
        #send email
        '''
        htmly = loader.get_template('users/Email.html')
        d = { 'username': name }
        subject, from_email, to = 'Welcome!', name, email
        html_content = htmly.render(d)
        msg = EmailMultiAlternatives(subject, html_content, from_email, [to])
        msg.attach_alternative(html_content, "text/html")
        msg.send()
        '''
        
    #for user in users:
    #    print(user)
    #    print(user.password)
    response = {
        'creationSuccess': creation_success,
        'errMsg': err_msg,
    }

    print(response)

    return JsonResponse(response)
    #return HttpResponse(users)

    

@api_view(['POST'])
def route_edit_password(request):
    data = JSONParser().parse(request)
    try:
        new_query = User.objects.all().get(email=data["email"])
        new_query.password = make_password(data['newPassword'])
        new_query.save()
        print(make_password(data['newPassword']))
        print(data['newPassword'])
        response = {
            'changeSuccess': 'true'
        }
        return JsonResponse(response)
    except Exception as err:
        print(err)
        response = {
            'changeSuccess': "false"
        }
        return HttpResponse(400)



@api_view(['POST'])
def route_change_password(request):
    data = JSONParser().parse(request)
    change_success = "true"
    err_msg = ""
    try:
        new_query = User.objects.all().get(email=data["email"])
        old_password = data['currentPassword']
        confirm_password = data['confirmNewPassword']
        password = data['newPassword']
        #check if old password is valid
        if len(password) < 8:
            change_success = "false"
            err_msg = "The password is not long enough."
        if password != confirm_password:
            change_success = "false"
            err_msg = "The passwords do not match."
        if check_password(old_password, new_query.password)==False:
            change_success = "false"
            err_msg = "Your current password is incorrect."
        if change_success == "true":
            new_query.password = make_password(password)
            new_query.save()
        #print(make_password(data['newPassword']))
        #print(data['newPassword'])



        response = {
            'changeSuccess': change_success,
            'errMsg': err_msg
        }
        return JsonResponse(response)
    except Exception as err:
        print("ERROR")
        print(err)
        response = {
            'changeSuccess': "false",
            'errMsg': err_msg
        }
        return JsonResponse(response)




@api_view(['POST'])
def route_edit_profile(request):
    data = JSONParser().parse(request)
    change_success = "true"
    err_msg = ""
    try:
        new_query = User.objects.all().get(email=data["email"])

        new_query.first_name = data["firstName"]

        new_query.phone = data["phone"]

        new_query.promotion = data["promotion"]

        new_query.last_name = data["lastName"]
        if data["firstName"] == "" or data["lastName"] == "" or data["phone"] == "":
            err_msg = "You cannot leave this field empty."
            change_success = "false"
        
        if change_success == "true":
            new_query.save()
        #send email
        htmly = loader.get_template('users/EditProfileEmail.html')
        
        d = { 'username': data["firstName"]}
        subject, from_email, to = 'FilmMax Edited Profile', data["firstName"], data["email"]
        html_content = htmly.render(d)
        msg = EmailMultiAlternatives(subject, html_content, from_email, [to])
        msg.attach_alternative(html_content, "text/html")
        msg.send()
        response = {
            'changeSuccess': change_success,
            'errMsg': err_msg
        }
        return JsonResponse(response)
    except Exception as err:
        print(err)
        response = {
            'changeSuccess': "false",
            'errMsg': err_msg
        }
        return HttpResponse(400)
'''
@api_view(['POST'])
def route_edit_password(request):
    data = JSONParser().parse(request)
    try:
        new_query = User.objects.all().get(email=data["email"])
        new_query.password = make_password(data['newPassword'])
        new_query.save()
        print(make_password(data['newPassword']))
        print(data['newPassword'])
        response = {
            'changeSuccess': 'true'
        }
        return JsonResponse(response)
    except Exception as err:
        print(err)
        response = {
            'changeSuccess': "false"
        }
        return JsonResponse(response)
'''

@api_view(['POST'])
def route_create_payment(request):
    try:
        err_msg = ""
        data = JSONParser().parse(request)
        successful = "true"
        user = User.objects.all().get(email=data["email"])
        card = PaymentCard(card_type=data['cardType'], last_digits=str(data['cardNumber'][-4:]), card_number=make_password(data['cardNumber']), user=user, billing_address=data["billingAddress"], expiration_date=data["expirationDate"])
        if data['cardType'] == "" or data['cardNumber'] == "" or data['billingAddress'] == "" or data['expirationDate'] == "":
            successful = "false"
            err_msg = "You cannot leave any of these fields blank."
        print(successful)


        if successful == "true":
            card.save()
        response = {
            'success': successful,
            'errMsg': err_msg
        }
    except Exception as err:
        print(err)
        response = {
            'success': 'false',
            'errMsg': err_msg
        }
    return JsonResponse(response)

@api_view(['POST'])
def route_get_cards(request):
    """
    try:
        user = User.objects.get(pk=1)
    except User.DoesNotExist:
        raise Http404("User does not exist")
    """
    try:
        data = JSONParser().parse(request)
        user = User.objects.all().get(email=data["email"])
        card_list = PaymentCard.objects.filter(user=user)
        people = User.objects.filter(user_type=1)
        print(people)
        for person in people:
            print(person)
        """
            first_name = models.CharField(max_length=20)
        last_name = models.CharField(max_length=20)
        password = models.CharField(default='password',max_length=20)
        email = models.CharField(
            unique=True, 
            max_length=20,
            validators=[EmailValidator]
        )
        phone = models.CharField(default='12345678',max_length=20)
        promotion = models.BooleanField(default=False, blank=True)
        status = models.CharField(default='Inactive',max_length=20)
        user_type = models.ForeignKey(
        """
        print(card_list)
        card_array = []
        for card in card_list:
            card_dict = {}
            print(card)
            #<tr><td>{{ x.card_type }}</td><td>{{ x }}</td><td>{{ x.expiration_date }}</td><td>{{ x.billing_address }}</td></li>
            print(card.card_type)
            print(card.expiration_date)
            print(card.billing_address)
            card_dict["cardNumber"] = card.card_number
            card_dict["lastDigits"] = card.last_digits
            card_dict["cardType"] = card.card_type
            card_dict["expirationDate"] = card.expiration_date
            card_dict["billingAddress"] = card.billing_address
            card_array.append(card_dict)

        context = {
            'isSuccessful': 'true',
            'list': card_array
        }
    except Exception as err:
        context = {
            'isSuccessful': 'false'
        }
    #return JsonResponse(context)
    return JsonResponse(context)
    template = loader.get_template('editprofile/cardsview.html')
    return HttpResponse(template.render(context, request))


# THIS IS AN EXAMPLE
@api_view(['GET', 'PUT', 'DELETE'])
def tutorial_detail(request, pk):
    # find tutorial by pk (id)
    try: 
        tutorial = Tutorial.objects.get(pk=pk) 
    except Tutorial.DoesNotExist: 
        return JsonResponse({'message': 'The tutorial does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    # GET / PUT / DELETE tutorial

# THIS IS AN EXAMPLE  
@api_view(['GET'])
def tutorial_list_published(request):
    # GET all published tutorials
    print("hello")

@api_view(['POST'])
def route_delete_payment(request):
    data = JSONParser().parse(request)
    print("HASH")
    print(make_password(data['cardNumber']))
    card = PaymentCard.objects.get(last_digits=data['lastDigits'])
    card.delete()
    return HttpResponse(200)

# v1/generate-password-reset-link
@api_view(['POST'])
def route_generate_password_reset_link(request):
    data = JSONParser().parse(request)
    key = "secret"
    # 3600 seconds = 1 hr expiration after time token was generated
    encoded = jwt.encode({"exp": int(time.time()) + 3600, "email": data['email']}, key, algorithm="HS256")
    print(encoded)
    decoded = jwt.decode(encoded, key, algorithms="HS256")
    print(decoded)
    response = {
        'jwt': encoded,
        'email': data['email'],
        'resetUrl': 'http://localhost:3000/reset-password-form?jwt=' + encoded
    }
    return JsonResponse(response)

# v1/generate-password-reset-link
@api_view(['POST'])
def route_generate_activation_link(request):
    try:
        data = JSONParser().parse(request)

        key = "secret"
        # 86400 seconds = 24 hr expiration after time token was generated
        encoded = jwt.encode({"exp": int(time.time()) + 86400, "email": data['email']}, key, algorithm="HS256")
        print(encoded)
        decoded = jwt.decode(encoded, key, algorithms="HS256")
        print(decoded)

        activationUrl = 'http://localhost:3000/confirm-activation?jwt=' + encoded
        
        print(activationUrl)

        name = data["name"]
        email = data["email"]
        #send email
        htmly = loader.get_template('users/Email.html')
        
        d = { 'username': name, "activationLink": activationUrl}
        subject, from_email, to = 'Welcome', name, email
        html_content = htmly.render(d)
        msg = EmailMultiAlternatives(subject, html_content, from_email, [to])
        msg.attach_alternative(html_content, "text/html")
        msg.send()
        response = {
            'loginSuccess': "true",
            'activationUrl': activationUrl
        }
    except:
        response = {
            'loginSuccess': "false"
        }
    return JsonResponse(response)


@api_view(['POST'])
def route_activate_account(request):
    data = JSONParser().parse(request)
    print("data print")
    print(data)
    user = User.objects.all().get(email=data["email"])
    #print(user)
    user.status = "Active"
    user.save()
    creation_success = "true"
    response = {
        'changeSuccess': creation_success
    }
    return JsonResponse(response)



@api_view(['POST'])
def route_decode_jwt(request):
    data = JSONParser().parse(request)
    key = "secret"
    expired = "false"
    try:
        print(data)
        print("before")
        decoded = jwt.decode(data['jwt'], key, algorithms="HS256")
        print("after")
        if time.time() > decoded['exp']:
            expired = "true"
        email = decoded['email']
        response = {
            'expired': expired,
            'email': email
        }
    except Exception as err:
        response = {
            'expired': "true",
        }
        print(err)
    return JsonResponse(response)


#SCHEDULING MOVIE
@api_view(['GET', 'POST'])
def route_schedule_movie(request):
    print("Request method: ",request.method)
    print("Request ", request.data)
    success = "false"
    response = []
    if(request.method == "POST"):
        show = ""
        try:
            movie = Movie.objects.get(title=request.data['movie'])
            room = Room.objects.get(room_name=request.data['room'])
            if(len(MovieShow.objects.filter(show_time=request.data['time'], show_date=request.data['date']))>0):
                response = {
                    'success': success,
                    'error': "There is already a movie scheduled for this date and time."
                }
                return JsonResponse(response)
            show = MovieShow(movieID = movie, roomID = room, show_date = request.data['date'], show_time = request.data['time']) 
            show.save()
            success = "true"
            response = {
                'success': success
            }
        except Exception as err:
            print(err)

    if(request.method == "GET"):
        movies = []
        rooms = []
        try:
            movies = Movie.objects.all()
            rooms = Room.objects.all()
            roomlist=[]
            movielist=[]
            for i in rooms:
                roomlist.append(i.room_name)
            for i in movies:
                movielist.append(i.title)
            response = {
                'movies': list(movielist),
                'rooms': list(roomlist)
            }
        except Exception as err:
            print(err)
    return JsonResponse(response)


"""

"""
# Below route for rendering movies
@api_view(['POST'])
def route_get_movies_example(request):
    movies = Movie.objects.all()
    #show_times = 
    print(movies[0].description)
    movie_list = []
    for movie in movies:
        movie_dict = {}
        movie_dict["id"] = movie.id
        movie_dict["title"] = movie.title
        movie_dict["imageSource"] = movie.image_source
        movie_dict["rating"] = movie.rating
        movie_dict["videoLink"] = movie.video_link
        movie_dict["description"] = movie.description
        movie_dict["director"] = movie.director

        genres = Genre.objects.all().filter(movieID_id=movie.id)
        genre_list = []
        for genre in genres:
            genre_list.append(genre.TYPE_CHOICES[int(genre.genre) - 1])
        movie_dict["genres"] = genre_list#Genre.objects.all().filter(movieID_id=movie.id)
        cast = Cast.objects.all().filter(movieID_id=movie.id)
        cast_list = []
        for cast_member in cast:
            cast_list.append(cast_member.actor)
            #cast_list.append(genre.TYPE_CHOICES[int(genre.genre) - 1][1])
        movie_dict["cast"] = cast_list#Cast.objects.all().filter(movieID_id=movie.id)
        movie_list.append(movie_dict)  

    context = {
        'isSuccessful': 'true',
        'list': movie_list
    }
    return JsonResponse(context)

@api_view(['POST'])
def route_save_image(request):
    print("foo")
    print("Posted file: {}".format(request.files['file']))
    print("bar")
    return HttpResponse(200)

@api_view(['GET'])
def route_get_currently_showing_movies(request):
    movie_shows = MovieShow.objects.all()
    movies = Movie.objects.all()
    movie_list = []
    print(movie_shows)

    for movie in movies:
        try:
            movie_show = MovieShow.objects.filter(movieID_id=movie.id)
            print("MOVIE SHOW")
            if len(movie_show) > 0:
                movie_dict = {}
                movie_dict["id"] = movie.id
                movie_dict["title"] = movie.title
                movie_dict["imageSource"] = movie.image_source
                movie_dict["rating"] = movie.rating
                movie_dict["videoLink"] = movie.video_link
                movie_dict["description"] = movie.description
                movie_dict["director"] = movie.director

                movie_list.append(movie_dict)
        except Exception as e:
            print(e)
            print("adfa")
    context = {
        'isSuccessful': 'true',
        'list': movie_list
    }
    return JsonResponse(context)  

@api_view(['GET'])
def route_get_coming_soon_movies(request):
    print("dafda")
    movie_shows = MovieShow.objects.all()
    movies = Movie.objects.all()
    movie_list = []
    print(movie_shows)

    for movie in movies:
        try:
            movie_show = MovieShow.objects.filter(movieID_id=movie.id)
            print("MOVIE SHOW")
            if len(movie_show) == 0:
                movie_dict = {}
                movie_dict["id"] = movie.id
                movie_dict["title"] = movie.title
                movie_dict["imageSource"] = movie.image_source
                movie_dict["rating"] = movie.rating
                movie_dict["videoLink"] = movie.video_link
                movie_dict["description"] = movie.description
                movie_dict["director"] = movie.director

                movie_list.append(movie_dict)
        except Exception as e:
            print(e)
            print("adfa")
    context = {
        'isSuccessful': 'true',
        'list': movie_list
    }
    return JsonResponse(context) 


@api_view(['GET'])
def route_get_movies_genres(request):
    movies_genres = Genre.objects.all()
    genres_list = []
    for genre in movies_genres:
        print(genre.movieID)
        genres_dict = {}
        genres_dict["movieID"] = str(genre.movieID)
        genre_string = ""
        genre_number = int(genre.genre)
    
        if genre_number == 1:
            genre_string = "COMEDY"
        elif genre_number == 2:
            genre_string = "HORROR"
        elif genre_number == 3:
            genre_string = "ACTION"
        elif genre_number == 4:
            genre_string = "ADVENTURE"
        elif genre_number == 5:
            genre_string = "ANIMATION"
        elif genre_number == 6:
            genre_string = "DRAMA"
        elif genre_number == 7:
            genre_string = "FANTASY"
        elif genre_number == 8:
            genre_string = "HISTORICAL"
        elif genre_number == 9:
            genre_string = "SCIENCE FICTION"
        elif genre_number == 10:
            genre_string = "THRILLER"
        else:
            genre_string = "WESTERN"
        genres_dict["genre"] = genre_string
        genres_list.append(genres_dict)
    context = {
        'isSuccessful': 'true',
        'list': genres_list
    }
    return JsonResponse(context)

@api_view(['POST'])
def route_get_movie_by_id(request):
    data = JSONParser().parse(request)
    movie = Movie.objects.get(id=data["id"])
    movie_dict = {}
    #         { "movieID": 1, "title": "Gran Torino", "imageSource": require("../images/grantorino.jpg"), "rating": "R", "videoLink": "https://www.youtube.com/embed/RMhbr2XQblk?&autoplay=1", "description": "Disgruntled Korean War veteran Walt Kowalski sets out to reform his neighbor, Thao Lor, a Hmong teenager who tried to steal Kowalski's prized possession: a 1972 Gran Torino.", "director": "Clint Eastwood" },
    try:
        movie_dict["movieID"] = movie.id
        movie_dict["title"] = movie.title
        movie_dict["imageSource"] = movie.image_source
        movie_dict["rating"] = movie.rating
        movie_dict["videoLink"] = movie.video_link
        movie_dict["description"] = movie.description
        movie_dict["director"] = movie.director
        context = {
            'isSuccessful': 'true',
            'data': movie_dict
        }
    except:
        context = {
            'isSuccessful': 'false'
        }
    return JsonResponse(context)

@api_view(['POST'])
def route_get_genres_by_id(request):
    data = JSONParser().parse(request)
    genres = Genre.objects.filter(movieID_id=data["id"])
    genres_dict = []
    #         { "movieID": 1, "title": "Gran Torino", "imageSource": require("../images/grantorino.jpg"), "rating": "R", "videoLink": "https://www.youtube.com/embed/RMhbr2XQblk?&autoplay=1", "description": "Disgruntled Korean War veteran Walt Kowalski sets out to reform his neighbor, Thao Lor, a Hmong teenager who tried to steal Kowalski's prized possession: a 1972 Gran Torino.", "director": "Clint Eastwood" },
    try:
        for genre in genres:
            
            genre_string = ""
            genre_number = int(genre.genre)
            if genre_number == 1:
                genre_string = "COMEDY"
            elif genre_number == 2:
                genre_string = "HORROR"
            elif genre_number == 3:
                genre_string = "ACTION"
            elif genre_number == 4:
                genre_string = "ADVENTURE"
            elif genre_number == 5:
                genre_string = "ANIMATION"
            elif genre_number == 6:
                genre_string = "DRAMA"
            elif genre_number == 7:
                genre_string = "FANTASY"
            elif genre_number == 8:
                genre_string = "HISTORICAL"
            elif genre_number == 9:
                genre_string = "SCIENCE FICTION"
            elif genre_number == 10:
                genre_string = "THRILLER"
            else:
                genre_string = "WESTERN"
            genres_dict.append(genre_string)
        context = {
            'isSuccessful': 'true',
            'genres': genres_dict
        }
    except Exception as e:
        print(e)
        context = {
            'isSuccessful': 'false'
        }
    return JsonResponse(context)

@api_view(['POST'])
def route_get_movie_by_id(request):
    data = JSONParser().parse(request)
    movie = Movie.objects.get(id=data["id"])
    movie_dict = {}
    #         { "movieID": 1, "title": "Gran Torino", "imageSource": require("../images/grantorino.jpg"), "rating": "R", "videoLink": "https://www.youtube.com/embed/RMhbr2XQblk?&autoplay=1", "description": "Disgruntled Korean War veteran Walt Kowalski sets out to reform his neighbor, Thao Lor, a Hmong teenager who tried to steal Kowalski's prized possession: a 1972 Gran Torino.", "director": "Clint Eastwood" },
    try:
        movie_dict["movieID"] = movie.id
        movie_dict["title"] = movie.title
        movie_dict["imageSource"] = movie.image_source
        movie_dict["rating"] = movie.rating
        movie_dict["videoLink"] = movie.video_link
        movie_dict["description"] = movie.description
        movie_dict["director"] = movie.director
        context = {
            'isSuccessful': 'true',
            'data': movie_dict
        }
    except:
        context = {
            'isSuccessful': 'false'
        }
    return JsonResponse(context)

@api_view(['POST'])
def route_get_cast_by_id(request):
    data = JSONParser().parse(request)
    cast = Cast.objects.filter(movieID_id=data["id"])
    cast_list = []
    #         { "movieID": 1, "title": "Gran Torino", "imageSource": require("../images/grantorino.jpg"), "rating": "R", "videoLink": "https://www.youtube.com/embed/RMhbr2XQblk?&autoplay=1", "description": "Disgruntled Korean War veteran Walt Kowalski sets out to reform his neighbor, Thao Lor, a Hmong teenager who tried to steal Kowalski's prized possession: a 1972 Gran Torino.", "director": "Clint Eastwood" },
    try:
        for actor in cast:
            cast_list.append(actor.actor)
        context = {
            'isSuccessful': 'true',
            'cast': cast_list
        }
    except Exception as e:
        print(e)
        context = {
            'isSuccessful': 'false'
        }
    return JsonResponse(context)

@api_view(['POST'])
def route_get_showtimes_by_id(request):
    data = JSONParser().parse(request)
    showtimes = MovieShow.objects.filter(movieID_id=data["id"])
    showtime_list = []
    #         { "movieID": 1, "title": "Gran Torino", "imageSource": require("../images/grantorino.jpg"), "rating": "R", "videoLink": "https://www.youtube.com/embed/RMhbr2XQblk?&autoplay=1", "description": "Disgruntled Korean War veteran Walt Kowalski sets out to reform his neighbor, Thao Lor, a Hmong teenager who tried to steal Kowalski's prized possession: a 1972 Gran Torino.", "director": "Clint Eastwood" },
    try:
        for showtime in showtimes:
            showtime_dict = {}
            showtime_dict["roomID"] = showtime.roomID_id
            showtime_dict["show_date"] = showtime.show_date
            showtime_dict["show_time"] = showtime.show_time
            showtime_list.append(showtime_dict)
        context = {
            'isSuccessful': 'true',
            'showtimes': showtime_list
        }
    except Exception as e:
        print(e)
        context = {
            'isSuccessful': 'false'
        }
    return JsonResponse(context)

