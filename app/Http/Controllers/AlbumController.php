<?php

namespace App\Http\Controllers;

use App\Http\Middleware\HandleInertiaRequests;
use App\Models\Album;
use App\Models\Artist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AlbumController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Albums/Index', [
            'albums' => Album::with('artist:id,title')->get(),
            'artists' => DB::table('artists')->select()->get(),
            'csrf_token' => csrf_token(),
        ]);
    }

    public function upload()
    {
        return Inertia::render('Albums/Upload', [
            'albums' => Album::with('artist:id,title')->get(),
            'csrf_token' => csrf_token(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public static function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255', 
            'artist_id' => 'required', 
            'release_date' => 'date|required', 
            'price' => 'required|numeric|min:0', 
            'stock_quantity' => 'required|numeric|min:0'
        ]);
        $artist = Artist::find($request->artist_id);
        if ($artist == null) {
            return ("Artist does not exist.");
        }
        $artist->albums()->create($validated);
        return redirect()->route('albums.index')->with('success', 'Album created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Album  $album
     * @return \Illuminate\Http\Response
     */
    public function show(Album $album)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Album  $album
     * @return \Illuminate\Http\Response
     */
    public function edit(Album $album)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Album  $album
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Album $album)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'release_date' => 'required',
            'artist_id' => 'required|numeric',
            'price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|numeric|min:0'
        ]);
        $album->update($validated);
        return redirect(route('albums.index'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Album  $album
     * @return \Illuminate\Http\Response
     */
    public function destroy(Album $album)
    {
        $album->delete();
        return redirect(route('albums.index'));
    }

    public function readFile(Request $request)
    {
        $content = $request->file('file')->get();
        $albums = json_decode($content);
        return $albums;
    }

    public function saveToDB(Request $request)
    {
        $albums = $request->albums;
        foreach ($albums as $album) {
            $artist = Artist::find($album['artist_id']);
            if ($artist == null) {
                return ("Artist does not exist.");
            }
            $artist->albums()->create($album);
        }

        return 'Success';
    }
}
