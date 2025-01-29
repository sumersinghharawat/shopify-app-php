<?php

namespace App\Http\Controllers;

use App\Models\MargProducts;
use Exception;
use Illuminate\Http\Request;
use Shopify\Utils;
use Shopify\Auth\OAuth;
use Shopify\Auth\Session as AuthSession;
use Shopify\Clients\Rest;

class MargProductsController extends Controller
{
    /** @var AuthSession */
    protected $session;

    //
    public function getProduct(Request $request)
    {

        /** @var AuthSession */
        $session = $request->get('shopifySession'); // Provided by the shopify.auth middleware, guaranteed to be active

        $data = "Huy7X7t6Wh20ILOL + yeIJURFcdKxrwwmi5OhVH2aJSWnby33jtrifjaZZFKISRGwltUTuJAiMs3mwE03Y + JkFoHylnOcubix2FiVx6pcoOYtDTEZ0bjYf2ro0QkH7KPOna + eHnYFO4VTIOoazBmySww0MhsYn + 0dIh81OiteCAkwshZobwgWjTVIQA / wB9ik8t7y1OV1PMIl9R1LtogTu1N2XpnZ6 / nnw59ukRGtpxtxviRsArOVQ1DmkY5RYiYql8S1fEpqudjUD0XnlpS0uITgoEvciJFxbw8qaMPMHXx5OORLiL8PvcqxPQfMllMXT / GZaHEaYJiT711YfKupEF3DAZ + Laz43zoopxDbZDkEwt5YDIMmWyF2p9t7C6WwybgdEkodDqp8tbCbLgBug / DGfM31kvt8BOqO0zbtF5hqceFoMJ//R0JDQJXOpaLBDlukhkI7M1KqAvDLrLWvGd3Zkf3ln2nJfLsN/D5yvRd6TBMcreXkGBxoSFtypYm/9JrNfhFcCtG5Mdj6uu64ZA2HPnj6poIYceVD3CAzjKcZ3MfH/wdtmsSyUfTjGW7BYefVsfWp8fVyh9IEEYXSMmUX0y4dCcBvUsJrqWo8v6BmENQgt9nbgPIYepYxc3aSCo76qv6o4cUUnh7SkO9fedRxiuhS/olrRdTaLnXF8fK2HD/FYBDtG6kMJ47X9W0XsWak6G8kvVE5ZJ0xjB+FFMCADZPuPfG1zG2kDvRAcEsuhyxhQtYQbU5Ki9LF72PM5h/K+VxSXRZpq/JHBz0X0Aj4ucHYf6SQZoxkNIcA7zW3BnHLBvxzJMQ5sNUpbQ+YEr0IPq7kTpo01YXfvRMvZvhsnk47GU/X/YnlQvMZKB00qj2VO/AM8iMjDZSyWmuCIM9fdQrjg1cz/ozvD3KPHq1PZbW5omojXX51XRh7FwV8OJc5f5MyrmHXS6IcYvLUIFlu7AfSjLl8hfqewgAtbpHKgDKOcmc/4lqxbDrPb4+mPr8axopyQLVoqPJtLk77eZDFFn0+XilNr2k12RwJazRF8SrPTIKoIma8u/v5l7kdvNHqn3iVGdzcxGyRfvtxaIxDWCv7AsuoL2diszvXF0J1UjQl6PyOaQ5mXSq/9ob06JBmOXJ7cqoblLOPCg/86NKjMC8S/O500qAcJ22/is5suXcjP5X1BMyt+E/DD0MtbuvXq/0wWBxqGV/lorfnuSOh+4YeXIfMQIjhOlLHZPZvuMm39RyVyBxgLSc455cjDG5Mgbp+pkXcTcXCbaR+3BfA1Y9Y0tPTjuB3k3CHCe19GRy7yf2NobFOuJmrlbm8tEgYvplrHBsaN1RRWdpq7diUI+5TOfn0BPCXcVR9xaDT68/NOZ2X2bM8JxyXwc37yfuM8lMcsGfZOjzGQ2HOk/Kj+ArCanrt+lK36RVaGcdbBPHRrhBg+Beluf1oYY+CUMQvvtbA13KkFBOiMgc60M61gAzxbHIt7cbRe8cVQEzIWtJRF0VCp//faGPwFKi3yeQyjUukfuuQPcOB4dJxeHuqOqY0zBrp08UnAl/vmb8krsEAT1hrDnXi8y1jSPjex9/v/YToOit1X9xpmbL5I/Qf3b6q88oCQzJIq2uUXB7O1CCuYkdYLrvlwrRhNZisZbopXcW4OeZGGwnCxLOcxvALBwpMQMqnhlFi5IYCTfcvK9K4GaQ8Tjm5PpVe+ah1iKIURM8AUSxMcblJAK8v75Bsej9Wdf3BfMFhu2aK6V5QaZvyn+QroC7RBfUNixMllpgiMpQ4Ufso3XXo22tQO/gJsLs/SN+CMxUz6D5ypnBBz5tSr0JdqZ1A9MxdXU5uZA8+Wrm6qmxUTjDkFxajMhTKismnLK84BGVP6UezctkMommSD70x4Z+49DV7J8T0WfI/POJ13aOEi035f67BtFizAyEE6Jr8SSRJrZ6vY7UdDGZPTqm3DUhTkKgxE5qbWzVqXW5hXjb2o4IubPHEg1qlKwik1Cl6eqoi2EP6GMsoOwsHX3EkxYVzNJDcmdp+9DxIq6UCL+Codqq5H7KgIp9BdlKTFladvTIUdff3tO3Ej29BNLaTZtsQv+V/EzeoJLbrWjRdoGspAhuLoOiWp36lc37dAkRH/bDdlsyE6Yy15ZI8XQRap4PS6wv7Yb3plk/fD0Djo9bxqlScrdmuiftZNG2PePUocnMqDhmJ+k5cCuV775+bTRyUKCfdpHTJpDFjClW5KRR1f7JIstWSQDzv5fJGI77hXgn15d7JydWBEAhRiqAhcGrovt3BjQByu70ch5RdvwSdcBOmhhGzI7rV2a+TmnCvJFTfPN91UOCalX875k47N6qXZj7Jt6SXhBGocKnRDZoJkZxYADi7bShXb0nU6Zim13pr5/tL2wTb+SJlZXza9PLCnq8fRtcvSF9chtgef6Gb60zPS9mZUcXvo0INqSv0ZuGticiX9Ug==";
        $key = "690QIDCX1WU1";

        $decryptedData = $this->decrypt($data, $key);
        $decompressedData = $this->decompress($decryptedData);

        $decompressedData = $decompressedData->Details->pro_N;

        $decompressedData = collect($decompressedData)->map(function ($item, $key) {
            return [
                'code' => $item->code,
                'name' => $item->name,
                'stock' => $item->stock,
                'company' => $item->company,
                'Rate' => $item->Rate,
                'PRate' => $item->PRate,
            ];
        });

        $decompressedData->each(function ($item) {
            $existingProduct = MargProducts::where('code', $item['code'])->first();
            if ($existingProduct) {
                $existingProduct->update($item);
            } else {
                MargProducts::create($item);
            }
        });

        $margProducts = MargProducts::all();

        return response()->json($margProducts);
    }

