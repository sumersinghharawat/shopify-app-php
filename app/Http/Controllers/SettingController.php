<?php

namespace App\Http\Controllers;

use App\Models\setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Shopify\Auth\Session;
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

    public function checkConfigureTheme(Request $request){

        $session = $request->get('shopifySession');
        
        $client = new Rest($session->getShop(), $session->getAccessToken());
        
        $result = $client->get("shop");
        
        $shop = $result->getDecodedBody();
        
        $shopId = $shop['shop']['id']; 
        $shopDomain = $shop['shop']['domain'];
        // shop_id	
        // shop_domain	
        // activated
        $count = setting::where('shop_id',$shopId)->where('shop_domain',$shopDomain)->where('activated',1)->count();

        return response()->json([
            'response_code' => 200,
            'message' => 'Theme enabled',
            'data' => $count,
            'errors' => (Object)[]
        ], 200);
    }

    public function configureTheme(Request $request){

        /** @var AuthSession */
        
        $session = $request->get('shopifySession'); // Provided by the shopify.auth middleware, guaranteed to be active

        $client = new Rest($session->getShop(), $session->getAccessToken());
        
        $result = $client->get("shop");
        
        $shop = $result->getDecodedBody();
        
        $shopId = $shop['shop']['id'];

        $shopDomain = $shop['shop']['domain'];

        $result = $client->get('themes');

        $themes = $result->getDecodedBody();

        $activeThemeId = "";

        foreach($themes['themes'] as $theme){
            if($theme['role'] == "main"){
                $activeThemeId = $theme['id'];
            }
        }

        $result = $client->get("shop");
        
        $shop = $result->getDecodedBody();
        
        $shopId = $shop['shop']['id']; 
        $shopDomain = $shop['shop']['domain'];
        $activated = 0;
        
        if($request->status == 'Enabled'){
            $activated = 1;
        }else{
            $activated = 0;
        }

        $result = setting::updateOrCreate(['shop_id'=>$shopId,'shop_domain'=>$shopDomain],['shop_id'=>$shopId,'shop_domain'=>$shopDomain,'activated'=>$activated]);

        // $count = setting::where('shop_id',$shopId)->where('shop_domain',$shopDomain)->where('activated',1)->count();

        // if($count){

        // }else{

        // }

        $snippet = "Your snippet code";
        
        $array = array('asset' => array('key'=>'snippets/event-booking-app.liquid','value'=>$snippet));

        $result = $client->put('themes/'.$activeThemeId.'/assets',$array);

        $response = $result->getDecodedBody();

        return response()->json([
            'response_code' => 200,
            'message' => 'Curret Event.',
            'data' => $response,
            'errors' => $result
            // (Object)[]
        ], 200);
    }
}
