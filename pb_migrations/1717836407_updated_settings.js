/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p4oit50uvu6w5ok")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zfuhak8a",
    "name": "enable_ticket_recall",
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
  collection.schema.removeField("zfuhak8a")

  return dao.saveCollection(collection)
})
