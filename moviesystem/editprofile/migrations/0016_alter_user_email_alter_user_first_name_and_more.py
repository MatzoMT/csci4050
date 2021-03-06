# Generated by Django 4.0.3 on 2022-03-31 03:27

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('editprofile', '0015_alter_paymentcard_billing_address'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.CharField(max_length=255, unique=True, validators=[django.core.validators.EmailValidator]),
        ),
        migrations.AlterField(
            model_name='user',
            name='first_name',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='user',
            name='last_name',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='user',
            name='phone',
            field=models.CharField(default='12345678', max_length=255),
        ),
        migrations.AlterField(
            model_name='user',
            name='status',
            field=models.CharField(default='Inactive', max_length=255),
        ),
    ]
