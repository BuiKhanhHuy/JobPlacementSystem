from pathlib import Path
import os
from django.conf.global_settings import LANGUAGES as DJANGO_LANGUAGES

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-6-bchpv5unxx3+yb6#-y&@ebrtywl4hte!yma+bj#up(6&#tg('

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Application definition

INSTALLED_APPS = [
    'jazzmin',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'cloudinary_storage',
    'cloudinary',
    'django.contrib.staticfiles',
    'jobportals',
    'ckeditor',
    # 'ckeditor_uploader'
    'rest_framework',
    'oauth2_provider',
    'drf_yasg',
    'debug_toolbar',
    'corsheaders'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'debug_toolbar.middleware.DebugToolbarMiddleware'
]

# cloudinary

CLOUDINARY_STORAGE = {
    'CLOUD_NAME': 'dtnpj540t',
    'API_KEY': '371357798369383',
    'API_SECRET': '9zy7ehlUetIxxl7ibee4y3tmdL4'
}

MEDIA_URL = '/JobPortalSystemImages/'
DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'
# DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.RawMediaCloudinaryStorage'
FULL_URL_CLOUDINARY = "https://res.cloudinary.com/dtnpj540t/image/upload/v1647793521/"

CKEDITOR_UPLOAD_PATH = "/JobPortalSystemImages/"

CKEDITOR_CONFIGS = {
    'default': {
        'toolbar_Basic': [
            ['Source', '-', 'Bold', 'Italic']
        ],
        'toolbar_YourCustomToolbarConfig': [
            {'name': 'basicstyles',
             'items': ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript']},
            {'name': 'paragraph',
             'items': ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-',
                       'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']},
            {'name': 'insert',
             'items': ['Table', 'HorizontalRule']},
            {'name': 'styles', 'items': ['Styles', 'Format', 'Font', 'FontSize']},
            {'name': 'colors', 'items': ['TextColor', 'BGColor']},
            {'name': 'tools', 'items': ['Maximize', 'ShowBlocks']},
            '/',  # put this to force next toolbar on new line
            {'name': 'yourcustomtools', 'items': [
                # put the name of your editor.ui.addButton here
                'Preview',
                'Maximize',
            ]},
        ],
        'toolbar': 'YourCustomToolbarConfig',  # put selected toolbar config here
        'height': 280,
        'width': '100%',
        'tabSpaces': 4,
    }
}

ROOT_URLCONF = 'jobportalapp.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'jobportals/templates/')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'jobportalapp.wsgi.application'

# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'joblinkdb',
        'USER': 'root',
        'PASSWORD': '123456789',
        'HOST': ''
    }
}

# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

AUTH_USER_MODEL = 'jobportals.User'

# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'
# TIME_ZONE = 'Europe/Istanbul'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = '/static/'

MEDIA_ROOT = '%s/jobportals/static/' % BASE_DIR

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# English default
LANGUAGES = DJANGO_LANGUAGES

