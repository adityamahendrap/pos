# Payment API Spec

## List Payment API

Endpoint: GET /api/payments

Headers:

- Authorization : token

Query Params:

- limit : to limit the number of data that are displayed
- skip : to skip some data
  Required Role: Any

Required Role: Any

Response Body:

```json
{
  "message": "Payments retrieved successfully",
  "data": {
    "meta": {
      "total": 2,
      "limit": 10,
      "skip": 0
    },
    "payments": [
      {
        "id": "d0261f86-9c89-47c8-8740-3f72054a445d",
        "name": "Cash",
        "type": "CASH",
        "logo": "http://drive/eiwqeqw/logo1.png",
        "createdAt": "2023-06-26T09:40:44.755Z",
        "updatedAt": "2023-06-26T12:41:07.168Z"
      },
      {
        "id": "ed989916-4156-43dd-b130-82e078639be5",
        "name": "DANA",
        "type": "DEBIT",
        "logo": "http://drive/eiwqeqw/logo2.png",
        "createdAt": "2023-06-26T09:41:02.593Z",
        "updatedAt": "2023-06-26T09:41:02.593Z"
      }
    ]
  }
}
```

## Detail Payment API

Endpoint: GET /api/payments/:id

Headers:

- Authorization : token

Required Role: Any

Response Body:

```json
{
  "message": "Payment retrieved successfully",
  "data": {
    "id": "f6fc04b8-c379-4141-9fe1-9b004e0d9d01",
    "name": "Shoopepay",
    "type": "DEBIT",
    "logo": "http://drive/eiwqeqw/logo2.png",
    "createdAt": "2023-06-26T09:41:07.784Z",
    "updatedAt": "2023-06-26T09:41:07.784Z"
  }
}
```

## Create Payment API

Endpoint: POST /api/payments/:id

Headers:

- Authorization : token

Required Role: Admin

Request Body:

```json
{
  "name": "Shoopepay",
  "type": "DEBIT",
  "logo": "http://drive/eiwqeqw/logo2.png"
}
```

Response Body:

```json
{
  "message": "Payment created successfully"
}
```

## Delete Payment API

Endpoint: DELETE /api/payments/:id

Headers:

- Authorization : token

Required Role: Admin

Response Body:

```json
{
  "message": "Payment deleted successfully"
}
```
