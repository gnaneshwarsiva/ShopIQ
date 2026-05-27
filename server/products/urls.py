from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import test_api, register_user
from .views import get_products

urlpatterns = [

    path('test/', test_api),

    path('register/', register_user),

    path('login/', TokenObtainPairView.as_view()),

    path('token/refresh/', TokenRefreshView.as_view()),

    path('products/', get_products),

]
