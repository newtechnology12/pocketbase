/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i9za1ioimn80lgs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dl4d3lqr",
    "name": "notes",
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
  collection.schema.removeField("dl4d3lqr")

  return dao.saveCollection(collection)
})
