/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.listRule = "@request.auth.access_level >= 10"
  collection.viewRule = "@request.auth.access_level >= 10"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.listRule = "@request.auth.access_level >= 0"
  collection.viewRule = "@request.auth.access_level >= 0"

  return dao.saveCollection(collection)
})
