<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        //
        Schema::create('fame_contest', function (Blueprint $table) {
            $table->id();
            $table->string('user_id')->unique();
            $table->integer('count');
            $table->string('link')->unique();
            $table->boolean('active')->default(true);
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
        Schema::dropIfExists('fame_contest');
        //
    }
};