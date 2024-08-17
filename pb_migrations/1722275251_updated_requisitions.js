/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v1dcnzscinfp3dh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "b6tpft2l",
    "name": "purchase",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "5lb8u6zbt4isn7a",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v1dcnzscinfp3dh")

  // remove
  collection.schema.removeField("b6tpft2l")

  return dao.saveCollection(collection)
})
