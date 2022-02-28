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
            $table->text("product_id");
            $table->text("store_domain");
            $table->integer("duration_hours");
            $table->integer("duration_minute");
            $table->string("start_date");
            $table->string("end_date")->nullable();
            $table->string("timezone");
            $table->string("event_schedule");
            $table->text("location")->nullable();
            $table->text("address")->nullable();
            $table->text("note")->nullable();
            $table->json("weekly_schedule");
            $table->integer("status")->default(0);
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
