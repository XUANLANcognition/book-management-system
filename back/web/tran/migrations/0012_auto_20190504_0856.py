# Generated by Django 2.1.2 on 2019-05-04 08:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tran', '0011_auto_20190504_0855'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='follow',
            field=models.ManyToManyField(blank=True, related_name='followed_by', to='tran.Profile'),
        ),
    ]
