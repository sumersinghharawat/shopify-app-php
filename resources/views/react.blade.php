<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<link href="{{ asset('css/app.css') }}" rel="stylesheet" />
<head>
    <title>Event booking app</title></head>
<body>

<div id="app" data-shop="{{$shop}}" data-host="{{$host}}" data-api-key="{{$apiKey}}"></div>
<input type="hidden" id="apiKey" value="{{ config('shopify-app.api_key') }}">
<input type="hidden" id="shopOrigin" value="{{session('shopify_domain')}}">

<script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
