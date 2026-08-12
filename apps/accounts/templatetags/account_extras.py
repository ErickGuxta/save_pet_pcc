from django import template


register = template.Library()


@register.filter
def first_two_names(value):
    parts = str(value or "").split()
    return " ".join(parts[:2])
