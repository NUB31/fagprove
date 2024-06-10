/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ftjd9swtdl6f3nk",
    "created": "2024-06-10 13:28:56.264Z",
    "updated": "2024-06-10 13:28:56.264Z",
    "name": "permissions",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "1m9s0pke",
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
    "indexes": [
      "CREATE UNIQUE INDEX `idx_ZC06tIl` ON `permissions` (`name`)"
    ],
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
  const collection = dao.findCollectionByNameOrId("ftjd9swtdl6f3nk");

  return dao.deleteCollection(collection);
})
