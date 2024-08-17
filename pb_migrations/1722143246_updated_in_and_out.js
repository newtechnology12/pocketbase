/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i9za1ioimn80lgs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fpv6lszs",
    "name": "item",
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
  const collection = dao.findCollectionByNameOrId("i9za1ioimn80lgs")

  // remove
  collection.schema.removeField("fpv6lszs")

  return dao.saveCollection(collection)
})
