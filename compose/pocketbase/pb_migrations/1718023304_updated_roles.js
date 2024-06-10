/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("suirsxjvy9clrq7")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_8UBE9FF` ON `roles` (`name`)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tweeofe4",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("suirsxjvy9clrq7")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_8UBE9FF` ON `roles` (`role`)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tweeofe4",
    "name": "role",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
