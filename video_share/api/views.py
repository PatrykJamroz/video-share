from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse
from rest_framework import generics
from django.contrib.auth.models import User

# from rest_framework.authtoken.admin import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.shortcuts import render

from .models import PostDraft, Profile
from .serializers import PostDraftSerializer, ProfileSerializer


# Create your views here.


def main(request):
    return HttpResponse('Hello')


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getPostDrafts(request):
    drafts = PostDraft.objects.all()
    serializer = PostDraftSerializer(drafts, many=True)
    return Response(serializer.data)


class PostDraftList(generics.ListAPIView, LoginRequiredMixin):
    serializer_class = PostDraftSerializer

    def get_queryset(self):
        user = User.objects.first()
        following = user.profile.following.all()
        queryset = PostDraft.objects.filter(user__in=following)
        return queryset
    

class Profile(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_object(self):
        return self.request.user.profile

    def retrieve(self, request, *args, **kwargs):
        profile = self.get_object()

        # Retrieve the count of PostDraft objects associated with the profile
        post_count = PostDraft.objects.filter(user=profile.user).count()

        serializer = self.get_serializer(profile)
        response_data = serializer.data

        # Add post_count and followers_count to the response
        response_data['post_count'] = post_count
        response_data['followers'] = profile.user.followers.values_list('user_id', flat=True)

        return Response(response_data)