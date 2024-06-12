/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "7wcxig825jnabs2",
    "created": "2024-06-12 11:24:03.693Z",
    "updated": "2024-06-12 11:24:03.693Z",
    "name": "status",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "fnmuzann",
        "name": "name",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("7wcxig825jnabs2");

  return dao.deleteCollection(collection);
})
