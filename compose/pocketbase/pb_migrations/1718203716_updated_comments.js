/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fccel53chtsfa3r")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tauxuqqm",
    "name": "idea",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "p7b6szoy4phs0f9",
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
  collection.schema.removeField("tauxuqqm")

  return dao.saveCollection(collection)
})
