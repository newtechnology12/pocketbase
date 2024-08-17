/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7pw926dpq4kcntx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ybe5xrmt",
    "name": "cancel_reason",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7pw926dpq4kcntx")

  // remove
  collection.schema.removeField("ybe5xrmt")

  return dao.saveCollection(collection)
})
