/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("juuy6c3cfvmljx1")

  collection.createRule = "@request.auth.access_level >= 20"
  collection.updateRule = "@request.auth.access_level >= 20"
  collection.deleteRule = "@request.auth.access_level >= 20"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("juuy6c3cfvmljx1")

  collection.createRule = "@request.auth.access_level >= 30"
  collection.updateRule = "@request.auth.access_level >= 30"
  collection.deleteRule = "@request.auth.access_level >= 30"

  return dao.saveCollection(collection)
})
