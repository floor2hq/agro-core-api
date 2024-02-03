## Registration API

### Example Request

```json
{
    "name":"Punit Kumar",
    "mail":"farmer2@mail.com",
    "password":"farmer2hehe",
    "role":"FARMER"
}
```

### Response

Upon successful registration:

```json
{
    "name": "Punit Kumar",
    "mail": "farmer2@mail.com",
    "password": "farmer2hehe",
    "role": "FARMER",
    "_id": "65bcf29eb7e559ca923dac0d",
    "createdAt": "2024-02-02T13:48:14.611Z",
    "__v": 0
}
```

In case of any errors or validation issues, the server will provide an error response with details on the encountered problem


## Login API

### Example Request

```json
{
    "name":"Punit Kumar",
    "mail":"farmer2@mail.com",
    "password":"farmer2hehe",
    "role":"FARMER"
}
```

### Response

Upon successful Login:

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1YmNmMjllYjdlNTU5Y2E5MjNkYWMwZCIsIm5hbWUiOiJQdW5pdCBLdW1hciIsIm1haWwiOiJmYXJtZXIyQG1haWwuY29tIiwicGFzc3dvcmQiOiJmYXJtZXIyaGVoZSIsInJvbGUiOiJGQVJNRVIiLCJjcmVhdGVkQXQiOiIyMDI0LTAyLTAyVDEzOjQ4OjE0LjYxMVoiLCJfX3YiOjB9LCJpYXQiOjE3MDY4ODE3NzMsImV4cCI6MTcwNjk2ODE3M30.CuAmyb2POoy0JX0tLt1Qa_R2ijlGSxSfY1tQFyuNLD4",
    "user": {
        "_id": "65bcf29eb7e559ca923dac0d",
        "name": "Punit Kumar",
        "mail": "farmer2@mail.com",
        "createdAt": "2024-02-02T13:48:14.611Z",
        "role": "FARMER"
    }
}
```

In case of any errors ,example : password Invalid: 

```json
{
    "error": "Invalid credentials"
}
```

## Get All Farms (farmer perspective) API

### Endpoint 
GET http://127.0.0.1:3000/farm

Authorization 

### Example Request

```json
{
    "name":"Punit Kumar",
    "mail":"farmer2@mail.com",
    "password":"farmer2hehe",
    "role":"FARMER"
}
```

### Response

Upon successful Login:

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1YmNmMjllYjdlNTU5Y2E5MjNkYWMwZCIsIm5hbWUiOiJQdW5pdCBLdW1hciIsIm1haWwiOiJmYXJtZXIyQG1haWwuY29tIiwicGFzc3dvcmQiOiJmYXJtZXIyaGVoZSIsInJvbGUiOiJGQVJNRVIiLCJjcmVhdGVkQXQiOiIyMDI0LTAyLTAyVDEzOjQ4OjE0LjYxMVoiLCJfX3YiOjB9LCJpYXQiOjE3MDY4ODE3NzMsImV4cCI6MTcwNjk2ODE3M30.CuAmyb2POoy0JX0tLt1Qa_R2ijlGSxSfY1tQFyuNLD4",
    "user": {
        "_id": "65bcf29eb7e559ca923dac0d",
        "name": "Punit Kumar",
        "mail": "farmer2@mail.com",
        "createdAt": "2024-02-02T13:48:14.611Z",
        "role": "FARMER"
    }
}
```

In case of any errors ,example : password Invalid: 

```json
{
    "error": "Invalid credentials"
}
```


