<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        //
        Schema::create('marketplace', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->string('name');
            $table->string('description');
            $table->string('link')->nullable();
            $table->string('transaction_id')->nullable();
            $table->boolean('active')->default(false);
            $table->boolean('approved')->default(false);
            $table->json('image')->nullable();
            $table->dateTime('expiry_date');
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
        Schema::dropIfExists('marketplace');
        //
    }
};