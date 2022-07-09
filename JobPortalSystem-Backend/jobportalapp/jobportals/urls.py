from django.urls import path, include, re_path
from rest_framework import routers
from .admin import admin_site
from . import views

router = routers.DefaultRouter()
router.register(prefix='cities', viewset=views.CityViewSet, basename='city')
router.register(prefix='positions', viewset=views.PositionViewSet, basename='position')
router.register(prefix='careers', viewset=views.CareerViewSet, basename='career')
router.register(prefix='working-forms', viewset=views.WorkingFormViewSet, basename='working_form')
router.register(prefix='experiences', viewset=views.ExperienceViewSet, basename='experience')
router.register(prefix='salaries', viewset=views.SalaryViewSet, basename='salary')
router.register(prefix='users', viewset=views.UserViewSet, basename='user')
router.register(prefix='experience-details', viewset=views.ExperienceDetailViewSet, basename='experience_details')
router.register(prefix='job-seeker-profiles', viewset=views.JobSeekerProfileViewSet, basename='job_seeker_profile')
router.register(prefix='companies', viewset=views.CompanyViewSet, basename='company')
router.register(prefix='image-companies', viewset=views.ImageCompanyViewSet, basename='image_companies')
router.register(prefix='job-posts', viewset=views.JobPostViewSet, basename='job_post')
router.register(prefix='comments', viewset=views.CommentViewSet, basename='comments')
router.register(prefix='save-job-posts', viewset=views.SaveJobPostViewSet, basename='save_job_posts')
router.register(prefix='job-posts-activity', viewset=views.JobPostActivityViewSet, basename='job_posts_activity')
router.register(prefix='curriculum-vitae', viewset=views.CurriculumVitaeViewSet, basename='curriculum_vitae')

urlpatterns = [
    path('admin/', admin_site.urls, ),
    path('', include(router.urls)),
    path('top-company/', views.TopCompanyAPIView.as_view()),
    path('apply-job/', views.SendMailApplyJobAPIView.as_view()),
    path('reply-seeker/', views.SendMailToSeeker.as_view()),
    path('oauth2-info/', views.Oauth2Info.as_view()),
    path('stats/', views.StatsView.as_view()),
]
