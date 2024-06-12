/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fccel53chtsfa3r")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tkjl0uqv",
    "name": "responding_to",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "fccel53chtsfa3r",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fccel53chtsfa3r")

  // remove
  collection.schema.removeField("tkjl0uqv")

  return dao.saveCollection(collection)
})
