/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v4nkdzysv89pokl")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cmjczmno",
    "name": "recieved",
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
  const collection = dao.findCollectionByNameOrId("v4nkdzysv89pokl")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cmjczmno",
    "name": "recievable",
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
})
