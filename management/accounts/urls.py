from django.urls import path

from .views import current_user, signin, signout, signup

urlpatterns = [
    path("signup/", signup, name="signup"),
    path("login/", signin, name="login"),
    path("logout/", signout, name="logout"),
    path("me/", current_user, name="current-user"),
]
