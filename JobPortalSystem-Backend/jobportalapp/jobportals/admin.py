from django.template.response import HttpResponse

import django
from django.contrib import admin
from django.urls import path
from django.template.response import TemplateResponse
from .models import (User, JobSeekerProfile,
                     EducationDetail, ExperienceDetail,
                     DesiredJob, JobPost, JobPostActivity,
                     City, Career, WorkingForm, Experience,
                     Salary, Company, ImageCompany, Rating, Comment,
                     Position, CurriculumVitae, ViewCompanyProfile,
                     ViewJobSeekerProfile, ViewJobPost)
from django.contrib.auth.models import Group
from django.utils.html import mark_safe
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django.conf import settings


class JobPortalAppAdmin(admin.AdminSite):
    index_template = 'admin/index.html'


class CareerAdmin(admin.ModelAdmin):
    list_display = ['id', 'career_name']
    list_display_links = ['career_name']
    search_fields = ['career_name']
    list_filter = ['id', 'career_name']


class WorkingFormAdmin(admin.ModelAdmin):
    list_display = ['id', 'working_form_name']
    list_display_links = ['working_form_name']
    search_fields = ['working_form_name']
    list_filter = ['id', 'working_form_name']


class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['id', 'experience_name']
    list_display_links = ['experience_name']
    search_fields = ['experience_name']
    list_filter = ['id', 'experience_name']


class SalaryAdmin(admin.ModelAdmin):
    list_display = ['id', 'salary_name']
    list_display_links = ['salary_name']
    search_fields = ['salary_name']
    list_filter = ['id', 'salary_name']


class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'show_avatar', 'username', 'email', 'is_superuser',
                    'is_staff',
                    'is_active', 'date_joined']
    list_display_links = ['id', 'show_avatar', 'username']
    readonly_fields = ['show_avatar']
    search_fields = ['username', 'email']
    list_filter = ['id', 'username', 'email', 'is_superuser', 'is_staff',
                   'is_active', 'date_joined']

    def show_avatar(self, user):
        if user:
            return mark_safe(
                r"""<img src='{0}{1}'
                alt='{2}' class='rounded-circle' width='75px' height='75px'/>""".format(
                    settings.FULL_URL_CLOUDINARY, user.avatar.name, user.username)
            )


class GroupAdmin(admin.ModelAdmin):
    search_fields = ["name"]
    list_filter = ["name"]


class JobSeekerProfileForm(forms.ModelForm):
    career_goals = forms.CharField(widget=CKEditorUploadingWidget)
    personal_skills = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = JobSeekerProfile
        fields = '__all__'


class JobSeekerProfileAdmin(admin.ModelAdmin):
    list_display = ['id', 'full_name', 'job_seeker', 'gender', 'date_of_birth',
                    'marital_status', 'phone_number', 'address', 'city']
    list_display_links = ['full_name', 'job_seeker']
    search_fields = ['job_seeker', 'full_name',  'phone_number', 'marital_status', 'city']
    list_filter = ['id', 'full_name', 'job_seeker', 'gender', 'marital_status', 'phone_number', 'city']
    form = JobSeekerProfileForm


class ViewJobSeekerProfileAdmin(admin.ModelAdmin):
    list_display = ['id', 'view', 'created_date', 'updated_date', 'job_seeker_profile']
    list_display_links = ['id', 'view']
    search_fields = ['view']
    list_filter = ['id', 'view', 'created_date', 'updated_date']
    readonly_fields = ['view']


class EducationDetailForm(forms.ModelForm):
    description = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = EducationDetail
        fields = '__all__'


class EducationDetailAdmin(admin.ModelAdmin):
    list_display = ['id', 'degree_name', 'major', 'training_place_name', 'start_date', 'completed_date', 'gpa',
                    'description', 'job_seeker_profile']
    list_display_links = ['degree_name']
    search_fields = ['degree_name', 'major', 'training_place_name']
    list_filter = ['id', 'degree_name', 'major', 'training_place_name', 'start_date', 'completed_date', 'gpa',
                   'job_seeker_profile']
    form = EducationDetailForm


class ExperienceDetailForm(forms.ModelForm):
    description = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = ExperienceDetail
        fields = '__all__'


class ExperienceDetailAdmin(admin.ModelAdmin):
    list_display = ['id', 'job_name', 'job_position', 'start_date', 'end_date', 'company_name',
                    'job_seeker_profile']
    list_display_links = ['job_name', 'job_position']
    search_fields = ['job_name', 'job_position', 'company_name']
    list_filter = ['id', 'job_name', 'job_position', 'start_date', 'end_date', 'company_name']
    form = ExperienceDetailForm


class DesiredJobAdmin(admin.ModelAdmin):
    list_display = ['id', 'job_name', 'experience', 'job_seeker_profile', 'position', 'salary', 'working_form']
    list_display_links = ['job_name']
    search_fields = ['job_name', 'experience', 'position', 'working_form']
    list_filter = ['id', 'job_name', 'experience', 'job_seeker_profile', 'position', 'salary', 'working_form']


class CurriculumVitaeAdmin(admin.ModelAdmin):
    list_display = ['id', 'url_cv', 'job_seeker_profile']
    list_display_links = ['url_cv']
    search_fields = ['job_seeker_profile']
    list_filter = ['id', 'job_seeker_profile']


