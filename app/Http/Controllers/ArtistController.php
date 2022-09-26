<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ArtistController extends Controller
{
    public function index()
    {
        $artists = DB::table('artists')->select()->get();
        return Inertia::render('Artists/Index', [
            'artists' => $artists,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate(['title' => 'required|string|max:255', 'origin' => 'required',]); // neveikia validacija
        Artist::create($validated);
        return redirect(route('artists.index'));
    }

    public function update(Request $request, Artist $artist)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'origin' => 'required|string'
        ]);
        $artist->update($validated);
        return redirect(route('artists.index'));
    }

    public function destroy(Artist $artist)
    {
        $artist->delete();
        return redirect(route('artists.index'));
    }
}
