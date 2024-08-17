/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3u4oe1mt6hgnrdu")

  // remove
  collection.schema.removeField("nezscj6c")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "b5ep3wp1",
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
  const collection = dao.findCollectionByNameOrId("3u4oe1mt6hgnrdu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nezscj6c",
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

  // remove
  collection.schema.removeField("b5ep3wp1")

  return dao.saveCollection(collection)
})
