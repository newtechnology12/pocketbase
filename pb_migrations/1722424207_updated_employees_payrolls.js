/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v4nkdzysv89pokl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ctpao8ax",
    "name": "transactions",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "jsuxou67rewlg0a",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v4nkdzysv89pokl")

  // remove
  collection.schema.removeField("ctpao8ax")

  return dao.saveCollection(collection)
})
