/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vn362mb4h80kaly")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tdfgdqnq",
    "name": "cost",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vn362mb4h80kaly")

  // remove
  collection.schema.removeField("tdfgdqnq")

  return dao.saveCollection(collection)
})
