<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <title>Event booking app</title>
        <script src="https://unpkg.com/@shopify/app-bridge@2"></script>
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            if (window.top === window.self) {
                window.location.href = '/login?shop={{$shop}}';
            } else {
                var AppBridge = window['app-bridge'];
                var createApp = AppBridge.default;
                var Redirect = AppBridge.actions.Redirect;

                const app = createApp({
                    apiKey: "{{$apiKey}}",
                    shopOrigin: "{{$shop}}",
                    forceRedirect: false
                });

                const redirect = Redirect.create(app);

                console.log(app);

                redirect.dispatch(Redirect.Action.REMOTE, 'https://{{$hostName}}/login/toplevel?shop={{$shop}}');
            }
        });
        </script>
    </head>
    <body>
    </body>
</html>
