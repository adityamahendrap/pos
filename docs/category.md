# Category API Spec

## List Category API

Endpoint: GET /api/categories

Headers:

- Authorization : token

Query Params:

- limit : to limit the number of data that are displayed
- skip : to skip some data
  Required Role: Any

Response Body:

```json
{
  "message": "Categories retrieved successfully",
  "data": {
    "meta": {
      "total": 2,
      "limit": 10,
      "skip": 0
    },
    "categories": [
      {
        "id": "36e875eb-8630-40ed-95db-c7660c3cc15c",
        "name": "Makanan",
        "createdAt": "2023-06-25T15:38:20.776Z",
        "updatedAt": "2023-06-25T15:38:20.776Z"
      },
      {
        "id": "bca69d33-49a9-44d9-8394-79626bb2cce7",
        "name": "Minuman",
        "createdAt": "2023-06-27T14:14:41.897Z",
        "updatedAt": "2023-06-27T14:14:41.897Z"
      }
    ]
  }
}
```

## Detail Category API

Endpoint: GET /api/categories/:id

Headers:

- Authorization : token

Required Role: Any

Response Body:

```json
{
  "message": "Category retrieved successfully",
  "data": {
    "id": "f610fbc3-938d-49c3-bcdb-1ebf8cb3c9c7",
    "name": "Alat tulis",
    "createdAt": "2023-06-25T15:38:39.697Z",
    "updatedAt": "2023-06-25T15:38:39.697Z"
  }
}
```

## Create Category API

Endpoint: POST /api/categories/:id

Headers:

- Authorization : token

Required Role: Admin

Request Body:

```json
{
  "name": "Alat Tulis"
}
```

Response Body:

```json
{
  "message": "Category created successfully"
}
```

## Update Category API

Endpoint: PUT /api/categories/:id

Headers:

- Authorization : token

Required Role: Admin

Request Body:

```json
{
  "name": "Alat Tulis Kantor"
}
```

Response Body:

```json
{
  "message": "Category updated successfully"
}
```

## Delete Category API

Endpoint: DELETE /api/categories/:id

Headers:

- Authorization : token

Required Role: Admin

Response Body:

```json
{
  "message": "Category deleted successfully"
}
```
