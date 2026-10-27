from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    ROLE_CHOICES = [
        ("organizer", "Event organizer"),
        ("attendee", "Event attendee"),
        ("community_builder", "Community builder"),
    ]

    name = models.CharField(max_length=255, blank=True)
    email = models.EmailField(unique=True)
    role = models.CharField(
        max_length=30,
        choices=ROLE_CHOICES,
        default="organizer",
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "name"]

    def __str__(self):
        return self.email or self.username
