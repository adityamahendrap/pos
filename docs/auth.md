# Auth API Spec

## Login Auth API

Endpoint: POST /api/auth/login

Request Body:

```json
{
  "email": "zzz@gmail.com",
  "password": "jKQ5eNViFxGVsarpoF3eDeq1j2sIC1IU"
}
```

Response Body:

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI4MDlmMzI4NS03YzMxLTQ4ZWMtYmEyNS05OWY3MjEwMTE1N2MiLCJleHAiOjE2ODkxMDgzMzd9.HaYdLNwhfjDFuk_mPjYpS3yyhMNf9q4Q_GiAAboyOf8"
}
```

## Register Auth API

Endpoint: POST /api/auth/register

Request Body:

```json
{
  "name": "gaharasan",
  "email": "rarara999@gmail.com",
  "password": "dneo283nj",
  "confirmPassword": "dneo283nj"
}
```

Response Body:

```json
{
  "message": "User created. Verification sended, please check ypur email"
}
```

## Verify Token Auth API

Endpoint: POST /api/auth/verify-token

Headers:

- Authorization : token

Response Body:

```json
{
  "email": "rarara999@gmail.com"
}
```

## Change Password Auth API

Endpoint: PUT /api/auth/change-password

Headers:

- Authorization : token

Required Role: Any

Request Body:

```json
{
  "id": "c7ff148f-ac1e-41fa-80eb-94fe8411772b",
  "currentPassword": "ksajdlsk",
  "newPassword": "kdnfwe2"
}
```

Response Body:

```json
{
  "message": "Password updated"
}
```

## Forgot Password Auth API

Endpoint: PUT /api/auth/forgot-password

Required Role: Any

Request Body:

```json
{
  "email": "zzz@gmail.com"
}
```

Response Body:

```json
{
  "message": "Password reseted, please check your email"
}
```
