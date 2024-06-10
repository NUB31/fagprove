/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("suirsxjvy9clrq7")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_8UBE9FF` ON `roles` (`role`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("suirsxjvy9clrq7")

  collection.indexes = []

  return dao.saveCollection(collection)
})
