# Generated by Django 2.1.2 on 2019-06-25 06:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tran', '0025_profile_media_editor_auth'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='property',
            field=models.IntegerField(default=100),
        ),
    ]
