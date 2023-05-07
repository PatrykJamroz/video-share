from django.contrib import admin

# Register your models here.
from .models import PostDraft, Profile
admin.site.register(PostDraft)
admin.site.register(Profile)