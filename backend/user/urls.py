
from django.urls import path
from .views import ProfileDetailView
from . import views

urlpatterns = [
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('main/', views.main_view, name='main'),
    path('profile/', views.main_view, name='user-profile'),
]
