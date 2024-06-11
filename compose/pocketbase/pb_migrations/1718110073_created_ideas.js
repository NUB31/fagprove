/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "p7b6szoy4phs0f9",
    "created": "2024-06-11 12:47:53.826Z",
    "updated": "2024-06-11 12:47:53.826Z",
    "name": "ideas",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "q0jh3fgh",
        "name": "title",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "z1vxxeat",
        "name": "description",
        "type": "editor",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "convertUrls": false
        }
      },
      {
        "system": false,
        "id": "8vpq6zwl",
        "name": "created_by",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": "@request.auth.access_level >= 0",
    "viewRule": "@request.auth.access_level >= 0",
    "createRule": "@request.auth.access_level >= 0",
    "updateRule": "@request.auth.access_level >= 30",
    "deleteRule": "@request.auth.access_level >= 30",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("p7b6szoy4phs0f9");

  return dao.deleteCollection(collection);
})
