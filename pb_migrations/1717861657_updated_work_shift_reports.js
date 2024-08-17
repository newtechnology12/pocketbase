/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ay0ovnb3xsbfe69")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "piw3cftc",
    "name": "cancelations",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ay0ovnb3xsbfe69")

  // remove
  collection.schema.removeField("piw3cftc")

  return dao.saveCollection(collection)
})
