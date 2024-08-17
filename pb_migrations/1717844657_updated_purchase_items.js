/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("06hray7z6x1yk5t")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2m9zovms",
    "name": "purchase",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "5lb8u6zbt4isn7a",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("06hray7z6x1yk5t")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2m9zovms",
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
})
