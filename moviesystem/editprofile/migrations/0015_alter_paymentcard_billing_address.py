# Generated by Django 4.0.3 on 2022-03-30 22:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('editprofile', '0014_paymentcard_last_digits'),
    ]

    operations = [
        migrations.AlterField(
            model_name='paymentcard',
            name='billing_address',
            field=models.CharField(max_length=255),
        ),
    ]
