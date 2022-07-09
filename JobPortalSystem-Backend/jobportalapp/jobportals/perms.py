from rest_framework import permissions

seeker_role = 'seeker'
recruiter_role = 'recruiter'


def check_role(user, role):
    group = None
    if user.groups.exists():
        group = user.groups.first()

        return group.name == role
    else:
        return False


class IsSeekerUser(permissions.IsAuthenticated):
    def has_permission(self, request, view):
        return check_role(user=request.user, role=seeker_role)


class IsRecruiterUser(permissions.IsAuthenticated):
    def has_permission(self, request, view):
        return check_role(user=request.user, role=recruiter_role)


class ImageCompanyOwnerPerms(IsRecruiterUser):
    def has_object_permission(self, request, view, image_company):
        return request.user == image_company.company.recruiter


class JobPostOwnerPerms(IsRecruiterUser):
    def has_object_permission(self, request, view, job_post):
        return request.user == job_post.recruiter


class CommentOwnerPerms(IsSeekerUser):
    def has_object_permission(self, request, view, comment):
        return request.user == comment.user


class SaveJobPostOwnerPerms(IsSeekerUser):
    def has_object_permission(self, request, view, save_job_post):
        return request.user == save_job_post.seeker


class JobPostActivityOwnerPerms(IsSeekerUser):
    def has_object_permission(self, request, view, job_post_activity):
        return request.user == job_post_activity.seeker


class ExperienceDetailOwnerPerms(IsSeekerUser):
    def has_object_permission(self, request, view, experience_detail):
        return request.user == experience_detail.job_seeker_profile.job_seeker


class CurriculumVitaeOwnerPerms(IsSeekerUser):
    def has_object_permission(self, request, view, curriculum_vitae):
        return request.user == curriculum_vitae.job_seeker_profile.job_seeker
