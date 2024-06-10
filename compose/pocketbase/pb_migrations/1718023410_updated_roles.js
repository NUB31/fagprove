/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("suirsxjvy9clrq7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uli4lsji",
    "name": "permissions",
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
  const collection = dao.findCollectionByNameOrId("suirsxjvy9clrq7")

  // remove
  collection.schema.removeField("uli4lsji")

  return dao.saveCollection(collection)
})
