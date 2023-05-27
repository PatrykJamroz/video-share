from rest_framework.serializers import ModelSerializer, ReadOnlyField
from .models import PostDraft, Profile, Post


class PostDraftSerializer(ModelSerializer):
    class Meta:
        model = PostDraft
        fields = '__all__'

class PostSerializer(ModelSerializer):
    username = ReadOnlyField(source='user.username')
    user_bio = ReadOnlyField(source='user.profile.bio')


    class Meta:
        model = Post
        fields = '__all__'

class ProfileSerializer(ModelSerializer):
    username = ReadOnlyField(source='user.username')

    class Meta:
        model = Profile
        fields = '__all__'

    def get_following(self, obj):
        return obj.following.values_list('username', flat=True)

    def get_followers(self, obj):
        return obj.user.followers.values_list('username', flat=True)
