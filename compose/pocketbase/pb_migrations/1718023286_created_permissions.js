/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "51f1mrp34k46csa",
    "created": "2024-06-10 12:41:26.162Z",
    "updated": "2024-06-10 12:41:26.162Z",
    "name": "permissions",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "2itscwnd",
        "name": "name",
        "type": "text",
        "required": false,
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
  const collection = dao.findCollectionByNameOrId("51f1mrp34k46csa");

  return dao.deleteCollection(collection);
})
