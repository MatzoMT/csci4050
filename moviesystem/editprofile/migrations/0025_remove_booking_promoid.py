# Generated by Django 4.0.3 on 2022-05-06 00:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('editprofile', '0024_merge_20220505_2011'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='booking',
            name='promoID',
        ),
    ]
