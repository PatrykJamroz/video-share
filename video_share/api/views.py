from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.shortcuts import render

from .models import PostDraft
from .serializers import PostDraftSerializer


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
