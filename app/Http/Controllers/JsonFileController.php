<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JsonFileController extends Controller
{
    private string $filename;

    public function __construct(string $filename)
    {
        $this->filename = $filename;
    }

    public static function readDataFromFile($filename) {
        $albumsArr = [];
        $fileContent = file_get_contents($filename);
        $albumsJson = json_decode($fileContent);
        foreach($albumsJson->album as $resultRow) {
            $album = new Album(
                $title = $resultRow->title,
                $artist_id = $resultRow->artist_id,
                $release_date = $resultRow->release_date,
                $price = $resultRow->price,
                $stock_quantity = $resultRow->stock_quantity
            );
            array_push($albumsArr, $album);
        }
        dd($albumsArr);
        return $albumsArr;
    }
}