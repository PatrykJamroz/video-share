from django.contrib import admin

# Register your models here.
from .models import PostDraft, Profile, Post
admin.site.register(PostDraft)
admin.site.register(Profile)
admin.site.register(Post)