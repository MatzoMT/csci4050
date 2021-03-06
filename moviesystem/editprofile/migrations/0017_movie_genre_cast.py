# Generated by Django 4.0.3 on 2022-04-11 23:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('editprofile', '0016_alter_user_email_alter_user_first_name_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('image_source', models.CharField(max_length=255)),
                ('rating', models.CharField(max_length=10)),
                ('video_link', models.CharField(max_length=255)),
                ('description', models.CharField(max_length=255)),
                ('director', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('genre', models.CharField(choices=[('1', 'COMEDY'), ('2', 'HORROR'), ('3', 'ACTION'), ('4', 'ADVENTURE'), ('5', 'ANIMATION'), ('6', 'DRAMA'), ('7', 'FANTASY'), ('8', 'HISTORICAL'), ('9', 'SCIENCE FICTION'), ('10', 'THRILLER'), ('11', 'WESTERN')], max_length=3)),
                ('movieID', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='editprofile.movie')),
            ],
        ),
        migrations.CreateModel(
            name='Cast',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('actor', models.CharField(max_length=255)),
                ('movieID', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='editprofile.movie')),
            ],
        ),
    ]
