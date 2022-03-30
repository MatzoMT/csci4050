from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
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
@api_view(['GET'])
def route_get_movies(request):
    print("hello")

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
    try:
        response = {
            'requestSuccess': request_success,
            'email': data['email'],
            'firstName': users[0].first_name,
            'lastName': users[0].last_name,
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
    users = User.objects.all().filter(email=data['email'], user_type=1)
    # check_password(original_password, make_password result)
    if len(users) > 0 and check_password(data['password'], users[0].password)==True:
        login_success = "true"
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
        'isAdmin': is_admin
    }
    return JsonResponse(response)

@api_view(['POST'])
def route_create_payment(request):
    try:
        data = JSONParser().parse(request)
        user = User.objects.all().get(email=data["email"])
        card = PaymentCard(card_type=data['cardType'], card_number=data['cardNumber'], user=user, billing_address=data["billingAddress"], expiration_date=data["expirationDate"])
        card.save()
        response = {
            'success': 'true'
        }
    except Exception as err:
        print(err)
        response = {
            'success': 'false'
        }
    return JsonResponse(response)


@api_view(['POST'])
def route_send_password_reset_email(request):
    try:
        data = JSONParser().parse(request)
        name = data["name"]
        email = data["email"]
        #send email
        htmly = loader.get_template('users/ResetPasswordEmail.html')
        d = { 'username': name }
        subject, from_email, to = 'Welcome,', name, email
        html_content = htmly.render(d)
        msg = EmailMultiAlternatives(subject, html_content, from_email, [to])
        msg.attach_alternative(html_content, "text/html")
        msg.send()
        response = {
        'loginSuccess': "true"
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

    name = data['firstName']
    confirm_password = data['confirm_password']
    password = data['password']
    if len(password) < 8:
        creation_success = "false"
        err_msg = "The password is not long enough."
    if password != confirm_password:
        creation_success = "false"
        err_msg = "The passwords do not match."


    print("confirmed:" + creation_success)

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
        htmly = loader.get_template('users/Email.html')
        d = { 'username': name }
        subject, from_email, to = 'Welcome,', name, email
        html_content = htmly.render(d)
        msg = EmailMultiAlternatives(subject, html_content, from_email, [to])
        msg.attach_alternative(html_content, "text/html")
        msg.send()
    
        
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
def route_edit_profile(request):
    
	try:
		user = User.objects.get(pk=1)
	except User.DoesNotExist:
		raise Http404("User does not exist")
	form = EditBasicForm(instance=user, data=request.POST or None)
	context = {
		'form': form,
        'user': user,
    }
	if form.is_valid():
		user = form.save(commit=False)
		user.save()
		return redirect('/editprofile')

	template = loader.get_template('editprofile/edit.html')
	return HttpResponse(template.render(context, request))

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

@api_view(['GET'])
def route_get_cards(request):
    try:
        user = User.objects.get(pk=1)
    except User.DoesNotExist:
        raise Http404("User does not exist")

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

    context = {
        'list': card_list,
    }
    #return JsonResponse(context)

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