JAZZMIN_SETTINGS = {
    # title of the window (Will default to current_admin_site.site_title if absent or None)
    "site_title": "JobLink",

    # Title on the login screen (19 chars max) (defaults to current_admin_site.site_header if absent or None)
    "site_header": "JobLink",

    # Title on the brand (19 chars max) (defaults to current_admin_site.site_header if absent or None)
    "site_brand": "JobLink",

    # Logo to use for your site, must be present in static files, used for brand on top left
    "site_logo": "logo/job-link-logo.png",

    # CSS classes that are applied to the logo above
    "site_logo_classes": "img-rounded",

    # Relative path to a favicon for your site, will default to site_logo if absent (ideally 32x32 px)
    "site_icon": "logo/job-link-icon.png",

    # Welcome text on the login screen
    "welcome_sign": "Welcome to the Job Portal System.",

    # Copyright on the footer
    "copyright": "Bui Khanh Huy",

    # The model admin to search from the search bar, search bar omitted if excluded
    "search_model": "jobportals.User",

    # Field name on user model that contains avatar ImageField/URLField/Charfield or a callable that receives the user
    "user_avatar": None,

    ############
    # Top Menu #
    ############

    # Links to put along the top menu
    "topmenu_links": [

        # Url that gets reversed (Permissions can be added)
        {"name": "Home", "url": "admin:index", "permissions": ["auth.view_user"]},

        # external url that opens in a new window (Permissions can be added)
        {"name": "Support", "url": "https://github.com/BuiKhanhHuy/JobPortalSystem", "new_window": True},

        # model admin to link to (Permissions checked against model)
        {"model": "auth.User"},

        # App with dropdown menu to all its models pages (Permissions checked against models)
        {"app": "books"},
    ],

    #############
    # User Menu #
    #############

    # Additional links to include in the user menu on the top right ("app" url type is not allowed)
    "usermenu_links": [
        {"name": "Support", "url": "https://github.com/BuiKhanhHuy/JobPortalSystem", "new_window": True,
         "icon": "fas fa-life-ring"},
        {"model": "auth.user"}
    ],

    #############
    # Side Menu #
    #############

    # Whether to display the side menu
    "show_sidebar": True,

    # Whether to aut expand the menu
    "navigation_expanded": True,

    # Hide these apps when generating side menu e.g (auth)
    "hide_apps": [],

    # Hide these models when generating side menu (e.g auth.user)
    "hide_models": [],

    # List of apps (and/or models) to base side menu ordering off of (does not need to contain all apps/models)
    # Thu tu model
    "order_with_respect_to": ["jobportals.City", "jobportals.District", "jobportals.User",
                              "jobportals.Career", "jobportals.Position", "jobportals.Experience", "jobportals.Salary",
                              "jobportals.WorkingForm", "jobportals.JobSeekerProfile", "jobportals.DesiredJob",
                              "jobportals.CurriculumVitae",
                              "jobportals.EducationDetail", "jobportals.ExperienceDetail",
                              "jobportals.ViewJobSeekerProfile",
                              "jobportals.Company", "jobportals.ImageCompany", "jobportals.ViewCompanyProfile",
                              "jobportals.Comment", "jobportals.Rating", "jobportals.JobPost",
                              "jobportals.JobPostActivity", "jobportals.ViewJobPost"],

    # Custom links to append to app groups, keyed on app name
    "custom_links": {
        "books": [{
            "name": "Make Messages",
            "url": "make_messages",
            "icon": "fas fa-user",
            "permissions": ["books.view_book"]
        }]
    },

    # Custom icons for side menu apps/models See
    # https://fontawesome.com/icons?d=gallery&m=free&v=5.0.0,5.0.1,5.0.10,5.0.11,5.0.12,5.0.13,5.0.2,5.0.3,5.0.4,5.0.5,5.0.6,5.0.7,5.0.8,5.0.9,5.1.0,5.1.1,5.2.0,5.3.0,5.3.1,5.4.0,5.4.1,5.4.2,5.13.0,5.12.0,5.11.2,5.11.1,5.10.0,5.9.0,5.8.2,5.8.1,5.7.2,5.7.1,5.7.0,5.6.3,5.5.0,5.4.2
    # for the full list of 5.13.0 free icon classes
    "icons": {
        "auth": "fas fa-users-cog",
        "auth.user": "fas fa-user",
        "auth.Group": "fas fa-users",
        "jobportals.City": "fas fa-map-marker",
        "jobportals.District": "fas fa-map",
        "jobportals.Career": "fas fa-briefcase",
        "jobportals.comment": "fas fa-comments",
        "jobportals.DesiredJob": "fas fa-magic",
        "jobportals.CurriculumVitae": "fas fa-address-card",
        "jobportals.EducationDetail": "fas fa-graduation-cap",
        "jobportals.Experience": "fas fa-brain",
        "jobportals.ExperienceDetail": "fas fa-bolt",
        "jobportals.Salary": "fas fa-paragraph",
        "jobportals.User": "fas fa-user",
        "jobportals.WorkingForm": "fas fa-wrench",
        "jobportals.JobSeekerProfile": "fas fa-credit-card",
        "jobportals.Rating": "fas fa-star",
        "jobportals.JobPost": "fas fa-quote-right",
        "jobportals.JobPostActivity": "fas fa-check-square",
        "jobportals.Company": "fas fa-building",
        "jobportals.ImageCompany": "fas fa-image",
        "jobportals.ViewCompanyProfile": "fas fa-eye",
        "jobportals.ViewJobSeekerProfile": "fas fa-eye",
        "jobportals.ViewJobPost": "fas fa-eye",
        "jobportals.Position": "fas fa-medal"

    },
    # Icons that are used when one is not manually specified
    "default_icon_parents": "fas fa-chevron-circle-right",
    "default_icon_children": "fas fa-circle",
    #################
    # Related Modal #
    #################
    # Use modals instead of popups
    "related_modal_active": True,

    #############
    # UI Tweaks #
    #############
    # Relative paths to custom CSS/JS scripts (must be present in static files)
    "custom_css": "custom-jazzmin/css/style-jazzmin.css",
    "custom_js": None,
    # Whether to show the UI customizer on the sidebar
    "show_ui_builder": False,

    ###############
    # Change view #
    ###############
    # Render out the change view as a single form, or in tabs, current options are
    # - single
    # - horizontal_tabs (default)
    # - vertical_tabs
    # - collapsible
    # - carousel
    "changeform_format": "horizontal_tabs",
    # override change forms on a per modeladmin basis
    "language_chooser": False,
}

JAZZMIN_UI_TWEAKS = {
    "navbar_small_text": False,
    "footer_small_text": False,
    "body_small_text": False,
    "brand_small_text": False,
    "brand_colour": "navbar-primary",
    "accent": "accent-primary",
    "navbar": "navbar-light",
    "no_navbar_border": False,
    "navbar_fixed": False,
    "layout_boxed": False,
    "footer_fixed": False,
    "sidebar_fixed": False,
    "sidebar": "sidebar-dark-primary",
    "sidebar_nav_small_text": False,
    "sidebar_disable_expand": False,
    "sidebar_nav_child_indent": False,
    "sidebar_nav_compact_style": False,
    "sidebar_nav_legacy_style": False,
    "sidebar_nav_flat_style": False,
    "theme": "default",
    "dark_mode_theme": None,
    "button_classes": {
        "primary": "btn-primary",
        "secondary": "btn-secondary",
        "info": "btn-info",
        "warning": "btn-warning",
        "danger": "btn-danger",
        "success": "btn-success"
    }
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': ('oauth2_provider.contrib.rest_framework.OAuth2Authentication',),
}

CORS_ALLOW_ALL_ORIGINS = True

INTERNAL_IPS = ('127.0.0.1',)

EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_HOST_USER = "joblink.easy@gmail.com"
EMAIL_HOST_PASSWORD = "epgvjjjzluxuyshe"
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_USE_TLS = True
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

CLIENT_ID = 'gFaBCJ8ua7yjuA0ei0xh2xm9t8jEyi9bb4bEfd3I'
CLIENT_SECRET = 'ShZ4eZvFKs908YfAIODoLdDsfzxTYyoBAFRKSFL5bQr4MjozJWJ3nNV1B9Brn0k0fDYN8Ofj52KY1M9c6YQCF47sjaYm4s5AmkIzJkOVVCgdlLj27ekNGGJofcx8IMQx'