class CompanyForm(forms.ModelForm):
    company_description = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Company
        fields = '__all__'


class CompanyAdmin(admin.ModelAdmin):
    list_display = ['id', 'company_name', 'field_operation', 'company_size', 'phone_number', 'tax_id_number',
                    'address', 'city', 'recruiter']
    list_display_links = ['company_name']
    search_fields = ['company_name', 'field_operation', 'tax_id_number', 'city']
    list_filter = ['id', 'company_name', 'field_operation', 'company_size', 'phone_number', 'tax_id_number',
                   'city', 'recruiter']
    form = CompanyForm


class ImageCompanyAdmin(admin.ModelAdmin):
    list_display = ['id', 'image_url', 'company']
    list_display_links = ['id', 'image_url', 'company']
    search_fields = ['id', 'company']
    list_filter = ['id', 'company']
    form = CompanyForm


class ViewCompanyProfileAdmin(admin.ModelAdmin):
    list_display = ['id', 'view', 'created_date', 'updated_date', 'company']
    list_display_links = ['id', 'view']
    search_fields = ['view']
    list_filter = ['id', 'view', 'created_date', 'updated_date']
    readonly_fields = ['view']


class JobPostForm(forms.ModelForm):
    job_description = forms.CharField(widget=CKEditorUploadingWidget)
    job_requirement = forms.CharField(widget=CKEditorUploadingWidget)
    benefits_enjoyed = forms.CharField(widget=CKEditorUploadingWidget)
    request_profile = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = JobPost
        fields = '__all__'


class JobPostAdmin(admin.ModelAdmin):
    list_display = ['id', 'job_name', 'created_date', 'updated_date', 'is_active', 'address', 'city',
                    'probationary_period', 'quantity', 'degree_required', 'gender_required',
                    'deadline', 'career', 'position', 'recruiter', 'salary', 'working_form']
    list_display_links = ['id', 'job_name']
    search_fields = ['job_name', 'job_name', 'city', 'quantity', 'position', 'working_form']
    list_filter = ['id', 'job_name', 'city', 'quantity', 'degree_required', 'gender_required',
                   'deadline', 'career', 'position', 'salary', 'working_form']
    form = JobPostForm


class JobPostActivityAdmin(admin.ModelAdmin):
    list_display = ['id', 'job_post', 'seeker', 'apply_date']
    list_display_links = ['id', 'job_post']
    search_fields = ['job_post', 'seeker', 'apply_date']
    list_filter = ['id', 'job_post', 'seeker', 'apply_date']


class ViewJobPostAdmin(admin.ModelAdmin):
    list_display = ['id', 'view', 'created_date', 'updated_date', 'job_post']
    list_display_links = ['id', 'view']
    search_fields = ['view']
    list_filter = ['id', 'view', 'created_date', 'updated_date']
    readonly_fields = ['view']


class CommentAdmin(admin.ModelAdmin):
    list_display = ['id', 'content', 'is_active', 'created_date', 'updated_date', 'company', 'user']
    list_display_links = ['content']
    search_fields = ['company']
    list_filter = ['id', 'is_active', 'created_date', 'updated_date', 'company', 'user']


class RatingAdmin(admin.ModelAdmin):
    list_display = ['id', 'rating', 'created_date', 'updated_date', 'company', 'user']
    list_display_links = ['rating']
    search_fields = ['rating', 'company', 'user']
    list_filter = ['id', 'rating', 'created_date', 'updated_date', 'company', 'user']
    readonly_fields = ['rating']


class PositionAdmin(admin.ModelAdmin):
    list_display = ['id', 'position_name']
    list_display_links = ['position_name']
    search_fields = ['position_name']
    list_filter = ['id', 'position_name']


admin_site = JobPortalAppAdmin(name="JobLink")

admin_site.register(Career, CareerAdmin)
admin_site.register(WorkingForm, WorkingFormAdmin)
admin_site.register(Experience, ExperienceAdmin)
admin_site.register(Salary, SalaryAdmin)
admin_site.register(User, UserAdmin)
admin_site.register(Group, GroupAdmin)
admin_site.register(JobSeekerProfile, JobSeekerProfileAdmin)

admin_site.register(EducationDetail, EducationDetailAdmin)
admin_site.register(ExperienceDetail, ExperienceDetailAdmin)
admin_site.register(DesiredJob, DesiredJobAdmin)
admin_site.register(CurriculumVitae, CurriculumVitaeAdmin)
admin_site.register(ViewJobSeekerProfile, ViewJobSeekerProfileAdmin)

admin_site.register(Company, CompanyAdmin)
admin_site.register(ImageCompany, ImageCompanyAdmin)
admin_site.register(ViewCompanyProfile, ViewCompanyProfileAdmin)
admin_site.register(JobPost, JobPostAdmin)
admin_site.register(JobPostActivity, JobPostActivityAdmin)
admin_site.register(ViewJobPost, ViewJobPostAdmin)
admin_site.register(Comment, CommentAdmin)
admin_site.register(Rating, RatingAdmin)
admin_site.register(Position, PositionAdmin)