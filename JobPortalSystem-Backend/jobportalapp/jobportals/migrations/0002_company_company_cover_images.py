# Generated by Django 4.0.2 on 2022-06-22 09:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobportals', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='company',
            name='company_cover_images',
            field=models.ImageField(blank=True, default='JobPortalSystemImages/company_cover_images/company_cover_images_default/company-cover-image_nohyrd.png', max_length=400, null=True, upload_to='company_cover_images/'),
        ),
    ]
