<?php

namespace App\Http\Controllers\Notifications;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    //
    public function getNotifications()
    {
        $notification = Notification::orderBy('created_at', 'desc')->get();
        return $notification;

    }
    public function createNotification(Request $request)
    {
        return $this->create(($request->all()));


    }
    public function getMostRecent()
    {
        $date = today()->format('Y-m-d');
        $notification = Notification::where('expiry', '>=', $date)->where('active', true)->orderBy('created_at', 'desc')->first();
        return $notification;


    }
    protected function create(array $data)
    {
        $nextWeek = time() + (7 * 24 * 60 * 60);
        $date = date('Y-m-d', $nextWeek);
        return Notification::create(
            [
                'title' => $data['title'],
                'description' => $data['description'],
                'link' => $data['link'],
                'active' => true,
                'expiry' => $date
            ]
        );
    }
}