from django.urls import path
from .views import main, MyTokenObtainPairView, getPostDrafts, PostDraftList, Profile, PostList

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    # path('', main),
    path('posts/', PostList.as_view()),
    path('post-draft-list/', PostDraftList.as_view()),
    path('profile/', Profile.as_view()),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
