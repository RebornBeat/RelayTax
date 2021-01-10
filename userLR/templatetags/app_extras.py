from django import template
from django.utils.safestring import mark_safe

register = template.Library()

@register.filter(is_safe=True)
def qouted_strings(value):
    return mark_safe(f'"{value}"')

@register.filter(is_safe=True)
def space_to_uscore(value):
    return mark_safe(f'{value.replace(" ", "_")}')

@register.filter(is_safe=True)
def nested_value(value, key):
    print(type(value[key]))
    return value[key]

@register.filter(is_safe=True)
def string_value(value):
    x = 0
    
    for i in value:
        
        if i.isdigit():
            continue
        else:
            x = i
            
    return mark_safe(x)

@register.filter(is_safe=True)
def int_value(value):
    x = 0
    
    for i in value:
        
        if i.isdigit():
            x = int(i)
            
    return x