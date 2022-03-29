from django import forms
from .models import User, PaymentCard


class EditBasicForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'promotion']

    # def clean(self):
    #     data = self.cleaned_data

#class ViewCardsForm(forms.Form):
    #TODO

class EditCardForm(forms.ModelForm):
    class Meta:
        model = PaymentCard
        fields = ['card_number', 'expiration_date', 'billing_address', 'card_type']

class EditPasswordForm(forms.Form):
    old_password = forms.CharField(widget=forms.PasswordInput)
    new_password = forms.CharField(widget=forms.PasswordInput)
    repeat_new_password = forms.CharField(widget=forms.PasswordInput)

    def clean(self):
        cleaned_data = self.cleaned_data
        new_password = cleaned_data.get('new_password')
        if len(new_password) < 8:
            self.add_error('new_password', 'New password is too short.')
        repeat_new_password = cleaned_data.get('repeat_new_password')
        if repeat_new_password != new_password:
            self.add_error('repeat_new_password', 'Passwords don\'t match')
        return cleaned_data
