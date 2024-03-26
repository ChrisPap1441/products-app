const m2s = require('mongoose-to-swagger');
const User = require('./models/user.model');
const Product = require('./models/product.model');

exports.options = {
    "components": {
        "schemas": {
            User: m2s(User),
            Product: m2s(Product)
        }       
    },
    "openapi": "3.1.0",
    "info": {
        "version": "1.0.0",
        "title": "Products CRUD API",
        "description": "Products project aplication",
        "contact": {
            "name": "API Support",
            "url": "http://www.example.com",
            "email": "support@example.com"
        }
    },
    "servers": [
        {
            url: 'http://localhost:3000',
            description: 'Local Server'
        },
        {
            url: 'http://www.example.com',
            description: 'Testing server'
        }
    ],
    "tags": [
        {
            "name": "Users",
            "description": "API endpoints for users"
        },
        {
            "name": "Products",
            "description": "API endpoints for products"
        },
        {
            "name": "Users and Products",
            "description": "API endpoints for users and their products"
        }
    ],
    "paths": {
        "/api/users" : {
            "get": {
                "tags": ["Users"],
                "description": "Return all users",
                "responses": {
                    "200": {
                        "description": "A list of users",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/User"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post":{
                "tags": ["Users"],
                "description":"Create new user",
                "requestBody":{
                  "description":"User schema to insert",
                  "content":{
                    "application/json":{
                      "schema":{
                        "type":"object",
                        "properties":{
                          "username": {"type":"string"},
                          "password": {"type":"string"},
                          "name": {"type":"string"},
                          "surname": {"type":"string"},
                          "email": {"type":"string"},
                          "address": {
                            "type":"object",
                            "properties":{
                              "area": {"type":"string"},
                              "road": {"type":"string"}
                            }
                          },
                          "phone":{
                            "type":"array",
                            "items":{
                              "type":"object",
                              "properties":{
                                "type": {"type":"string"},
                                "number": {"type":"string"}
                              }
                            }
                          }
                        },
                        "required":["username", "password","email"]
                      }
                    }
                  }
                },
                "responses":{
                  "200":{
                    "description": "New user inserted"
                  }
                }
              }
        },
        "/api/users/{username}": {
            "get": {
                "tags": ["Users"],
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "Username of user that we want to find",
                        "type": "string"
                    }
                ],
                "description": "Get userwith specific username",
                "responses": {
                    "200": {
                        "description": "User to find",
                        "schema": {
                            "$ref": "#/components/schemas/User"
                        }
                    }
                }
            },
            "patch": {
                "tags": ["Users"],
                "description": "Update user in app",
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "Username of user to update",
                        "type": "string"
                    }
                ],
                "requestBody": {
                    "description": "User that we update",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "username": {
                                        "type": "string"
                                    },
                                    "name": {
                                        "type": "string"
                                    },
                                    "surname": {
                                        "type": "string"
                                    },
                                    "email": {
                                        "type": "string"
                                    },
                                    "address": {
                                        "type": "object",
                                        "properties": {
                                            "area": {
                                                "type": "string"
                                            },
                                            "road": {
                                                "type": "string"
                                            }
                                        }
                                    },
                                    "phone": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "type": {
                                                    "type": "string"
                                                },
                                                "number": {
                                                    "type": "number"
                                                }
                                            }
                                        }
                                    }
                                },
                                "required": [
                                    "email"
                                ]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Update user",
                        "schema": {
                            "$ref":"#/components/schemas/User"
                        }
                    }
                }
            },
            "delete": {
                "tags": ["Users"],
                "description": "Delete a user",
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "User to delete",
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Delete a user"
                    }
                }
            }
        },
        "/api/products": {
            "get": {
                "tags": ["Products"],
                "description": "Return all products",
                "responses": {
                    "200": {
                        "description": "A list of products",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/Product"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": ["Products"],
                "description": "Create new product in system",
                "requestBody": {
                    "description": "Product that we want to create",
                    "content": {
                        "application/json": {
                            "schema" : {
                                "type": "object",
                                "properties": {
                                    "product": {
                                        "type": "string"
                                    },
                                    "cost": {
                                        "type": "number"
                                    },
                                    "description": {
                                        "type": "string"
                                    },
                                    "quantity": {
                                        "type": "number"
                                    }
                                },
                                "required": ["product", "cost", "description", "quantity"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description" : "New product is created",
                    }
                }
            }
        },
        "/api/products/{productId}": {
            "get": {
                "tags": ["Products"],
                "parameters": [
                    {
                        "name": "productId",
                        "in": "path",
                        "required": true,
                        "description": "ID of product that we want to find",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "description": "Get product with specific ID",
                "responses": {
                    "200": {
                        "description": "Product to find",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Product"
                                }
                            }
                        }
                    }
                }
            },
            "patch": {
                "tags": ["Products"],
                "parameters": [
                    {
                        "name": "productId",
                        "in": "path",
                        "required": true,
                        "description": "ID of product that we want to update",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "description": "Update product with specific ID",
                "requestBody": {
                    "description": "Fields to update for the product",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "product": {
                                        "type": "string"
                                    },
                                    "cost": {
                                        "type": "number"
                                    },
                                    "description": {
                                        "type": "string"
                                    },
                                    "quantity": {
                                        "type": "number"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Product updated successfully"
                    }
                }
            },
            "delete": {
                "tags": ["Products"],
                "parameters": [
                    {
                        "name": "productId",
                        "in": "path",
                        "required": true,
                        "description": "ID of product that we want to delete",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "description": "Delete product with specific ID",
                "responses": {
                    "200": {
                        "description": "Product deleted successfully"
                    }
                }
            }
        },
        
    }
}