/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p7b6szoy4phs0f9")

  collection.createRule = "(@request.auth.access_level >= 30 || @request.auth.access_level >= 10 && @request.auth.id = created_by.id) && (@request.auth.access_level >= 30  || @request.auth.access_level >= 10 && votes = 0)"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p7b6szoy4phs0f9")

  collection.createRule = "(@request.auth.access_level >= 20 || @request.auth.access_level >= 10 && @request.auth.id = created_by.id) && (@request.auth.access_level >= 20  || @request.auth.access_level >= 10 && votes = 0)"

  return dao.saveCollection(collection)
})
