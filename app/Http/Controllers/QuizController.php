<?php

namespace App\Http\Controllers;
namespace App\Http\Middleware;

use Illuminate\Http\Request;

class QuizController extends Controller
{
    public function index()
    {
        return view('quiz');
    }
}
