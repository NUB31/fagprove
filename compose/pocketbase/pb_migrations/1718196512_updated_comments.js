/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fccel53chtsfa3r")

  collection.createRule = "@request.auth.access_level >= 30 || (@request.auth.access_level >= 0 && created_by = @request.auth.id)"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fccel53chtsfa3r")

  collection.createRule = "@request.auth.access_level >= 0"

  return dao.saveCollection(collection)
})
