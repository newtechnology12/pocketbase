/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p4oit50uvu6w5ok")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j5ledlmf",
    "name": "enable_delete_draft_items",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p4oit50uvu6w5ok")

  // remove
  collection.schema.removeField("j5ledlmf")

  return dao.saveCollection(collection)
})
