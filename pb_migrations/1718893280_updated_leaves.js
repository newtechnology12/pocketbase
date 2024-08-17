/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cwd32c6i3za9i1l")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bfuuuftr",
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
  const collection = dao.findCollectionByNameOrId("cwd32c6i3za9i1l")

  // remove
  collection.schema.removeField("bfuuuftr")

  return dao.saveCollection(collection)
})
