/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fccel53chtsfa3r")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mjhpqn65",
    "name": "body",
    "type": "editor",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fccel53chtsfa3r")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mjhpqn65",
    "name": "body",
    "type": "editor",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
})
