/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5lb8u6zbt4isn7a")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dxzyc3td",
    "name": "attachment",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5lb8u6zbt4isn7a")

  // remove
  collection.schema.removeField("dxzyc3td")

  return dao.saveCollection(collection)
})
