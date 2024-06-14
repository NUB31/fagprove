/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("juuy6c3cfvmljx1")

  collection.listRule = "@request.auth.access_level >= 10"
  collection.viewRule = "@request.auth.access_level >= 10"
  collection.updateRule = "@request.auth.access_level >= 20 && owner.id = @request.auth.id"
  collection.deleteRule = "@request.auth.access_level >= 20 && owner.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("juuy6c3cfvmljx1")

  collection.listRule = "@request.auth.access_level >= 0"
  collection.viewRule = "@request.auth.access_level >= 0"
  collection.updateRule = "@request.auth.access_level >= 20"
  collection.deleteRule = "@request.auth.access_level >= 20"

  return dao.saveCollection(collection)
})
