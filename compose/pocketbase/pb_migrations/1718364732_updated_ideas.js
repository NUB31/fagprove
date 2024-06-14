/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p7b6szoy4phs0f9")

  collection.updateRule = "@request.auth.access_level >= 30 || (@request.auth.access_level >= 20 && category.owner.id = @request.auth.id) || (@request.auth.access_level >= 20 && category = null)"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p7b6szoy4phs0f9")

  collection.updateRule = "@request.auth.access_level >= 30 || (@request.auth.access_level >= 20 && category.owner.id = @request.auth.id) || (@request.auth.access_level >= 20 && category:isset = false)"

  return dao.saveCollection(collection)
})
