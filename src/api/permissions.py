from rest_framework.permissions import BasePermission

class IsAuthenticatedUser(BasePermission):
    """
    Faqat login bo‘lgan userlar uchun ruxsat beradi. Token kerak emas.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated