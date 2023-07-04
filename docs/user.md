# User API Spec

## List User API

Endpoint: GET /api/users

Headers:

- Authorization : token

Query Params:

- limit : to limit the number of data that are displayed
- skip : to skip some data
  Required Role: Any

Required Role: Admin

Response Body:

```json
{
  "message": "Users retrieved successfully",
  "data": {
    "meta": {
      "total": 2,
      "limit": 10,
      "skip": 0
    },
    "users": [
      {
        "id": "00ea311b-fb35-45c6-a124-1a4656232d35",
        "name": "Aditya",
        "email": "asnxssasdasdbask@gmail.com",
        "role": "ADMIN",
        "createdAt": "2023-06-25T11:40:09.397Z"
      },
      {
        "id": "00f9fd7a-b1d5-418e-ac89-7b0e807a1101",
        "name": "Mahendra",
        "email": "myaaaa@gmail.com",
        "role": "CUSTOMER",
        "createdAt": "2023-06-25T09:37:13.390Z"
      }
    ]
  }
}
```

## Detail User API

Endpoint: GET /api/users/:id

Headers:

- Authorization : token

Required Role: Admin

Response Body:

```json
{
  "message": "User retrieved successfully",
  "data": {
    "id": "00ea311b-fb35-45c6-a124-1a4656232d35",
    "name": "Aditya",
    "email": "asnxssasdasdbask@gmail.com",
    "password": "$argon2id$v=19$m=65536,t=3,p=4$aBQgYajGLWm3/EQYMFqkxw$UYcuckTdFZgiqynhld/abTiRBVeKFykNCWGJLTItqSI",
    "role": "ADMIN",
    "isVerify": true,
    "createdAt": "2023-06-25T11:40:09.397Z",
    "updatedAt": "2023-06-25T11:40:09.397Z"
  }
}
```

## Update User API

Endpoint: PUT /api/users/:id

Headers:

- Authorization : token

Required Role: Admin

Request Body:

```json
{
  "name": "Winkz",
  "role": "ADMIN",
  "isVerify": true
}
```

Response Body:

```json
{
  "message": "User updated successfully"
}
```

## Delete User API

Endpoint: DELETE /api/users/:id

Headers:

- Authorization : token

Required Role: Admin

Request Body:

```json
{
  "name": "Winkz",
  "role": "ADMIN",
  "isVerify": true
}
```

Response Body:

```json
{
  "message": "User deleted successfully"
}
```
