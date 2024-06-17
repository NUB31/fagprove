/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("juuy6c3cfvmljx1")

  collection.createRule = "@request.auth.access_level >= 30 || (@request.auth.access_level >= 20 && owner.id = @request.auth.id)"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("juuy6c3cfvmljx1")

  collection.createRule = "@request.auth.access_level >= 20"

  return dao.saveCollection(collection)
})
