from django.shortcuts import render, redirect
from .forms import UserRegisterForm
# Create your views here.
from editprofile.models import *
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


def register(request):

    #print('HELLO I AM HERE')
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form_info = form.cleaned_data

            print(form_info)

            email = form_info.get('email')
            user = User(first_name=form_info.get('first_name'), last_name=form_info.get('last_name'), password=form_info.get('password'), email=email, phone=form_info.get('phone'), status='Inactive', user_type_id=1, promotion=form_info.get('promotion'))
            user.save()


            #send email
            htmly = loader.get_template('users/Email.html')
            d = { 'username': 'ur mom' }
            subject, from_email, to = 'welcome', 'nerd', email
            html_content = htmly.render(d)
            msg = EmailMultiAlternatives(subject, html_content, from_email, [to])
            msg.attach_alternative(html_content, "text/html")
            msg.send()

            #return redirect('')
    else:
        form = UserRegisterForm()

    return render(request, 'users/register.html', {'form' : form})