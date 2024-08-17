/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lhqwy7opq885bdd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ydc8jddm",
    "name": "section",
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
  const collection = dao.findCollectionByNameOrId("lhqwy7opq885bdd")

  // remove
  collection.schema.removeField("ydc8jddm")

  return dao.saveCollection(collection)
})
