from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import datetime
from ckeditor.fields import RichTextField
from cloudinary_storage.storage import RawMediaCloudinaryStorage


# chung
class BaseModel(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


# tinh thanh
class City(models.Model):
    city_name = models.CharField(max_length=30)

    def __str__(self):
        return self.city_name


# chuc vu
class Position(models.Model):
    position_name = models.CharField(max_length=100)

    def __str__(self):
        return self.position_name


# nganh nghe
class Career(models.Model):
    career_name = models.CharField(max_length=100)

    def __str__(self):
        return self.career_name


# hinh thuc lam viec
class WorkingForm(models.Model):
    working_form_name = models.CharField(max_length=100)

    def __str__(self):
        return self.working_form_name


# kinh nghiem
class Experience(models.Model):
    experience_name = models.CharField(max_length=100)

    def __str__(self):
        return self.experience_name


# muc luong
class Salary(models.Model):
    salary_name = models.CharField(max_length=100)

    def __str__(self):
        return self.salary_name


# user
class User(AbstractUser):
    first_name = None
    last_name = None
    email = models.EmailField(unique=True)
    avatar = models.ImageField(upload_to="avatars/", null=True, blank=True,
                               default="JobPortalSystemImages/avatars/AvatarDefault/avatar_iponoz.png",
                               max_length=400)
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return self.username


# cong ty
class Company(models.Model):
    company_name = models.CharField(max_length=255, unique=True)
    field_operation = models.CharField(max_length=255)
    company_size = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    tax_id_number = models.CharField(max_length=15, blank=True)
    company_website_url = models.CharField(max_length=255, blank=True)
    address = models.CharField(max_length=255)
    company_description = RichTextField(blank=True)
    company_cover_image = models.ImageField(upload_to="company_cover_images/", null=True, blank=True,
                                            default="JobPortalSystemImages/company_cover_images/company_cover_images_default/company-cover-image_nohyrd.png",
                                            max_length=400)
    city = models.ForeignKey('City', on_delete=models.SET_NULL, null=True,
                             related_name='companies')
    recruiter = models.OneToOneField('User', on_delete=models.CASCADE,
                                     related_name='company')
    commenters = models.ManyToManyField('User', through='Comment',
                                        related_name='company_comments')
    raters = models.ManyToManyField('User', through='Rating',
                                    related_name='company_ratings')

    def __str__(self):
        return self.company_name


# hinh anh cong ty
class ImageCompany(models.Model):
    image_url = models.ImageField(upload_to="company_images/", max_length=400, blank=True)
    company = models.ForeignKey('Company', on_delete=models.CASCADE, null=True,
                                related_name='image_companies')

    class Meta:
        ordering = ['-id']


# danh gia
class Rating(BaseModel):
    rating = models.SmallIntegerField(default=5)
    user = models.ForeignKey('User', on_delete=models.CASCADE,
                             related_name='ratings')
    company = models.ForeignKey('Company', on_delete=models.CASCADE,
                                related_name='ratings')

    def __str__(self):
        return "{0} - {1} - {2}".format(self.rating, self.user, self.company)


# binh luan
class Comment(BaseModel):
    content = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    user = models.ForeignKey('User', on_delete=models.CASCADE,
                             related_name='comments')
    company = models.ForeignKey('Company', on_delete=models.CASCADE,
                                related_name='comments')

    def __str__(self):
        return self.content


# ho so ung vien
class JobSeekerProfile(BaseModel):
    GENDER_CHOICES = ((1, 'Nam'), (2, 'Nữ'), (3, 'Khác'))
    MARITAL_STATUS_CHOICES = ((1, 'Độc thân'), (2, 'Đã có gia đình'))

    full_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    gender = models.IntegerField(choices=GENDER_CHOICES, default=1)
    date_of_birth = models.DateTimeField()
    marital_status = models.IntegerField(choices=MARITAL_STATUS_CHOICES,
                                         default=1)
    address = models.CharField(max_length=100)
    career_goals = RichTextField(blank=True)
    personal_skills = RichTextField(blank=True)

    city = models.ForeignKey('City', on_delete=models.SET_NULL, null=True,
                             related_name='job_seeker_profiles')
    job_seeker = models.OneToOneField('User', on_delete=models.CASCADE,
                                      related_name='job_seeker_profile')

    def __str__(self):
        return "{0} - {1} - {2}".format(self.id, self.job_seeker,
                                        self.date_of_birth.strftime("%m/%d/%Y"))


# hoc van cua ung vien
class EducationDetail(models.Model):
    degree_name = models.CharField(max_length=200)
    major = models.CharField(max_length=255)
    training_place_name = models.CharField(max_length=255)
    start_date = models.DateTimeField()
    completed_date = models.DateTimeField()
    gpa = models.DecimalField(max_digits=2, decimal_places=1)
    description = RichTextField(blank=True)

    job_seeker_profile = models.OneToOneField('JobSeekerProfile', on_delete=models.CASCADE,
                                              related_name='education_detail')

    def __str__(self):
        return 'Bằng cấp: {0}, ngành: {1}'.format(self.degree_name, self.major)


# kinh nghiem lam viec cua ung vien
class ExperienceDetail(models.Model):
    job_name = models.CharField(max_length=200)
    job_position = models.CharField(max_length=200)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    company_name = models.CharField(max_length=255)
    description = RichTextField(blank=True)

    job_seeker_profile = models.ForeignKey('JobSeekerProfile', on_delete=models.CASCADE,
                                           related_name='experience_details')

    def __str__(self):
        return 'Job name: {0}, position: {1}, company name: {2}'.format(self.job_name, self.job_position,
                                                                        self.company_name)


# cong viec mong muon cua ung vien
class DesiredJob(models.Model):
    job_name = models.CharField(max_length=200)

    position = models.ForeignKey('Position', on_delete=models.SET_NULL, null=True,
                                 related_name='desired_jobs')
    working_form = models.ForeignKey('WorkingForm', on_delete=models.SET_NULL, null=True,
                                     related_name='desired_jobs')
    experience = models.ForeignKey('Experience', on_delete=models.SET_NULL, null=True,
                                   related_name='desired_jobs')
    salary = models.ForeignKey('Salary', on_delete=models.SET_NULL, null=True,
                               related_name='desired_jobs')
    city = models.ForeignKey('City', related_name='city_desired_jobs',
                             on_delete=models.SET_NULL, null=True)
    job_seeker_profile = models.OneToOneField('JobSeekerProfile', on_delete=models.CASCADE,
                                              related_name='desired_job')

    career = models.ForeignKey('Career', on_delete=models.SET_NULL,
                               null=True, related_name='career_desired_jobs')

    def __str__(self):
        return self.job_name


# cv cua ung vien
class CurriculumVitae(models.Model):
    url_cv = models.FileField(upload_to="seeker_cv/", max_length=350, blank=True,
                              storage=RawMediaCloudinaryStorage)
    job_seeker_profile = models.OneToOneField('JobSeekerProfile', on_delete=models.CASCADE,
                                              related_name='curriculum_vitae')


# bai dang cua nha tuyen dung
class JobPost(BaseModel):
    GENDER_CHOICES = ((0, 'Không yêu cầu'), (1, 'Nam'), (2, 'Nữ'), (3, 'Khác'))

    is_active = models.BooleanField(default=True)
    is_urgent_job = models.BooleanField(default=False)
    job_name = models.CharField(max_length=255)
    job_detail = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    probationary_period = models.CharField(max_length=100)
    quantity = models.IntegerField(default=1)
    job_description = RichTextField(blank=True)
    degree_required = models.CharField(max_length=200)
    gender_required = models.IntegerField(choices=GENDER_CHOICES, default=0)
    job_requirement = RichTextField()
    benefits_enjoyed = RichTextField()
    request_profile = RichTextField()
    deadline = models.DateTimeField()
    contact_person_name = models.CharField(max_length=100)
    contact_address = models.CharField(max_length=255)
    contact_phone_number = models.CharField(max_length=15)
    contact_email = models.CharField(max_length=100)

    recruiter = models.ForeignKey('User', on_delete=models.CASCADE,
                                  null=True, related_name='job_posts')
    position = models.ForeignKey('Position', on_delete=models.SET_NULL,
                                 null=True, related_name='job_posts')
    city = models.ForeignKey('City', on_delete=models.SET_NULL,
                             null=True, related_name='job_posts')
    career = models.ForeignKey('Career', on_delete=models.SET_NULL,
                               null=True, related_name='job_posts')
    working_form = models.ForeignKey('WorkingForm', on_delete=models.SET_NULL,
                                     null=True, related_name='job_posts')
    salary = models.ForeignKey('Salary', on_delete=models.SET_NULL,
                               null=True, related_name='job_posts')
    experience = models.ForeignKey('Experience', on_delete=models.SET_NULL,
                                   null=True, related_name='job_posts')

    seekers = models.ManyToManyField('User', through='JobPostActivity',
                                     related_name='seeker_job_posts',
                                     blank=True)
    save_seekers = models.ManyToManyField('User', through='SaveJobPost',
                                          related_name='seeker_save_job_posts',
                                          blank=True)
    tags = models.ManyToManyField('Tag', related_name='job_posts', blank=True)

    class Meta:
        ordering = ['-created_date', '-updated_date']

    def __str__(self):
        return 'Job name: {0}, Deadline: {1}'.format(self.job_name,
                                                     self.deadline.strftime("%m/%d/%Y, %H:%M:%S"))


# ung vien ung tuyen
class JobPostActivity(models.Model):
    STATUS = ((0, 'Chưa duyệt'), (1, 'Đạt yêu cầu'), (2, 'Chưa đạt yêu cầu'))
    status = models.IntegerField(choices=STATUS, default=0)
    apply_date = models.DateTimeField(auto_now_add=True)
    seeker = models.ForeignKey('User', on_delete=models.CASCADE, related_name='job_posts_activity')
    job_post = models.ForeignKey('JobPost', on_delete=models.CASCADE, related_name='job_posts_activity')

    def __str__(self):
        return 'Seeker: {0}, apply: {1}'.format(self.seeker, self.apply_date)


# tag cua bai dang
class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


# ung vien luu bai viet
class SaveJobPost(BaseModel):
    seeker = models.ForeignKey('User', on_delete=models.CASCADE,
                               related_name='save_job_posts')
    job_post = models.ForeignKey('JobPost', on_delete=models.CASCADE,
                                 related_name='save_job_posts')


# view chung
class BaseView(BaseModel):
    view = models.IntegerField(default=0)

    class Meta:
        abstract = True


# luot xem profile ung vien
class ViewJobSeekerProfile(BaseView):
    job_seeker_profile = models.OneToOneField('JobSeekerProfile', related_name='view', on_delete=models.CASCADE)


# luot xem cong ty
class ViewCompanyProfile(BaseView):
    company = models.OneToOneField('Company', related_name='view', on_delete=models.CASCADE)


# luot xem cua bai dang tuyen dung
class ViewJobPost(BaseView):
    job_post = models.OneToOneField('JobPost', related_name='view', on_delete=models.CASCADE)

