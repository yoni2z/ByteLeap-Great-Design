from django.db import models

# Create your models here.

from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to="categories/")
    is_featured = models.BooleanField(default=False)

    def __str__(self):
        return self.name

