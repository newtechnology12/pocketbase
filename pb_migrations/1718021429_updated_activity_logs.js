/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qlmwpryt03ygco5")

  // remove
  collection.schema.removeField("cmfhignb")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qlmwpryt03ygco5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cmfhignb",
    "name": "method",
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
})
