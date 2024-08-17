/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3u4oe1mt6hgnrdu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cfji4xwm",
    "name": "printed",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3u4oe1mt6hgnrdu")

  // remove
  collection.schema.removeField("cfji4xwm")

  return dao.saveCollection(collection)
})
