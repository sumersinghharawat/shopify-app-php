<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller
{

    use AuthorizesRequests;
    use DispatchesJobs;
    use ValidatesRequests;

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
    public function storeEvent(Request $request)
    {
        return response()->json([
                    'response_code' => 200,
                    'message' => 'Event not Created.',
                    'errors' => "Some this wrong!",
                    'data' => $request->all()
                ], 200);

        //
        // $validator = Validator::make($request->all(), [
        //     'product_id' => 'required| unique:events',
        //     'store_domain' => 'required',
        //     'duration_hours' => 'required',
        //     'duration_minute' => 'required',
        //     'start_date' => 'required',
        //     'timezone' => 'required',
        //     'event_schedule' => 'required',
        //     'weekly_schedule' => 'required'
        // ]);

        // if ($validator->fails()) {
        //     return response()->json([
        //         'response_code' => 422,
        //         'message' => 'The given data was invalid.',
        //         'errors' => $validator->errors(),
        //         'data' => (object)[]
        //     ], 422);
        // }

        // $eventData = [
        //     'product_id' => $request->product_id,
        //     'store_domain' => $request->store_domain,
        //     'duration_hours' => $request->duration_hours,
        //     'duration_minute' => $request->duration_minute,
        //     'start_date' => $request->start_date,
        //     'timezone' => $request->timezone,
        //     'event_schedule' => $request->event_schedule,
        //     'weekly_schedule' => $request->weekly_schedule
        // ];

        // // dd($eventData);
        // $data = Event::create($eventData);
        // if($data){
        //     return response()->json([
        //         'response_code' => 201,
        //         'message' => 'Event Created.',
        //         'errors' => (Object)[],
        //         'data' => $request->all()
        //     ], 201);
        // }else{
        //     return response()->json([
        //         'response_code' => 500,
        //         'message' => 'Event not Created.',
        //         'errors' => "Some this wrong!",
        //         'data' => (Object)[]
        //     ], 500);
        // }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function showEvent(Event $event,$id="")
    {
        //
        if($id != ""){
            return response()->json([
                'response_code' => 200,
                'message' => 'Curret Event.',
                'errors' => (Object)[],
                'data' => $event->where("product_id",$id)->first()
            ], 200);
        }
        return response()->json([
            'response_code' => 200,
            'message' => 'Curret Event.',
            'errors' => (Object)[],
            'data' => $event->all()
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function edit(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Event $event)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function destroy(Event $event)
    {
        //
    }
}
