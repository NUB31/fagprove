/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fccel53chtsfa3r")

  collection.listRule = "@request.auth.access_level >= 0"
  collection.viewRule = "@request.auth.access_level >= 0"
  collection.createRule = "@request.auth.access_level >= 0"
  collection.updateRule = "@request.auth.access_level >= 0 && @request.auth.id = idea.created_by.id"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "btzr71jl",
    "name": "created_by",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
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

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null

  // remove
  collection.schema.removeField("btzr71jl")

  return dao.saveCollection(collection)
})
