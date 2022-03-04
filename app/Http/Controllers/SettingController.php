<?php

namespace App\Http\Controllers;

use App\Models\setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Shopify\Clients\Rest;
use Shopify\Utils;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\setting  $setting
     * @return \Illuminate\Http\Response
     */
    public function show(setting $setting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\setting  $setting
     * @return \Illuminate\Http\Response
     */
    public function edit(setting $setting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\setting  $setting
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, setting $setting)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\setting  $setting
     * @return \Illuminate\Http\Response
     */
    public function destroy(setting $setting)
    {
        //
    }

    public function configureTheme(Request $request){


        // $headers = {};

        // $session = Utils::loadCurrentSession($headers, $cookies, $isOnline);
        // $client = new Rest($session->getShop(), $session->getAccessToken());
        // $response = $client->get('shop');


        // $client = new Rest("your-development-store.myshopify.com", $accessToken);
        // $response = $client->get(
        //       "themes"
        // );

        return response()->json([
            'response_code' => 200,
            'message' => 'Curret Event.',
            'errors' => (Object)[],
            'data' => Auth::user()
        ], 200);

        // $client = new Rest($session->getShop(), $session->getAccessToken());
        // $response = $client->get('products');
    }
}
