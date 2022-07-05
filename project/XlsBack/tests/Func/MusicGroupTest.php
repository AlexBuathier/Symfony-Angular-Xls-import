<?php

namespace App\Tests\Func;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class MusicGroupTest extends ApiTestCase
{
    public function testGetItem()
    {
        $this->createClient()->request(Request::METHOD_GET, "/api/music_groups/1");
        $this->assertResponseStatusCodeSame(Response::HTTP_OK);
    }

    public function testDeleteItem()
    {
        $this->createClient()->request(Request::METHOD_DELETE, "/api/music_groups/1");
        $this->assertResponseStatusCodeSame(Response::HTTP_NO_CONTENT);
    }

    public function testPostItem()
    {
        $this->createClient()->request(Request::METHOD_POST, "/api/music_groups",[
            "json" => [
                "name" => "Test",
                "startDate" => "1978-01-01",
                "separationDate" => "1984-01-01T00:00:00+01:00",
                "founder" => "John Doe",
                "members" => 6,
                "country" => "/api/countries/1",
                "city" => "/api/cities/1",
                "musicTrend" => "/api/music_trends/1",
                "presentation" => "Lorem ipsum dolor"
            ]
        ]);
        $this->assertResponseStatusCodeSame(Response::HTTP_CREATED);
    }

    public function testPutItem()
    {
        $this->createClient()->request(Request::METHOD_PUT, "/api/music_groups/2", [
            "json" => [
                "name" => "Test",
                "startDate" => "1978-01-01",
                "separationDate" => "1984-01-01T00:00:00+01:00",
                "founder" => "John Doe",
                "members" => 6,
                "country" => "/api/countries/1",
                "city" => "/api/cities/1",
                "musicTrend" => "/api/music_trends/1",
                "presentation" => "Lorem ipsum dolor"
            ]
        ]);
        $this->assertJsonContains([
            '@context' => '/api/contexts/MusicGroup',
            '@id' => '/api/music_groups/2',
            "@type" => "MusicGroup",
            "name" => "Test",
            "founder" => "John Doe",
            "startDate" => "1978-01-01",
            "separationDate" => "1984-01-01",
            "members" => 6,
            "presentation" => "Lorem ipsum dolor",
            "musicTrend" => [
                "@id" => "/api/music_trends/1",
                "@type" => "MusicTrend"
            ],
            "city" => [
                "@id" => "/api/cities/1",
                "@type" => "City",
                "country" => [
                    "@id" => "/api/countries/1",
                    "@type" => "Country"
                ]
            ]
        ]);
        $this->assertResponseStatusCodeSame(Response::HTTP_OK);
    }
}
