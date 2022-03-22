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

