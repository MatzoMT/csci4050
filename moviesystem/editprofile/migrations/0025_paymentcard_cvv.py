# Generated by Django 4.0.3 on 2022-05-05 20:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('editprofile', '0024_remove_booking_promoid_movie_adult_price_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='paymentcard',
            name='cvv',
            field=models.CharField(default='000', max_length=3),
        ),
    ]
