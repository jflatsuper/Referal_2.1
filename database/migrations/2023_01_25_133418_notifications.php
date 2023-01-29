<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        //
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('description');
            $table->string('link')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamp('expiry')->nullable();
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
        Schema::dropIfExists('notifications');
        //
    }
};