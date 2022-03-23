<?php

namespace App\Http\Controllers;

use App\Models\EventForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EventFormController extends Controller
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
    public function storeEventForm(Request $request)
    {
        //
        $validator = Validator::make($request->all(), [
            'form_title' => 'required',
            'form_status' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'response_code' => 422,
                'message' => 'The given data was invalid.',
                'errors' => $validator->errors(),
                'data' => (object)[]
            ], 422);
        }

        // return response()->json([
        //     'response_code' => 422,
        //     'message' => 'The given data was invalid.',
        //     'errors' => $request->all(),
        //     'data' => (object)[]
        // ], 422);
        
        $formData = array(
            "form_title"=>$request->form_title,
            "form_code"=>$request->form_code,
            "form_status"=>$request->form_status?0:1
        );

        try {
            EventForm::create($formData);
            return response()->json([
                'response_code' => 200,
                'message' => 'Form submitted.',
                'errors' => (Object)[],
                'data' => $request->all()
            ], 200);
            
        } catch (\Throwable $th) {
            return response()->json([
                'response_code' => 500,
                'message' => 'Form not submitted.',
                'errors' => $th,
                'data' => $formData
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\EventForm  $eventForm
     * @return \Illuminate\Http\Response
     */
    public function showEventForm($id="",EventForm $eventForm)
    {
        //
        return response()->json([
            'response_code' => 200,
            'message' => 'View all Forms.',
            'errors' => (Object)[],
            'data' => $id?$eventForm->where('id',$id)->first():$eventForm->all()
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\EventForm  $eventForm
     * @return \Illuminate\Http\Response
     */
    public function edit(EventForm $eventForm)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\EventForm  $eventForm
     * @return \Illuminate\Http\Response
     */
    public function editEventForm(Request $request,$id, EventForm $eventForm)
    {
        //
        
        $formData = array(
            "form_title"=>$request->form_title?$request->form_title:'',
            "form_code"=>$request->form_code?$request->form_code:'',
            "form_status"=>$request->form_status?$request->form_status:''
        );

        $formData = array_filter($formData);

        try {
            EventForm::where('id',$id)->update($formData);
            return response()->json([
                'response_code' => 200,
                'message' => 'Form submitted.',
                'errors' => $id,
                'data' => $formData
            ], 200);
            
        } catch (\Throwable $th) {
            return response()->json([
                'response_code' => 500,
                'message' => 'Form not submitted.',
                'errors' => $th,
                'data' => (Object)[]
            ], 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\EventForm  $eventForm
     * @return \Illuminate\Http\Response
     */
    public function destroyEventForm($id,EventForm $eventForm)
    {
        //
        $count = EventForm::where('id',$id)->count(); 
        if($count == 0){
            return response()->json([
                'response_code' => 404,
                'message' => 'Form not found.',
                'errors' => (Object)[],
                'data' => (Object)[]
            ], 404);
        
        }

        try {
            EventForm::where('id',$id)->delete();
            return response()->json([
                'response_code' => 200,
                'message' => 'Form deleted.',
                'errors' => $id,
                'data' => (Object)[]
            ], 200);            
        } catch (\Throwable $th) {
            return response()->json([
                'response_code' => 500,
                'message' => 'Form not deleted.',
                'errors' => $th,
                'data' => (Object)[]
            ], 500);
        }        
    }
}
