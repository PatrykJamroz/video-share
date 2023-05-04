from rest_framework.serializers import ModelSerializer
from .models import PostDraft


class PostDraftSerializer(ModelSerializer):
    class Meta:
        model = PostDraft
        fields = '__all__'
