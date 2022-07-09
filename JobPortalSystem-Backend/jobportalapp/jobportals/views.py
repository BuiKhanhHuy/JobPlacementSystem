from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
import html
from rest_framework import viewsets, generics
from rest_framework import views
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from django.conf import settings
from django.db.models import F, Avg, Count
from django.contrib.auth.hashers import make_password
from rest_framework import permissions
from datetime import datetime
from .models import (City,
                     Career,
                     Position,
                     WorkingForm,
                     Experience,
                     Salary,
                     JobSeekerProfile,
                     User,
                     EducationDetail,
                     ExperienceDetail,
                     Company,
                     ImageCompany,
                     JobPost,
                     SaveJobPost,
                     JobPostActivity,
                     DesiredJob,
                     Comment,
                     Rating,
                     ViewJobSeekerProfile,
                     ViewCompanyProfile,
                     ViewJobPost,
                     CurriculumVitae)
from .serializers import (CitySerializer,
                          Position,
                          Career,
                          PositionSerializer,
                          ExperienceSerializer,
                          CareerSerializer,
                          WorkingFormSerializer,
                          SalarySerializer,
                          UserDetailSerializer,
                          JobPostOfRecruiter,
                          JobPostListSerializer,
                          JobPostSerializer,
                          EducationDetailSerializer,
                          ExperienceDetailSerializer,
                          DesiredJobDetailSerializer,
                          JobPostDetailSerializer,
                          JobSeekerProfileListSerializer,
                          JobSeekerProfileDetailSerializer,
                          JobSeekerProfileSerializer,
                          CompanySerializer,
                          CompanyListSerializer,
                          CompanyDetailSerializer,
                          ImageCompanySerializer,
                          CommentSerializer,
                          ViewJobSeekerProfileSerializer,
                          ViewCompanyProfileSerializer,
                          ViewJobPostSerializer,
                          SaveJobPostSerializer,
                          JobPostActivitySerializer,
                          RatingSerializer,
                          CurriculumVitaeSerializer,
                          JobPostActivityOfPostSerializer,
                          TopCompanySerializer
                          )
from . import perms
from . import paginators
from django.core.mail import EmailMessage


class CityViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = City.objects
    serializer_class = CitySerializer


class PositionViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Position.objects
    serializer_class = PositionSerializer


class CareerViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Career.objects
    serializer_class = CareerSerializer


class WorkingFormViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = WorkingForm.objects
    serializer_class = WorkingFormSerializer


class ExperienceViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Experience.objects
    serializer_class = ExperienceSerializer


class SalaryViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Salary.objects
    serializer_class = SalarySerializer


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserDetailSerializer
    pagination_class = paginators.BaseCustomPaginator

    def get_permissions(self):
        if self.action in ['get_current_user', 'update_user']:
            return [permissions.IsAuthenticated()]
        elif self.action in ['get_job_seeker_profile',
                             'create_or_update_job_seeker_profile',
                             'get_save_job_posts',
                             'add_save_job_post',
                             'add_job_post_activity',
                             'get_job_posts_activity',
                             'delete_save_job_posts_of_owner']:
            return [perms.IsSeekerUser()]
        elif self.action in ['get_company',
                             'create_company',
                             'update_company',
                             'get_job_posts',
                             'add_job_posts']:
            return [perms.IsRecruiterUser()]
        elif self.action in ['delete_job_posts_of_owner']:
            return [perms.JobPostOwnerPerms()]
        elif self.action in ['delete_save_job_posts_of_owner']:
            return [perms.SaveJobPostOwnerPerms()]
        return [permissions.AllowAny()]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if request.data.get('groups')[0].get('name') not in [perms.seeker_role, perms.recruiter_role]:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(methods=['get'], detail=False,
            url_path='current-user', url_name='current_user')
    def get_current_user(self, request):
        data = self.serializer_class(request.user, context={'request': request}).data
        return Response(data=data, status=status.HTTP_200_OK)

    @get_current_user.mapping.patch
    def update_user(self, request):
        user = request.user
        data = request.data
        avatar_image = request.FILES.get('avatar')

        username = data.get('username')

        if avatar_image:
            user.avatar = avatar_image
        if username:
            user.username = username
        try:
            user.save()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(data=self.serializer_class(user, context={'request': request}).data,
                            status=status.HTTP_200_OK)

    @action(methods=['post'], detail=False,
            url_path='password', url_name='change_password')
    def change_password(self, request):
        user = request.user
        data = request.data

        old_password = data.get('old_password')
        new_password = data.get('new_password')

        if old_password and new_password:
            if user.check_password(old_password):
                user.set_password(new_password)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        try:
            user.save()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(data=self.serializer_class(user, context={'request': request}).data,
                            status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True,
            url_path='job-seeker-profile', url_name='get_job_seeker_profile')
    def get_job_seeker_profile(self, request, pk):
        job_seeker_profile = JobSeekerProfile.objects.filter(job_seeker=self.get_object()).first()
        return Response(data=JobSeekerProfileSerializer(job_seeker_profile, context={'request': request}).data,
                        status=status.HTTP_200_OK)

    @get_job_seeker_profile.mapping.post
    def create_or_update_job_seeker_profile(self, request, pk):
        job_seeker_profile = JobSeekerProfile.objects.filter(job_seeker=self.get_object()).first()
        stt = None
        data = request.data.copy()

        if job_seeker_profile:
            # update
            serializer = JobSeekerProfileSerializer(job_seeker_profile, data=data, partial=True)
            stt = status.HTTP_200_OK
        else:
            # create
            data['job_seeker'] = self.get_object().id
            serializer = JobSeekerProfileSerializer(data=data)
            stt = status.HTTP_201_CREATED
        if serializer.is_valid(raise_exception=True):
            # save
            serializer.save()
            return Response(data=serializer.data, status=stt)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['get'], detail=True,
            url_path='company', url_name='get_company')
    def get_company(self, request, pk):
        company = Company.objects.filter(recruiter=self.get_object()).first()
        return Response(data=CompanySerializer(company, context={'request': request}).data,
                        status=status.HTTP_200_OK)

    @get_company.mapping.post
    def create_company(self, request, pk):
        # company = Company.objects.filter(recruiter=self.get_object()).first()
        # stt = None
        # data = request.data.copy()
        # if company:
        #     # update
        #     serializer = CompanySerializer(company, data=data, partial=True)
        #     stt = status.HTTP_200_OK
        # else:
        #     # create
        #     if Company.objects.filter(company_name=request.data.get('company_name')).exists():
        #         return Response(data={'msg': 'Tên công ty đã tồn tại'}, status=status.HTTP_400_BAD_REQUEST)
        #
        #     data['recruiter'] = self.get_object().id
        #     serializer = CompanySerializer(data=data)
        #     stt = status.HTTP_201_CREATED
        # if serializer.is_valid(raise_exception=True):
        #     # save
        #     serializer.save()
        #     return Response(data=serializer.data, status=stt)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        company = Company.objects.filter(recruiter=self.get_object()).first()
        stt = None
        data = request.data.copy()
        if not company:
            # create
            if Company.objects.filter(company_name=request.data.get('company_name')).exists():
                return Response(data={'msg': 'Tên công ty đã tồn tại'}, status=status.HTTP_400_BAD_REQUEST)

            data['recruiter'] = self.get_object().id
            serializer = CompanySerializer(data=data)
            stt = status.HTTP_201_CREATED

            if serializer.is_valid(raise_exception=True):
                # save
                serializer.save()
                return Response(data=serializer.data, status=stt)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    @get_company.mapping.patch
    def update_company(self, request, pk):
        company = Company.objects.filter(recruiter=self.get_object()).first()
        data = request.data.copy()
        if company:
            # update
            serializer = CompanySerializer(company, data=data, partial=True)
            if serializer.is_valid(raise_exception=True):
                # save
                serializer.save()
                return Response(data=serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['get'], detail=True,
            url_path='job-posts', url_name='get_job_posts')
    def get_job_posts(self, request, pk):
        job_posts = JobPost.objects.filter(recruiter=self.get_object()).all()

        return Response(data=JobPostOfRecruiter(job_posts, many=True).data, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True,
            url_path='job-posted', url_name='delete_job_posts_of_owner')
    def delete_job_posts_of_owner(self, request, pk):
        job_posts_id_del = request.data.get('job_posts_id_del')
        if not job_posts_id_del:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        job_posts_id_del = [int(x) for x in job_posts_id_del.split(",")]
        job_posts = JobPost.objects.filter(id__in=job_posts_id_del).all()

        try:
            job_posts.delete()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)

    @get_job_posts.mapping.post
    def add_job_posts(self, request, pk):
        data = request.data.copy()
        data['recruiter'] = self.get_object().id
        serializer = JobPostSerializer(data=data)

        if serializer.is_valid(raise_exception=True):
            # save
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['get'], detail=True,
            url_path='save-job-posts', url_name='get_save_job_posts')
    def get_save_job_posts(self, request, pk):
        user = self.get_object()
        save_job_posts = user.save_job_posts.order_by('-created_date').all()

        return Response(data=SaveJobPostSerializer(save_job_posts, many=True).data,
                        status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True,
            url_path='save-job-posted', url_name='delete_save_job_posts_of_owner')
    def delete_save_job_posts_of_owner(self, request, pk):
        save_job_posts_id_del = request.data.get('save_job_posts_id_del')
        if not save_job_posts_id_del:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        save_job_posts_id_del = [int(x) for x in save_job_posts_id_del.split(",")]
        save_job_posts = SaveJobPost.objects.filter(id__in=save_job_posts_id_del).all()

        try:
            save_job_posts.delete()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)

    @action(methods=['post'], detail=True,
            url_path='save-job-post', url_name='add_save_job_post')
    def add_save_job_post(self, request, pk):
        job_post_id = request.data.get('job_post_id')

        if job_post_id:
            save_job_post = SaveJobPost.objects.create(seeker=self.get_object(),
                                                       job_post_id=job_post_id)
            return Response(data=SaveJobPostSerializer(save_job_post, context={'request': request}).data,
                            status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['get'], detail=True,
            url_path='job-posts-activity', url_name='get_job_posts_activity')
    def get_job_posts_activity(self, request, pk):
        user = self.get_object()
        job_posts_activity = user.job_posts_activity.order_by('-apply_date').all()

        return Response(data=JobPostActivitySerializer(job_posts_activity, many=True).data,
                        status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True,
            url_path='job-post-activity', url_name='add_job_post_activity')
    def add_job_post_activity(self, request, pk):
        job_post_id = request.data.get('job_post_id')

        if job_post_id:
            job_post_activity = JobPostActivity.objects.create(seeker=self.get_object(),
                                                               job_post_id=job_post_id)
            return Response(data=JobPostActivitySerializer(job_post_activity, context={'request': request}).data,
                            status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class JobSeekerProfileViewSet(viewsets.ViewSet, generics.ListAPIView,
                              generics.RetrieveAPIView):
    queryset = JobSeekerProfile.objects.filter(job_seeker__is_active=True).all()
    serializer_class = JobSeekerProfileListSerializer
    pagination_class = paginators.BaseCustomPaginator

    def get_serializer_class(self):
        if self.action in ['retrieve']:
            return JobSeekerProfileDetailSerializer
        return self.serializer_class

    def get_permissions(self):
        if self.action in ['get_education_detail',
                           'create_or_update_education_detail',
                           'get_experience_details',
                           'get_desired_job',
                           'create_or_update_desired_job',
                           'add_cv'
                           'stats_of_seeker']:
            return [perms.IsSeekerUser()]
        return [permissions.AllowAny()]

    def get_queryset(self):
        queryset = self.queryset

        if DesiredJob.objects.exists():
            career_id = self.request.query_params.get('career_id')
            if career_id:
                queryset = queryset.filter(desired_job__career__id=career_id)

            city_id = self.request.query_params.get('city_id')
            if city_id:
                queryset = queryset.filter(desired_job__city__id=city_id)

            experience_id = self.request.query_params.get('experience_id')
            if experience_id:
                queryset = queryset.filter(desired_job__experience__id=experience_id)

            salary_id = self.request.query_params.get('salary_id')
            if salary_id:
                queryset = queryset.filter(desired_job__salary__id=salary_id)

            position_id = self.request.query_params.get('position_id')
            if position_id:
                queryset = queryset.filter(desired_job__position__id=position_id)

            working_form_id = self.request.query_params.get('working_form_id')
            if working_form_id:
                queryset = queryset.filter(desired_job__working_form__id=working_form_id)

            kw = self.request.query_params.get('kw')
            if kw:
                queryset = queryset.filter(desired_job__job_name__icontains=kw)

        return queryset

    @action(methods=['get'], detail=True,
            url_path='education-detail', url_name='get_education_detail')
    def get_education_detail(self, request, pk):
        education_detail = EducationDetail.objects.filter(job_seeker_profile=self.get_object()).first()
        return Response(data=EducationDetailSerializer(education_detail, context={'request': request}).data,
                        status=status.HTTP_200_OK)

    @get_education_detail.mapping.post
    def create_or_update_education_detail(self, request, pk):
        education_detail = EducationDetail.objects.filter(job_seeker_profile=self.get_object()).first()

        stt = None
        if education_detail:
            # update
            serializer = EducationDetailSerializer(education_detail, data=request.data, partial=True)
            stt = status.HTTP_200_OK
        else:
            # create
            serializer = EducationDetailSerializer(data=request.data)
            stt = status.HTTP_201_CREATED
        if serializer.is_valid(raise_exception=True):
            # save
            serializer.save()
            return Response(data=serializer.data, status=stt)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['get'], detail=True,
            url_path='experience_details', url_name='get_experience_details')
    def get_experience_details(self, request, pk):
        experience_details = ExperienceDetail.objects.filter(job_seeker_profile=self.get_object()).all()
        return Response(
            data=ExperienceDetailSerializer(experience_details, many=True, context={'request': request}).data,
            status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True,
            url_path='desired-job', url_name='desired_job')
    def get_desired_job(self, request, pk):
        desired_job = DesiredJob.objects.filter(job_seeker_profile=self.get_object()).first()
        return Response(data=DesiredJobDetailSerializer(desired_job, context={'request': request}).data,
                        status=status.HTTP_200_OK)

    @get_desired_job.mapping.post
    def create_or_update_desired_job(self, request, pk):
        desired_job = DesiredJob.objects.filter(job_seeker_profile=self.get_object()).first()

        stt = None
        if desired_job:
            # update
            serializer = DesiredJobDetailSerializer(desired_job, data=request.data)
            stt = status.HTTP_200_OK
        else:
            # create
            serializer = DesiredJobDetailSerializer(data=request.data)
            stt = status.HTTP_201_CREATED
        if serializer.is_valid():
            # save
            serializer.save()
            return Response(data=serializer.data, status=stt)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['post'], detail=True, url_path='view', url_name='view')
    def view(self, request, pk):
        try:
            v, _ = ViewJobSeekerProfile.objects.get_or_create(job_seeker_profile=self.get_object())
            v.view = F('view') + 1
            v.save()
            v.refresh_from_db()
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(data=ViewJobSeekerProfileSerializer(v, context={'request': request}).data,
                            status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True,
            url_path='curriculum-vitae', url_name='add_cv')
    def add_cv(self, request, pk):
        url_cv = request.FILES.get('url_cv')
        if url_cv:
            cv = CurriculumVitae.objects.create(job_seeker_profile=self.get_object(), url_cv=url_cv)
            return Response(data=CurriculumVitaeSerializer(cv, context={'request': request}).data,
                            status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    @add_cv.mapping.get
    def get_cv(self, request, pk):
        cv = CurriculumVitae.objects.filter(job_seeker_profile=self.get_object()).first()
        return Response(data=CurriculumVitaeSerializer(cv, context={'request': request}).data,
                        status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True, url_path='stats', url_name='stats_of_seeker')
    def stats_of_seeker(self, request, pk):
        count_job = JobPost.objects.count()
        count_applied_job = JobPostActivity.objects.filter(seeker=self.get_object().job_seeker).count()
        count_save_job = SaveJobPost.objects.filter(seeker=self.get_object().job_seeker).count()
        view_profile = ViewJobSeekerProfile.objects.filter(job_seeker_profile=self.get_object()).first()
        if view_profile:
            count_view_profile = view_profile.view
        else:
            count_view_profile = 0

        return Response(data={'count_job': count_job, 'count_applied_job': count_applied_job,
                              'count_save_job': count_save_job, 'count_view_profile': count_view_profile},
                        status=status.HTTP_200_OK)


class ExperienceDetailViewSet(viewsets.ViewSet, generics.CreateAPIView,
                              generics.UpdateAPIView,
                              generics.DestroyAPIView):
    queryset = ExperienceDetail.objects
    serializer_class = ExperienceDetailSerializer
    permission_classes = [permissions.IsAuthenticated()]

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            return [perms.ExperienceDetailOwnerPerms()]
        elif self.action in ['create']:
            return [perms.IsSeekerUser()]
        return [permissions.IsAuthenticated()]


class CompanyViewSet(viewsets.ViewSet, generics.ListAPIView,
                     generics.RetrieveAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanyListSerializer
    pagination_class = paginators.BaseCustomPaginator

    def get_serializer_class(self):
        if self.action in ['retrieve']:
            return CompanyDetailSerializer
        return self.serializer_class

    def get_permissions(self):
        if self.action in ['add_comment', 'rating']:
            return [perms.IsSeekerUser()]
        elif self.action in ['add_image_company']:
            return [perms.IsRecruiterUser()]
        return [permissions.AllowAny()]

    def get_queryset(self):
        queryset = self.queryset

        city_id = self.request.query_params.get('city_id')
        if city_id:
            queryset = queryset.filter(city_id=city_id)

        kw = self.request.query_params.get('kw')
        if kw:
            queryset = queryset.filter(company_name__icontains=kw)

        return queryset

    @action(methods=['get'], detail=True, url_path='image-companies', url_name='get_image_companies')
    def get_image_companies(self, request, pk):
        company = self.get_object()
        images_company = company.image_companies

        return Response(data=ImageCompanySerializer(images_company, many=True, context={'request': request}).data,
                        status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True, url_path='image-company', url_name='add_image_company')
    def add_image_company(self, request, pk):
        image_url = request.FILES.get('image_url')
        if image_url:
            image_company = ImageCompany.objects.create(company=self.get_object(),
                                                        image_url=image_url)
            return Response(data=ImageCompanySerializer(image_company, context={'request': request}).data,
                            status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['post'], detail=True, url_path='comment', url_name='add_comment')
    def add_comment(self, request, pk):
        content = request.data.get('content')
        if content:
            comment = Comment.objects.create(company=self.get_object(),
                                             user=request.user, content=content)
            return Response(data=CommentSerializer(comment, context={'request': request}).data,
                            status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['get'], detail=True, url_path='comments', url_name='get_comments')
    def get_comments(self, request, pk):
        company = self.get_object()
        comments = company.comments.filter(is_active=True).order_by('-updated_date').all()
        page = self.paginate_queryset(comments)
        if page is not None:
            serializer = CommentSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    @action(methods=['post'], detail=True, url_path='rating', url_name='rating')
    def rating(self, request, pk):
        company = self.get_object()
        user = request.user

        r, _ = Rating.objects.get_or_create(company=company, user=user)
        r.rating = request.data.get('rating', 5)
        try:
            r.save()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(data=RatingSerializer(r, context={'request': request}).data,
                        status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True, url_path='view', url_name='view')
    def view(self, request, pk):
        try:
            v, _ = ViewCompanyProfile.objects.get_or_create(company=self.get_object())
            v.view = F('view') + 1
            v.save()
            v.refresh_from_db()
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(data=ViewCompanyProfileSerializer(v, context={'request': request}).data,
                            status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True, url_path='stats', url_name='stats_of_recruiter')
    def stats_of_recruiter(self, request, pk):
        count_job_seeker_profile = JobSeekerProfile.objects.count()
        count_job_post_due = JobPost.objects.filter(recruiter=self.get_object().recruiter,
                                                    deadline__gte=datetime.today()).count()
        count_job_post = JobPost.objects.filter(recruiter=self.get_object().recruiter).count()
        view_company_profile = ViewCompanyProfile.objects.filter(company=self.get_object()).first()
        if view_company_profile:
            count_view_company_profile = view_company_profile.view
        else:
            count_view_company_profile = 0

        return Response(data={'count_job_seeker_profile': count_job_seeker_profile,
                              'count_job_post_due': count_job_post_due,
                              'count_job_post': count_job_post,
                              'count_view_company_profile': count_view_company_profile},
                        status=status.HTTP_200_OK)


class ImageCompanyViewSet(viewsets.ViewSet, generics.UpdateAPIView,
                          generics.DestroyAPIView):
    queryset = ImageCompany.objects
    serializer_class = ImageCompanySerializer
    permission_classes = [permissions.IsAuthenticated()]

    def get_permissions(self):
        if self.action in ['update', 'partial_update',
                           'destroy'
                           ]:
            return [perms.ImageCompanyOwnerPerms()]
        return [permissions.IsAuthenticated()]

        # return [permissions.AllowAny()]


class JobPostViewSet(viewsets.ViewSet,
                     generics.ListAPIView,
                     generics.RetrieveAPIView,
                     generics.UpdateAPIView,
                     generics.DestroyAPIView):
    queryset = JobPost.objects.filter(is_active=True)
    serializer_class = JobPostListSerializer
    pagination_class = paginators.BaseCustomPaginator

    def get_serializer_class(self):
        if self.action in ['retrieve']:
            return JobPostDetailSerializer
        elif self.action in ['update', 'partial_update']:
            return JobPostSerializer
        return self.serializer_class

    def get_permissions(self):
        if self.action in ['update', 'partial_update',
                           'destroy',
                           'get_job_post_of_recruiter']:
            return [perms.JobPostOwnerPerms()]
        elif self.action in ['get_applied_job_post',
                             'delete_job_posts_of_owner']:
            return [perms.IsRecruiterUser()]
        return [permissions.AllowAny()]

    def get_queryset(self):
        queryset = self.queryset

        recruiter_id = self.request.query_params.get('recruiter_id')
        if recruiter_id:
            queryset = queryset.filter(recruiter_id=recruiter_id)

        career_id = self.request.query_params.get('career_id')
        if career_id:
            queryset = queryset.filter(career_id=career_id)

        city_id = self.request.query_params.get('city_id')
        if city_id:
            queryset = queryset.filter(city_id=city_id)

        experience_id = self.request.query_params.get('experience_id')
        if experience_id:
            queryset = queryset.filter(experience_id=experience_id)

        salary_id = self.request.query_params.get('salary_id')
        if salary_id:
            queryset = queryset.filter(salary_id=salary_id)

        position_id = self.request.query_params.get('position_id')
        if position_id:
            queryset = queryset.filter(position_id=position_id)

        working_form_id = self.request.query_params.get('working_form_id')
        if working_form_id:
            queryset = queryset.filter(working_form_id=working_form_id)

        is_urgent_job = self.request.query_params.get('is_urgent_job')
        if is_urgent_job:
            queryset = queryset.filter(is_urgent_job=is_urgent_job)

        kw = self.request.query_params.get('kw')
        if kw:
            queryset = queryset.filter(job_name__icontains=kw)

        return queryset

    @action(methods=['get'], detail=True, url_path='job-post', url_name='get_job_post_of_recruiter')
    def get_job_post_of_recruiter(self, request, pk):
        job_post = JobPost.objects.filter(pk=pk).first()
        if job_post.recruiter == request.user:
            return Response(data=JobPostSerializer(job_post, context={'request': request}).data,
                            status=status.HTTP_200_OK)
        return Response(status=status.HTTP_403_FORBIDDEN)

    @action(methods=['get'], detail=True, url_path='applied-job-post', url_name='get_applied_job_post')
    def get_applied_job_post(self, request, pk):
        job_posts_activity = self.get_object()

        if job_posts_activity.job_posts_activity.exists():
            job_posts_activity = job_posts_activity.job_posts_activity.order_by('-apply_date')
            return Response(data=JobPostActivityOfPostSerializer(job_posts_activity, many=True,
                                                                 context={'request': request}).data,
                            status=status.HTTP_200_OK)
        return Response(data=[], status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True, url_path='view', url_name='view')
    def view(self, request, pk):
        try:
            v, _ = ViewJobPost.objects.get_or_create(job_post=self.get_object())
            v.view = F('view') + 1
            v.save()
            v.refresh_from_db()
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(data=ViewJobPostSerializer(v, context={'request': request}).data,
                            status=status.HTTP_200_OK)


class CommentViewSet(viewsets.ViewSet,
                     generics.UpdateAPIView,
                     generics.DestroyAPIView):
    queryset = Comment.objects.filter(is_active=True)
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated()]

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            return [perms.CommentOwnerPerms()]
        return [permissions.IsAuthenticated()]


class SaveJobPostViewSet(viewsets.ViewSet, generics.DestroyAPIView):
    queryset = SaveJobPost.objects
    serializer_class = SaveJobPostSerializer
    permission_classes = [permissions.IsAuthenticated()]

    def get_permissions(self):
        if self.action in ['destroy']:
            return [perms.SaveJobPostOwnerPerms()]
        return [permissions.IsAuthenticated()]


class JobPostActivityViewSet(viewsets.ViewSet, generics.UpdateAPIView,
                             generics.DestroyAPIView):
    queryset = JobPostActivity.objects
    serializer_class = JobPostActivitySerializer
    permission_classes = [permissions.IsAuthenticated()]

    def get_permissions(self):
        if self.action in ['destroy']:
            return [perms.JobPostActivityOwnerPerms()]
        elif self.action in ['update', 'partial_update']:
            return [perms.IsRecruiterUser()]
        return [permissions.IsAuthenticated()]


class TopCompanyAPIView(views.APIView):
    def get(self, request):
        top_companies = Company.objects.annotate(star_num=Avg('ratings__rating')).order_by('-star_num')[:20]
        return Response(data=TopCompanySerializer(top_companies, many=True).data, status=status.HTTP_200_OK)


class CurriculumVitaeViewSet(viewsets.ViewSet, generics.DestroyAPIView):
    queryset = CurriculumVitae.objects.all()

    def get_permissions(self):
        if self.action in ['destroy']:
            return [perms.CurriculumVitaeOwnerPerms()]
        return [permissions.IsAuthenticated()]


class SendMailApplyJobAPIView(views.APIView):
    def get_permissions(self):
        if self.request.method == 'POST':
            return [perms.IsSeekerUser()]

    def post(self, request):
        full_name = request.data.get('full_name')
        phone_number = request.data.get('phone_number')
        url_web = request.data.get('url_web', '')
        url_logo = request.data.get('url_logo', '')
        url = request.data.get('url', '')
        url_view_cv = request.data.get('url_view_cv')
        job_name = request.data.get('job_name')
        from_email = request.data.get('from_email')
        to_email = request.data.get('to_email')
        avatar = request.data.get('avatar')

        if full_name and from_email and \
                to_email and phone_number and \
                url and job_name and url_view_cv:
            subject = f"{full_name} - Ứng tuyển vị trí {job_name}".format(full_name=full_name, job_name=job_name)
            html_template = 'service/seeker-mail-template.html'
            html_message = render_to_string(html_template,
                                            {'full_name': full_name, 'job_name': job_name,
                                             'phone_number': phone_number,
                                             'email': from_email, 'url': url,
                                             'url_view_cv': url_view_cv,
                                             'avatar': avatar,
                                             'url_web': url_web,
                                             'url_logo': url_logo})

            message = EmailMessage(subject, html_message, settings.DEFAULT_FROM_EMAIL, [to_email])
            message.content_subtype = 'html'

            try:
                message.send()
            except:
                return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class SendMailToSeeker(views.APIView):
    def get_permissions(self):
        if self.request.method == 'POST':
            return [perms.IsRecruiterUser()]

    def post(self, request):
        url_web = request.data.get('url_web', '')
        url_logo = request.data.get('url_logo', '')
        url_company_detail = request.data.get('url_company_detail', '')
        title = request.data.get('title', '')
        content = request.data.get('content', '')
        user_id = request.data.get('user_id')
        job_posts_activity_id = request.data.get('job_posts_activity_id')

        to_mails = []

        if user_id is None or job_posts_activity_id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        job_posts_activity_id = [int(x) for x in job_posts_activity_id.split(",")]

        obj = JobPostActivity.objects.values('seeker__email').filter(id__in=job_posts_activity_id).all()
        for o in obj:
            to_mails.append(o.get('seeker__email'))
        to_mails = set(to_mails)
        to_mails = list(to_mails)

        user = User.objects.filter(pk=user_id).first()
        if user:
            subject = title
            html_template = 'service/recruiter-mail-template.html'
            html_message = render_to_string(html_template, {
                'url_logo': url_logo,
                'url_web': url_web,
                'url_company_detail': url_company_detail,
                'title': title,
                'content': html.escape(content),
                'company_logo': settings.FULL_URL_CLOUDINARY + user.avatar.name,
                'email': user.email,
                'company_name': user.company.company_name,
                'field_operation': user.company.field_operation,
                'company_size': user.company.company_size,
                'phone_number': user.company.phone_number,
                'company_website_url': user.company.company_website_url,
                'address': user.company.address,
            })

            message = EmailMessage(subject, html_message, settings.DEFAULT_FROM_EMAIL, to_mails)
            message.content_subtype = 'html'

            try:
                message.send()
            except:
                return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class Oauth2Info(views.APIView):
    def get(self, request):
        client_id = settings.CLIENT_ID
        client_secret = settings.CLIENT_SECRET

        return Response(data={'client_id': client_id, 'client_secret': client_secret},
                        status=status.HTTP_200_OK)


# admin
class StatsView(views.APIView):
    def get(self, request):
        year = request.GET.get('year')

        stats = JobPostActivity.objects
        if year:
            year = int(year)
            stats = stats.filter(apply_date__year=year)

        stats = stats.values('job_post__career__id', 'job_post__career__career_name').annotate(
            count=Count('job_post__career__id'))
        return Response(data=stats, status=status.HTTP_200_OK)

    def post(self, request):
        quarter_one = request.POST.get('quarterOne')
        year = request.POST.get('year')

        stats = JobPostActivity.objects

        if quarter_one:
            quarter_one = int(quarter_one)
            if quarter_one == 1:
                stats = stats.filter(apply_date__month__range=[1, 3])
            elif quarter_one == 2:
                stats = stats.filter(apply_date__month__range=[4, 6])
            elif quarter_one == 3:
                stats = stats.filter(apply_date__month__range=[7, 9])
            elif quarter_one == 4:
                stats = stats.filter(apply_date__month__range=[10, 12])

        if year:
            stats = stats.filter(apply_date__year=year)
        stats = stats \
            .values('job_post__career__id', 'job_post__career__career_name') \
            .annotate(count=Count('job_post__career__id'))

        return Response(data=stats, status=status.HTTP_200_OK)
