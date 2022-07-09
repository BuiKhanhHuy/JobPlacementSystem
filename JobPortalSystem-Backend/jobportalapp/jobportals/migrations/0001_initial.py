# Generated by Django 4.0.2 on 2022-05-22 19:02

import ckeditor.fields
import cloudinary_storage.storage
from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('avatar', models.ImageField(blank=True, default='JobPortalSystemImages/avatars/AvatarDefault/avatar_iponoz.png', max_length=400, null=True, upload_to='avatars/')),
                ('is_active', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Career',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('career_name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('city_name', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('content', models.CharField(max_length=255)),
                ('is_active', models.BooleanField(default=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_name', models.CharField(max_length=255, unique=True)),
                ('field_operation', models.CharField(max_length=255)),
                ('company_size', models.CharField(max_length=100)),
                ('phone_number', models.CharField(max_length=15)),
                ('tax_id_number', models.CharField(blank=True, max_length=15)),
                ('company_website_url', models.CharField(blank=True, max_length=255)),
                ('address', models.CharField(max_length=255)),
                ('company_description', ckeditor.fields.RichTextField(blank=True)),
                ('city', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='companies', to='jobportals.city')),
                ('commenters', models.ManyToManyField(related_name='company_comments', through='jobportals.Comment', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Experience',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('experience_name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='JobPost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_urgent_job', models.BooleanField(default=False)),
                ('job_name', models.CharField(max_length=255)),
                ('job_detail', models.CharField(max_length=255)),
                ('address', models.CharField(max_length=255)),
                ('probationary_period', models.CharField(max_length=100)),
                ('quantity', models.IntegerField(default=1)),
                ('job_description', ckeditor.fields.RichTextField(blank=True)),
                ('degree_required', models.CharField(max_length=200)),
                ('gender_required', models.IntegerField(choices=[(0, 'Không yêu cầu'), (1, 'Nam'), (2, 'Nữ'), (3, 'Khác')], default=0)),
                ('job_requirement', ckeditor.fields.RichTextField()),
                ('benefits_enjoyed', ckeditor.fields.RichTextField()),
                ('request_profile', ckeditor.fields.RichTextField()),
                ('deadline', models.DateTimeField()),
                ('contact_person_name', models.CharField(max_length=100)),
                ('contact_address', models.CharField(max_length=255)),
                ('contact_phone_number', models.CharField(max_length=15)),
                ('contact_email', models.CharField(max_length=100)),
                ('career', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='job_posts', to='jobportals.career')),
                ('city', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='job_posts', to='jobportals.city')),
                ('experience', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='job_posts', to='jobportals.experience')),
            ],
            options={
                'ordering': ['-created_date', '-updated_date'],
            },
        ),
        migrations.CreateModel(
            name='JobSeekerProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('full_name', models.CharField(max_length=100)),
                ('phone_number', models.CharField(max_length=15)),
                ('gender', models.IntegerField(choices=[(1, 'Nam'), (2, 'Nữ'), (3, 'Khác')], default=1)),
                ('date_of_birth', models.DateTimeField()),
                ('marital_status', models.IntegerField(choices=[(1, 'Độc thân'), (2, 'Đã có gia đình')], default=1)),
                ('address', models.CharField(max_length=100)),
                ('career_goals', ckeditor.fields.RichTextField(blank=True)),
                ('personal_skills', ckeditor.fields.RichTextField(blank=True)),
                ('city', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='job_seeker_profiles', to='jobportals.city')),
                ('job_seeker', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='job_seeker_profile', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Position',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('position_name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Salary',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('salary_name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='WorkingForm',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('working_form_name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='ViewJobSeekerProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('view', models.IntegerField(default=0)),
                ('job_seeker_profile', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='view', to='jobportals.jobseekerprofile')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ViewJobPost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('view', models.IntegerField(default=0)),
                ('job_post', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='view', to='jobportals.jobpost')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ViewCompanyProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('view', models.IntegerField(default=0)),
                ('company', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='view', to='jobportals.company')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='SaveJobPost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('job_post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='save_job_posts', to='jobportals.jobpost')),
                ('seeker', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='save_job_posts', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Rating',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('rating', models.SmallIntegerField(default=5)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ratings', to='jobportals.company')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ratings', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='JobPostActivity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.IntegerField(choices=[(0, 'Chưa duyệt'), (1, 'Đạt yêu cầu'), (2, 'Chưa đạt yêu cầu')], default=0)),
                ('apply_date', models.DateTimeField(auto_now_add=True)),
                ('job_post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='job_posts_activity', to='jobportals.jobpost')),
                ('seeker', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='job_posts_activity', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='jobpost',
            name='position',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='job_posts', to='jobportals.position'),
        ),
        migrations.AddField(
            model_name='jobpost',
            name='recruiter',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='job_posts', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='jobpost',
            name='salary',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='job_posts', to='jobportals.salary'),
        ),
        migrations.AddField(
            model_name='jobpost',
            name='save_seekers',
            field=models.ManyToManyField(blank=True, related_name='seeker_save_job_posts', through='jobportals.SaveJobPost', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='jobpost',
            name='seekers',
            field=models.ManyToManyField(blank=True, related_name='seeker_job_posts', through='jobportals.JobPostActivity', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='jobpost',
            name='tags',
            field=models.ManyToManyField(blank=True, related_name='job_posts', to='jobportals.Tag'),
        ),
        migrations.AddField(
            model_name='jobpost',
            name='working_form',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='job_posts', to='jobportals.workingform'),
        ),
        migrations.CreateModel(
            name='ImageCompany',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_url', models.ImageField(blank=True, max_length=400, upload_to='company_images/')),
                ('company', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='image_companies', to='jobportals.company')),
            ],
            options={
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='ExperienceDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_name', models.CharField(max_length=200)),
                ('job_position', models.CharField(max_length=200)),
                ('start_date', models.DateTimeField()),
                ('end_date', models.DateTimeField()),
                ('company_name', models.CharField(max_length=255)),
                ('description', ckeditor.fields.RichTextField(blank=True)),
                ('job_seeker_profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='experience_details', to='jobportals.jobseekerprofile')),
            ],
        ),
        migrations.CreateModel(
            name='EducationDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('degree_name', models.CharField(max_length=200)),
                ('major', models.CharField(max_length=255)),
                ('training_place_name', models.CharField(max_length=255)),
                ('start_date', models.DateTimeField()),
                ('completed_date', models.DateTimeField()),
                ('gpa', models.DecimalField(decimal_places=1, max_digits=2)),
                ('description', ckeditor.fields.RichTextField(blank=True)),
                ('job_seeker_profile', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='education_detail', to='jobportals.jobseekerprofile')),
            ],
        ),
        migrations.CreateModel(
            name='DesiredJob',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_name', models.CharField(max_length=200)),
                ('career', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='career_desired_jobs', to='jobportals.career')),
                ('city', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='city_desired_jobs', to='jobportals.city')),
                ('experience', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='desired_jobs', to='jobportals.experience')),
                ('job_seeker_profile', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='desired_job', to='jobportals.jobseekerprofile')),
                ('position', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='desired_jobs', to='jobportals.position')),
                ('salary', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='desired_jobs', to='jobportals.salary')),
                ('working_form', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='desired_jobs', to='jobportals.workingform')),
            ],
        ),
        migrations.CreateModel(
            name='CurriculumVitae',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url_cv', models.FileField(blank=True, max_length=350, storage=cloudinary_storage.storage.RawMediaCloudinaryStorage, upload_to='seeker_cv/')),
                ('job_seeker_profile', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='curriculum_vitae', to='jobportals.jobseekerprofile')),
            ],
        ),
        migrations.AddField(
            model_name='company',
            name='raters',
            field=models.ManyToManyField(related_name='company_ratings', through='jobportals.Rating', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='company',
            name='recruiter',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='company', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='comment',
            name='company',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='jobportals.company'),
        ),
        migrations.AddField(
            model_name='comment',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to=settings.AUTH_USER_MODEL),
        ),
    ]