# Generated by Django 4.0.3 on 2022-04-17 21:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('editprofile', '0017_movie_genre_cast'),
    ]

    operations = [
        migrations.CreateModel(
            name='Promotion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('promotion_code', models.CharField(max_length=255)),
                ('promotion_discount', models.IntegerField()),
                ('promotion_expiry', models.CharField(max_length=255)),
            ],
        ),
    ]
