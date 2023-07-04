# Order API Spec

## List Order API

Endpoint: GET /api/orders

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
  "message": "Orders retrieved successfully",
  "data": {
    "meta": {
      "total": 2,
      "limit": 10,
      "skip": 0
    },
    "orders": [
      {
        "id": "7868aae3-32ae-401e-a74d-6c780bbf1072",
        "name": "Order 9",
        "userId": "00ea311b-fb35-45c6-a124-1a4656232d35",
        "payment": {
          "id": "d0261f86-9c89-47c8-8740-3f72054a445d",
          "name": "Cash",
          "type": "CASH"
        },
        "totalPrice": 24000,
        "totalPaid": 100000,
        "totalReturn": 76000,
        "receiptCode": "543279178291922"
      },
      {
        "id": "8282eb20-c18a-42fe-8409-14d310201c0d",
        "name": "Order 12",
        "userId": "00ea311b-fb35-45c6-a124-1a4656232d35",
        "payment": {
          "id": "d0261f86-9c89-47c8-8740-3f72054a445d",
          "name": "Cash",
          "type": "CASH"
        },
        "totalPrice": 15000,
        "totalPaid": 100000,
        "totalReturn": 85000,
        "receiptCode": "76387039761321t32"
      }
    ]
  }
}
```

## Detail Order API

Endpoint: GET /api/orders/:id

Headers:

- Authorization : token

Required Role: Any

Response Body:

```json
{
  "message": "Order retrieved successfully",
  "data": {
    "id": "7868aae3-32ae-401e-a74d-6c780bbf1072",
    "name": "Order 9",
    "userId": "00ea311b-fb35-45c6-a124-1a4656232d35",
    "payment": {
      "id": "d0261f86-9c89-47c8-8740-3f72054a445d",
      "name": "Cash",
      "type": "CASH"
    },
    "totalPrice": 24000,
    "totalPaid": 100000,
    "totalReturn": 76000,
    "receiptCode": "543279178291922",
    "products": [
      {
        "productId": "f5b1a9bf-3f35-4d81-84a5-97289e96c122",
        "totalPrice": 8000,
        "quantity": 1
      },
      {
        "productId": "fbb7c88e-ebd1-45fb-88b4-ac7dd567f6a7",
        "totalPrice": 16000,
        "quantity": 2
      }
    ]
  }
}
```

## Create Order API

Endpoint: POST /api/orders/:id

Headers:

- Authorization : token

Required Role: Admin

Request Body:

```json
{
  "userId": "00ea311b-fb35-45c6-a124-1a4656232d35",
  "paymentId": "d0261f86-9c89-47c8-8740-3f72054a445d",
  "name": "Order 9",
  "totalPaid": 1000000,
  "products": [
    {
      "productId": "fbb7c88e-ebd1-45fb-88b4-ac7dd567f6a7",
      "quantity": 1
    },
    {
      "productId": "f5b1a9bf-3f35-4d81-84a5-97289e96c122",
      "quantity": 1
    }
  ]
}
```

Response Body:

```json
{
  "message": "Order created successfully"
}
```

## Cancel Order API

Endpoint: DELETE /api/orders/cancel/:id

Headers:

- Authorization : token

Required Role: Admin

Response Body:

```json
{
  "message": "Order canceled successfully"
}
```

## Delete Order API

Endpoint: DELETE /api/orders/:id

Headers:

- Authorization : token

Required Role: Admin

Response Body:

```json
{
  "message": "Order deleted successfully"
}
```
