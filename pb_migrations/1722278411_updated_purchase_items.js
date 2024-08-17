/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("06hray7z6x1yk5t")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6xvpuy8t",
    "name": "status",
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
  const collection = dao.findCollectionByNameOrId("06hray7z6x1yk5t")

  // remove
  collection.schema.removeField("6xvpuy8t")

  return dao.saveCollection(collection)
})
