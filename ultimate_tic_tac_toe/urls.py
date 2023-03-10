"""ultimate_tic_tac_toe URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from ult_tic_tac_toe import views

urlpatterns = [

    path('admin/', admin.site.urls),
    # Home page
    path('', views.home, name='home'),
    # Signup Page
    path('signup/', views.signupuser, name = 'signupuser'),
    # Logout user
    path('logout/', views.logoutuser, name = 'logoutuser'),
    path('login/', views.loginuser, name = 'loginuser'),
    path('boarddata/', views.boarddata, name = 'boarddata'), # Url that will update board database

]

