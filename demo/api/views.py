from django.shortcuts import render
from django.http import HttpResponse, JsonResponse


# Create your views here.
def test(request):
    data = {
        'name': 'Pekka',
        'location': 'Finland',
        'city': 'Espoo'
    }
    return JsonResponse(data)