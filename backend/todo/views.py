from django.shortcuts import render
 
# import view sets from the REST framework
from rest_framework import viewsets
 
# import the TodoSerializer from the serializer file
from .serializers import TodoSerializer
 
# import the Todo model from the models file
from .models import Todo

from django.http import HttpResponse, JsonResponse

 
# create a class for the Todo model viewsets
class TodoView(viewsets.ModelViewSet):
 
    # create a serializer class and
    # assign it to the TodoSerializer class
    serializer_class = TodoSerializer
 
    # define a variable and populate it
    # with the Todo list objects
    queryset = Todo.objects.all()

def test(request):
    data = {
        'name': 'Pekka',
        'location': 'Finland',
        'city': 'Espoo'
    }
    return JsonResponse(data)
