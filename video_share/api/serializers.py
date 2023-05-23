from rest_framework.serializers import ModelSerializer
from .models import PostDraft, Profile


class PostDraftSerializer(ModelSerializer):
    class Meta:
        model = PostDraft
        fields = '__all__'

class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

    def get_following(self, obj):
        return obj.following.values_list('username', flat=True)

    def get_followers(self, obj):
        return obj.user.followers.values_list('username', flat=True)
