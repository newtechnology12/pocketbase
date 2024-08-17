/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("06hray7z6x1yk5t")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pfbzchbo",
    "name": "item",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "t7e2x0rachef11i",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("06hray7z6x1yk5t")

  // remove
  collection.schema.removeField("pfbzchbo")

  return dao.saveCollection(collection)
})
