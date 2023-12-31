<?php

namespace SEVEN_TECH\API\Google;

use Google\Client;

class Google
{
    private $credentialsPath;
    private $client;

    public function __construct($credentialsPath)
    {
        $this->credentialsPath = $credentialsPath;
        $this->client = new Client();
        $this->client->setApplicationName('Your Application Name');
        // $this->client->setScopes(GCalendar::CALENDAR_EVENTS);
        $this->client->setAuthConfig($this->credentialsPath);
        $this->client->setScopes('https://www.googleapis.com/auth/calendar');
    }
}
