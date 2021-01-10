from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('portal/', views.portal, name='portal'),
    path('portal/question', views.portal_question, name='portal_question'),
    path('portal/personal', views.portal_personal, name='portal_personal'),
    path('portal/upload', views.portal_upload, name='portal_upload'),
    path('login/', views.portal_login, name='portal_login'),
    path('login/request', views.login_user, name='login_user'),
    path('register/', views.portal_register, name='portal_register'),
    path('register/request', views.register_user, name='register_user'),
]

