# Generated by Django 4.0.2 on 2022-06-22 09:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jobportals', '0002_company_company_cover_images'),
    ]

    operations = [
        migrations.RenameField(
            model_name='company',
            old_name='company_cover_images',
            new_name='company_cover_image',
        ),
    ]