    public static function decrypt($data, $key) {

        // Decode the base64-encoded data
        $encryptedData = base64_decode($data);

        // Prepare the key and IV
        $keyBytes = substr($key, 0, 16); // Ensure the key is 16 bytes
        $iv = str_pad(substr($keyBytes, 0, 12), 16, "\0"); // Pad the IV to 16 bytes

        // Decrypt the data using AES-128-CBC
        $decryptedData = openssl_decrypt(
            $encryptedData,
            'AES-128-CBC',
            $keyBytes,
            OPENSSL_RAW_DATA,
            $iv
        );

        if ($decryptedData === false) {
            throw new Exception('Decryption failed.');
        }

        return $decryptedData;
    }

    public static function decompress($compressedString)
    {
        // Decode the base64-encoded compressed string
        $compressedData = base64_decode($compressedString);

        // Decompress the data
        $decompressedData = gzinflate($compressedData);

        if ($decompressedData === false) {
            throw new Exception('Decompression failed.');
        }

        $decompressedData = preg_replace('/^\xEF\xBB\xBF/', '', $decompressedData);

        return json_decode( $decompressedData);
    }

    public function syncProduct(Request $request) {

        $MargPcode = $request->code;
        $ShopifyPid = $request->ShopifyProductId;

        $margProduct = MargProducts::where('code', $MargPcode)->first();
        $margProduct->ShopifyProductId = $ShopifyPid;
        $margProduct->SyncStatus = '1';
        $margProduct->save();

        $margProducts = MargProducts::all();

        return response()->json($margProducts);
    }

    public function unsyncProduct(Request $request) {

        $MargPcode = $request->code;

        $margProduct = MargProducts::where('code', $MargPcode)->first();
        $margProduct->ShopifyProductId = null;
        $margProduct->SyncStatus = '0';
        $margProduct->save();

        $margProducts = MargProducts::all();

        return response()->json($margProducts);
    }
}
