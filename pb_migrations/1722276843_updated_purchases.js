/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5lb8u6zbt4isn7a")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8fn1jwxl",
    "name": "requisition",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "v1dcnzscinfp3dh",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5lb8u6zbt4isn7a")

  // remove
  collection.schema.removeField("8fn1jwxl")

  return dao.saveCollection(collection)
})
