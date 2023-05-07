from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class PostDraft(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    video_url = models.URLField()
    video_source = models.CharField(max_length=10)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    following = models.ManyToManyField(User, symmetrical=False, blank=True, related_name='followers')
    # additional profile fields here
