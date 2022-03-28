from django.shortcuts import render, redirect
from editprofile.forms import EditBasicForm, EditCardForm
from django.views.generic.edit import UpdateView
from editprofile.models import *
from django.template import loader
from django.contrib import messages
from django.contrib.auth.forms import PasswordChangeForm

from django.contrib.auth.hashers import make_password, check_password

from django.http import HttpResponse, Http404

def index(request):
	try:
		user = User.objects.get(pk=1)
	except User.DoesNotExist:
		raise Http404("User does not exist")
	
	template = loader.get_template('editprofile/index.html')
	context = {
        'user': user,
    }
	return HttpResponse(template.render(context, request))

def edit_profile(request):
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

def cards_view(request):
	try:
		user = User.objects.get(pk=1)
	except User.DoesNotExist:
		raise Http404("User does not exist")

	card_list = PaymentCard.objects.filter(user=user)
	print(card_list)
	context = {
		'list': card_list,
	}
	
	template = loader.get_template('editprofile/cardsview.html')
	return HttpResponse(template.render(context, request))


def edit_card(request):
	try:
		user = User.objects.get(pk=1)
	except User.DoesNotExist:
		raise Http404("User does not exist")
	form = EditCardForm(instance=user, data=request.POST or None)
	context = {
		'form': form,
        'user': user,
    }
	if form.is_valid():
		user = form.save(commit=False)
		user.save()
		return redirect('/editprofile')

	template = loader.get_template('editprofile/editcard.html')
	return HttpResponse(template.render(context, request))

def edit_password(request):
	try:
		user = User.objects.get(pk=1)
	except User.DoesNotExist:
		raise Http404("User does not exist")
	
	form = EditPasswordForm(request.POST or None)
	if form.is_valid():
		print("old_inp", form.cleaned_data.get('old_password'))
		print("old_encry", user.password)
		matches = check_password(form.cleaned_data.get('old_password'), user.password)
		print(matches)
		if(matches):
			user.password = make_password(form.cleaned_data.get('new_password'))
			user.save()
			messages.success(request, 'Your password was successfully updated!')
			return redirect('/editprofile')
		else:
			messages.error(request, 'Please correct the error below.')
	else:
		form = PasswordChangeForm(user)
	return render(request, "editprofile/editpassword.html", {
		'form': form
	})