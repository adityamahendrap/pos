# Product API Spec

## List Product API

Endpoint: GET /api/products

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
  "message": "Products retrieved successfully",
  "data": {
    "meta": {
      "total": 2,
      "limit": 10,
      "skip": 0
    },
    "products": [
      {
        "id": "18a8d2df-2ec2-4138-a284-57d05c379cdd",
        "sku": "478923479823",
        "name": "Chocho313",
        "stock": 12,
        "price": 20000,
        "image": "https://drive/dasdas/prod-12",
        "category": {
          "id": "36e875eb-8630-40ed-95db-c7660c3cc15c",
          "name": "Makanan"
        },
        "createdAt": "2023-06-26T09:35:19.038Z",
        "updatedAt": "2023-06-26T12:38:22.066Z"
      },
      {
        "id": "f5b1a9bf-3f35-4d81-84a5-97289e96c122",
        "sku": "23904832",
        "name": "Berry213",
        "stock": 10,
        "price": 8000,
        "image": "https://drive/dasdas/prod-14",
        "category": {
          "id": "36e875eb-8630-40ed-95db-c7660c3cc15c",
          "name": "Makanan"
        },
        "createdAt": "2023-06-26T09:35:38.699Z",
        "updatedAt": "2023-07-04T19:48:53.539Z"
      }
    ]
  }
}
```

## Detail Product API

Endpoint: GET /api/products/:id

Headers:

- Authorization : token

Required Role: Any

Response Body:

```json
{
  "message": "product retrieved successfully",
  "data": {
    "id": "18a8d2df-2ec2-4138-a284-57d05c379cdd",
    "sku": "478923479823",
    "name": "Chocho313",
    "stock": 12,
    "price": 20000,
    "image": "https://drive/dasdas/prod-12",
    "category": {
      "id": "36e875eb-8630-40ed-95db-c7660c3cc15c",
      "name": "Makanan"
    },
    "createdAt": "2023-06-26T09:35:19.038Z",
    "updatedAt": "2023-06-26T12:38:22.066Z"
  }
}
```

## Create Product API

Endpoint: POST /api/products/:id

Headers:

- Authorization : token

Required Role: Admin

Request Body:

```json
{
  "sku": "478923479823",
  "name": "Chocho313",
  "stock": 12,
  "price": 20000,
  "image": "https://drive/dasdas/prod-12",
  "categoryId": "36e875eb-8630-40ed-95db-c7660c3cc15c"
}
```

Response Body:

```json
{
  "message": "Product created successfully"
}
```

## Delete Product API

Endpoint: DELETE /api/products/:id

Headers:

- Authorization : token

Required Role: Admin

Response Body:

```json
{
  "message": "Product deleted successfully"
}
```
