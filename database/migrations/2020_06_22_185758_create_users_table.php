<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('role_id');
            $table->foreign('role_id')->references('id')->on('roles');
            $table->string('f_name');
            $table->string('l_name');
            $table->string('email')->unique();
            $table->string('password')->nullable();
            $table->boolean('email_verified')->nullable();
            $table->string('verification_token')->nullable();
            $table->string('reference')->nullable();
            $table->text('avatar')->nullable();
            $table->string('remember_token')->nullable();
            $table->string('reset_password')->nullable();
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
