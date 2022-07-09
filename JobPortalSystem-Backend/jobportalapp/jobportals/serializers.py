from rest_framework import serializers
from django.contrib.auth.models import Group
from django.db.models import *
from .models import (City,
                     Position,
                     Career,
                     WorkingForm,
                     Experience,
                     Salary,
                     User,
                     JobSeekerProfile,
                     DesiredJob,
                     EducationDetail,
                     ExperienceDetail,
                     Company,
                     ImageCompany,
                     JobPost,
                     Comment,
                     ViewJobSeekerProfile,
                     ViewCompanyProfile,
                     ViewJobPost,
                     SaveJobPost,
                     JobPostActivity,
                     Rating,
                     CurriculumVitae)
from . import perms


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['id', 'city_name']


class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ['id', 'position_name']


class CareerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Career
        fields = ['id', 'career_name']


class WorkingFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkingForm
        fields = ['id', 'working_form_name']


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['id', 'experience_name']


class SalarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Salary
        fields = ['id', 'salary_name']


# desired_job in JobSeekerProfileListSerializer
class DesiredJobItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = DesiredJob
        fields = ['job_name', 'salary', 'city', 'working_form']
        depth = 1


# company in RecruiterUserSerializer
class CompanyItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'company_name', 'field_operation']


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name']
        extra_kwargs = {
            'name': {'validators': []},
        }


class JobSeekerProfileGetId(serializers.ModelSerializer):
    class Meta:
        model = JobSeekerProfile
        fields = ['id', 'desired_job']


# job_seeker in JobSeekerProfileListSerializer, JobSeekerProfileDetailSerializer
class AvatarEmailUsernameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'avatar', 'email', 'username']


# recruiter in JobPostListSerializer, JobPostDetailSerializer
class RecruiterUserSerializer(serializers.ModelSerializer):
    company = CompanyItemSerializer()

    class Meta:
        model = User
        fields = ['id', 'avatar', 'email', 'company']


class UserDetailSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many=True, required=False)
    job_seeker_profile = JobSeekerProfileGetId(required=False, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email',
                  'avatar', 'groups',
                  'job_seeker_profile', 'company']
        extra_kwargs = {'password': {'write_only': True},
                        'company': {'read_only': True, 'required': False},
                        'username': {'validators': []},
                        'email': {'validators': []}
                        }

    def create(self, validated_data):
        groups = validated_data.pop('groups')
        g = groups[0]
        group = Group.objects.filter(name=g.get('name')).first()

        user = User.objects.create(**validated_data)

        if not group.name == perms.recruiter_role:
            user.is_active = True
        user.set_password(user.password)
        user.groups.add(group)
        user.save()

        return user

    def validate_username(self, username):
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError("Tên người dùng đã tồn tại")
        return username

    def validate_email(self, email):
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email đã tồn tại")
        return email


class ViewCompanyProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ViewCompanyProfile
        fields = ['id', 'view']


class CompanyListSerializer(serializers.ModelSerializer):
    recruiter = AvatarEmailUsernameSerializer(read_only=True)
    rate = serializers.SerializerMethodField()

    def get_rate(self, company):
        rating_company = company.ratings.aggregate(avg_rating=Avg('rating'))
        if rating_company.get('avg_rating'):
            return rating_company.get('avg_rating')
        return 0

    class Meta:
        model = Company
        fields = ['id', 'company_name', 'field_operation', 'city', 'recruiter', 'company_cover_image',
                  'rate']
        depth = 1


class CompanyDetailSerializer(serializers.ModelSerializer):
    recruiter = AvatarEmailUsernameSerializer(read_only=True)
    view = ViewCompanyProfileSerializer()
    rate = serializers.SerializerMethodField()

    def get_rate(self, company):
        request = self.context.get('request')

        if request and \
                request.user.is_authenticated and \
                perms.check_role(request.user, perms.seeker_role):
            rate = company.ratings.filter(user=request.user).first()
            if rate:
                return rate.rating
        return -1

    class Meta:
        model = Company
        exclude = ['commenters', 'raters']
        depth = 1


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        exclude = ['commenters', 'raters']
        extra_kwargs = {'company_name': {'validators': []}}


class TopCompanySerializer(serializers.ModelSerializer):
    recruiter = AvatarEmailUsernameSerializer()
    avg_rating = serializers.SerializerMethodField()

    def get_avg_rating(self, company):
        if company.ratings:
            avg_number = company.ratings.aggregate(avg=Avg('rating'))
            return avg_number.get('avg', 0)
        return 0

    class Meta:
        model = Company
        fields = ['id', 'company_name', 'recruiter', 'avg_rating']


class ImageCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageCompany
        fields = '__all__'


class CurriculumVitaeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurriculumVitae
        fields = ['id', 'url_cv']


class DesiredJobCustomSerializer(serializers.ModelSerializer):
    class Meta:
        model = DesiredJob
        exclude = ['job_seeker_profile']
        depth = 1


class JobSeekerProfileListSerializer(serializers.ModelSerializer):
    job_seeker = AvatarEmailUsernameSerializer()
    desired_job = DesiredJobItemSerializer()

    class Meta:
        model = JobSeekerProfile
        fields = ['id', 'full_name', 'job_seeker', 'desired_job']
        depth = 1


class JobSeekerProfileDetailSerializer(serializers.ModelSerializer):
    job_seeker = AvatarEmailUsernameSerializer()
    desired_job = DesiredJobCustomSerializer()

    class Meta:
        model = JobSeekerProfile
        fields = ['id', 'job_seeker',
                  'full_name', 'phone_number', 'gender', 'date_of_birth', 'marital_status', 'address',
                  'career_goals', 'personal_skills', 'city', 'education_detail', 'experience_details',
                  'desired_job', 'view', 'updated_date']
        depth = 1


class ViewJobPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = ViewJobPost
        fields = ['id', 'view']


class JobSeekerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobSeekerProfile
        fields = '__all__'


class JobSeekerProfileAppliedJob(serializers.ModelSerializer):
    class Meta:
        model = JobSeekerProfile
        fields = ['id', 'full_name', 'phone_number']


class UserAppliedJobSerializer(serializers.ModelSerializer):
    job_seeker_profile = JobSeekerProfileAppliedJob()

    class Meta:
        model = User
        fields = ['id', 'avatar', 'email', 'job_seeker_profile']


class JobPostActivityOfPostSerializer(serializers.ModelSerializer):
    seeker = UserAppliedJobSerializer()

    class Meta:
        model = JobPostActivity
        fields = ['id', 'status', 'apply_date', 'seeker']


class JobPostOfRecruiter(serializers.ModelSerializer):
    class Meta:
        model = JobPost
        fields = ['id', 'job_name', 'created_date', 'updated_date', 'deadline', 'view', 'is_urgent_job', 'is_active']


class JobPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobPost
        exclude = ['save_seekers', 'seekers', 'tags']


class JobPostListSerializer(serializers.ModelSerializer):
    recruiter = RecruiterUserSerializer(read_only=True)

    class Meta:
        model = JobPost
        fields = ['id', 'job_name', 'recruiter', 'city', 'salary', 'deadline', 'is_urgent_job']
        depth = 1


class JobPostDetailSerializer(serializers.ModelSerializer):
    recruiter = RecruiterUserSerializer()
    view = ViewJobPostSerializer()
    saved = serializers.SerializerMethodField()
    applied = serializers.SerializerMethodField()

    def get_saved(self, job_post):
        request = self.context.get('request')
        if request and \
                request.user.is_authenticated and \
                perms.check_role(request.user, perms.seeker_role):
            jp = job_post.save_job_posts.filter(seeker=request.user).first()
            if jp:
                return {'saved': True, 'id': jp.id}
        return {'saved': False, 'id': None}

    def get_applied(self, job_post):
        request = self.context.get('request')
        if request and \
                request.user.is_authenticated and \
                perms.check_role(request.user, perms.seeker_role):
            jp = job_post.job_posts_activity.filter(seeker=request.user).first()
            if jp:
                return {'applied': True, 'id': jp.id}
        return {'applied': False, 'id': None}

    class Meta:
        model = JobPost
        exclude = ['seekers', 'save_seekers']
        depth = 2


class EducationDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = EducationDetail
        fields = '__all__'
        extra_kwargs = {
            'job_seeker_profile': {'write_only': True},
        }


class ExperienceDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperienceDetail
        # exclude = ['job_seeker_profile']
        fields = '__all__'
        extra_kwargs = {
            'job_seeker_profile': {'write_only': True},
        }


class DesiredJobDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = DesiredJob
        fields = '__all__'
        extra_kwargs = {
            'job_seeker_profile': {'write_only': True},
        }


class CommentSerializer(serializers.ModelSerializer):
    user = AvatarEmailUsernameSerializer()

    class Meta:
        model = Comment
        exclude = ['is_active', 'company']


class ViewJobSeekerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ViewJobSeekerProfile
        fields = ['id', 'view']


class SaveJobPostSerializer(serializers.ModelSerializer):
    job_post = JobPostListSerializer()

    class Meta:
        model = SaveJobPost
        fields = '__all__'


class JobPostActivitySerializer(serializers.ModelSerializer):
    job_post = JobPostListSerializer()

    class Meta:
        model = JobPostActivity
        fields = '__all__'


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['rating', 'id']
