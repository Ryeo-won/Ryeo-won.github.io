from django.contrib import admin
from .models import Menu, Category, Order

try:
    admin.site.unregister(Menu)
except admin.sites.NotRegistered:
    pass

try:
    admin.site.unregister(Category)
except admin.sites.NotRegistered:
    pass

try:
    admin.site.unregister(Order)
except admin.sites.NotRegistered:
    pass

class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('category_name',)}

class MenuAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'menu_image', 'display_categories')
    list_filter = ('categories',)
    search_fields = ('name',)
    filter_horizontal = ('categories',)

    def display_categories(self, obj):
        return ", ".join([category.category_name for category in obj.categories.all()])
    display_categories.short_description = 'Categories'

admin.site.register(Menu, MenuAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Order)
