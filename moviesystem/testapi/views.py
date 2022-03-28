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

from django.http import HttpResponse, Http404

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

# End point for email (username), password verification
# Checks for matches in Django / MySQL database
# JSON 'email' return values are "true" or "false"
@api_view(['POST'])
def route_login(request):
    data = JSONParser().parse(request)
    login_success = "false"
    users = User.objects.all().filter(email=data['email'])
    if len(users) > 0 and users[0].password==data['password']:
        login_success = "true"
    response = {
        'loginSuccess': login_success,
        'email': data['email']
    }
    return JsonResponse(response)

# Post username and password
# If there is a query with a matching username and password, return true
# else, return false
@api_view(['POST'])
def route_create_user(request):
    # Check request to see if it has all fields
    # replace below 
    users = User.objects.all()
    user = User(first_name='Spider', last_name='Man', password='password', email='spodermin@gmail.com', phone='987654321', status='Inactive', user_type_id=1, promotion=1)
    user.save()
    for user in users:
        print(user)
        print(user.password)
    return HttpResponse(users)

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