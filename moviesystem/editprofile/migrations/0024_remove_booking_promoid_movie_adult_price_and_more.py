# Generated by Django 4.0.3 on 2022-05-05 20:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('editprofile', '0023_ticket_bookingid_alter_booking_cardid_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='booking',
            name='promoID',
        ),
        migrations.AddField(
            model_name='movie',
            name='adult_price',
            field=models.IntegerField(default=7),
        ),
        migrations.AddField(
            model_name='movie',
            name='child_price',
            field=models.IntegerField(default=4),
        ),
        migrations.AddField(
            model_name='movie',
            name='senior_price',
            field=models.IntegerField(default=4),
        ),
    ]