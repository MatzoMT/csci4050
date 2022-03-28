from django import forms
from django.contrib.auth.forms import UserCreationForm



#first name
#last name
#age
#email
#password
#confirm password

class UserRegisterForm(forms.Form):
    first_name = forms.CharField()
    last_name = forms.CharField()
    email = forms.EmailField()
    phone = forms.CharField()
    password = forms.CharField(max_length=20, widget=forms.PasswordInput) 
    confirm_password = forms.CharField(max_length=20, widget=forms.PasswordInput) 
    promotion = forms.BooleanField()
    #


    def clean(self):
        cleaned_data = self.cleaned_data
        pass1 = cleaned_data.get('password')
        pass2 = cleaned_data.get('confirm_password')
        
        if pass1 != pass2:
            self.add_error('confirm_password', 'Passwords don\'t match')

        return cleaned_data










