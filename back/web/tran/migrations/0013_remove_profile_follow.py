# Generated by Django 2.1.2 on 2019-05-04 08:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tran', '0012_auto_20190504_0856'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='follow',
        ),
    ]
