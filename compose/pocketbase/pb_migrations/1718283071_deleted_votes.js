/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("l85q3thl80i40wf");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "l85q3thl80i40wf",
    "created": "2024-06-13 12:40:19.038Z",
    "updated": "2024-06-13 12:40:19.038Z",
    "name": "votes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "bykuuxzk",
        "name": "user",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "bprljx3h",
        "name": "idea",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "p7b6szoy4phs0f9",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
