<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

// Demo
$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->get('/random-string', function () {
    return str_random(32);
});

// Authentication
$router->post('/register', 'AuthController@register');
$router->post('/login', 'AuthController@login');
$router->post('/validate-api-token', 'AuthController@validateApiToken');

// User
$router->get('/users', 'UserController@index');
$router->get('/users/{id}', 'UserController@show');
$router->post('/users', 'UserController@create');
$router->put('/users/{id}', 'UserController@update');
$router->delete('/users/{id}', 'UserController@destroy');

// Patient 
$router->get('/patients', 'PatientController@index');
$router->get('/patients/{id}', 'PatientController@show');
$router->post('/patients', 'PatientController@create');
$router->put('/patients/{id}', 'PatientController@update');
$router->delete('/patients/{id}', 'PatientController@destroy');

// Doctors
$router->get('/doctors', 'DoctorController@index');
$router->get('/doctors/{id}', 'DoctorController@show');
$router->post('/doctors', 'DoctorController@create');
$router->put('/doctors/{id}', 'DoctorController@update');
$router->delete('/doctors/{id}', 'DoctorController@destroy');

// Rooms
$router->get('/rooms', 'RoomController@index');
$router->get('/rooms/{id}', 'RoomController@show');
$router->post('/rooms', 'RoomController@create');
$router->put('/rooms/{id}', 'RoomController@update');
$router->delete('/rooms/{id}', 'RoomController@destroy');

// Checkups
$router->get('/checkups', 'CheckupController@index');
$router->get('/checkups/{id}', 'CheckupController@show');
$router->post('/checkups', 'CheckupController@create');
$router->put('/checkups/{id}', 'CheckupController@update');
$router->delete('/checkups/{id}', 'CheckupController@destroy');