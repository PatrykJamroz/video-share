from django.contrib.auth.models import User
from django.db import models


# Create your models here.

class PostDraft(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    video_url = models.URLField()
    video_source = models.CharField()
