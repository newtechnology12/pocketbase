/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p4oit50uvu6w5ok")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oiswdzq4",
    "name": "application_url",
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
  const collection = dao.findCollectionByNameOrId("p4oit50uvu6w5ok")

  // remove
  collection.schema.removeField("oiswdzq4")

  return dao.saveCollection(collection)
})
