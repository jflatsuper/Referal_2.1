<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        //
        $nextWeek = time() + (7 * 24 * 60 * 60);
        $date = date('Y-m-d', $nextWeek);
        Schema::create('raffle', function (Blueprint $table) use ($date) {
            $table->id();
            $table->string('user_id');
            $table->string('username');
            $table->boolean('won')->default(false);
            $table->dateTime('expiry_date')->default($date);
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
        Schema::dropIfExists('raffle');
        //
    }
};