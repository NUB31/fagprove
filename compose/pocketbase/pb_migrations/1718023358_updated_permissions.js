/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("51f1mrp34k46csa")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bbdg2fmz",
    "name": "field",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "51f1mrp34k46csa",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("51f1mrp34k46csa")

  // remove
  collection.schema.removeField("bbdg2fmz")

  return dao.saveCollection(collection)
})
