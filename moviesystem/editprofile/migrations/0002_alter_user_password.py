# Generated by Django 4.0.3 on 2022-03-28 15:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('editprofile', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='password',
            field=models.CharField(default='password', max_length=64),
        ),
    ]
