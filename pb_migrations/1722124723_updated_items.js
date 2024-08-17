/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t7e2x0rachef11i")

  collection.name = "raw_items"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t7e2x0rachef11i")

  collection.name = "items"

  return dao.saveCollection(collection)
})
