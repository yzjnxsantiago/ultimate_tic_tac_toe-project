"""
ASGI config for ultimate_tic_tac_toe project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from channels.auth import AuthMiddlewareStack
import ult_tic_tac_toe.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ultimate_tic_tac_toe.settings')

application = ProtocolTypeRouter({
  
    'http':get_asgi_application(),
    'websocket': AllowedHostsOriginValidator(
        AuthMiddlewareStack(
        URLRouter(

            ult_tic_tac_toe.routing.websocket_urlpatterns

        )
        )
    )


})