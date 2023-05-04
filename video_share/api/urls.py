from django.urls import path
from .views import main, MyTokenObtainPairView, getPostDrafts

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    # path('', main),
    path('post-drafts/', getPostDrafts),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
