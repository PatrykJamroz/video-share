from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class PostDraft(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    video_url = models.URLField()
    video_source = models.CharField(max_length=10)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.CharField(max_length=150)
    following = models.ManyToManyField(User, symmetrical=False, blank=True, related_name='followers')
    # additional profile fields here

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    caption = models.CharField(max_length=128)
    video_id = models.CharField(max_length=128)
    video_src = models.CharField(max_length=128)
    created_date = models.DateField(auto_now=True)




