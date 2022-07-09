import axios from "axios";
import cookie from "react-cookies";

export const endpoints = {
  careers: "/careers/",
  cities: "/cities/",
  experiences: "experiences/",
  salaries: "/salaries/",
  positions: "/positions/",
  "working-forms": "/working-forms/",
  "top-companies": "/top-company/",
  "job-posts": "/job-posts/",
  "job-post-detail": (jobPostId) => `/job-posts/${jobPostId}/`,
  "job-posts-retrieve": (jobPostId) => `/job-posts/${jobPostId}/`,
  "job-post-view": (jobPostId) => `/job-posts/${jobPostId}/view/`,
  "job-post-recruiter": (jobPostId) => `/job-posts/${jobPostId}/job-post/`,
  "applied-job-post": (jobPostId) =>
    `/job-posts/${jobPostId}/applied-job-post/`,
  "job-seeker-profiles": "/job-seeker-profiles/",
  "job-seeker-profile-detail": (jobSeekerProfileId) =>
    `/job-seeker-profiles/${jobSeekerProfileId}/`,
  "job-seeker-profile-view": (jobSeekerProfileId) =>
    `/job-seeker-profiles/${jobSeekerProfileId}/view/`,
  "job-seeker-profile-cv": (jobSeekerProfileId) =>
    `/job-seeker-profiles/${jobSeekerProfileId}/curriculum-vitae/`,
  "job-seeker-profiles-stats": (jobSeekerProfileId) =>
    `/job-seeker-profiles/${jobSeekerProfileId}/stats/`,
  "curriculum-vitae": (cvId) => `/curriculum-vitae/${cvId}/`,
  "desired-job": (jobSeekerProfileId) =>
    `/job-seeker-profiles/${jobSeekerProfileId}/desired-job/`,
  companies: "/companies/",
  "education-detail": (jobSeekerProfileId) =>
    `/job-seeker-profiles/${jobSeekerProfileId}/education-detail/`,
  "experience-detail": (jobSeekerProfileId) =>
    `/job-seeker-profiles/${jobSeekerProfileId}/experience_details/`,
  "update-experience-detail": (experienceDetailId) =>
    `/experience-details/${experienceDetailId}/`,
  "add-experience-detail": "/experience-details/",
  "company-detail": (companyId) => `/companies/${companyId}/`,
  // create user
  users: `/users/`,
  "current-user": "/users/current-user/",
  "change-password": "/users/password/",
  "user-job-seeker-profile": (userId) => `/users/${userId}/job-seeker-profile/`,
  "company-info": (userId) => `/users/${userId}/company/`,
  "company-view": (companyId) => `/companies/${companyId}/view/`,
  "company-images": (companyId) => `/companies/${companyId}/image-companies/`,
  "company-image": (companyId) => `/companies/${companyId}/image-company/`,
  "company-comment": (companyId) => `/companies/${companyId}/comment/`,
  "company-comments": (companyId) => `/companies/${companyId}/comments/`,
  "company-rating": (companyId) => `/companies/${companyId}/rating/`,
  "company-stats": (companyId) => `/companies/${companyId}/stats/`,
  "image-companies": (imageCompanyId) => `/image-companies/${imageCompanyId}/`,
  "post-of-user": (userId) => `/users/${userId}/job-posts/`,
  "posted-of-user": (userId) => `/users/${userId}/job-posted/`,

  "user-save-job-posts": (userId) => `/users/${userId}/save-job-posts/`,
  "user-save-job-post": (userId) => `/users/${userId}/save-job-post/`,
  "user-save-job-posted": (userId) => `/users/${userId}/save-job-posted/`,
  "user-applied-job-posts": (userId) => `/users/${userId}/job-posts-activity/`,
  "applied-to-recruiter": `/apply-job/`,
  "reply-to-seeker": `/reply-seeker/`,
  "user-apply-job-post": (userId) => `/users/${userId}/job-post-activity/`,
  "save-job-posts": (saveJobPostId) => `/save-job-posts/${saveJobPostId}/`,
  "job-posts-activity": (jobPostActivityId) =>
    `/job-posts-activity/${jobPostActivityId}/`,
  // update
  "job-post-activity": (jobPostActivityId) =>
    `/job-posts-activity/${jobPostActivityId}/`,
  comments: (commentId) => `/comments/${commentId}/`,
  // auth
  "auth-info": "/oauth2-info/",
  auth: `/o/token/`,
};

export default axios.create({
  baseURL: "https://bkhuy.pythonanywhere.com/",
  // baseURL: "http://127.0.0.1:8000/",
});

export const authApi = () => {
  return axios.create({
    baseURL: "https://bkhuy.pythonanywhere.com/",
    // baseURL: "http://127.0.0.1:8000/",
    headers: {
      Authorization: `Bearer ${cookie.load("access_token")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
