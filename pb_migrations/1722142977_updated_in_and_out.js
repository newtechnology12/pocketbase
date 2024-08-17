/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i9za1ioimn80lgs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "udqk1g4r",
    "name": "total",
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
  const collection = dao.findCollectionByNameOrId("i9za1ioimn80lgs")

  // remove
  collection.schema.removeField("udqk1g4r")

  return dao.saveCollection(collection)
})
