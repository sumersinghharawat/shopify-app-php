<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->integer("duration_hours");
            $table->integer("duration_minute");
            $table->date("start_date");
            $table->date("end_date");
            $table->string("timezone");
            $table->date("event_schedule");
            $table->text("location");
            $table->text("address");
            $table->text("note");
            $table->json("weekly_schedule");
            $table->integer("status");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('events');
    }
}
