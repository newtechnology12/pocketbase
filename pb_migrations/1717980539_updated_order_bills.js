/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vbz5wrhqy754skm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wx2kszsh",
    "name": "code",
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
  const collection = dao.findCollectionByNameOrId("vbz5wrhqy754skm")

  // remove
  collection.schema.removeField("wx2kszsh")

  return dao.saveCollection(collection)
})
