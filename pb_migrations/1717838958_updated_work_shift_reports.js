/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ay0ovnb3xsbfe69")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ra8jzeoy",
    "name": "activity",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "92qqnrkgx2ri0ig",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ay0ovnb3xsbfe69")

  // remove
  collection.schema.removeField("ra8jzeoy")

  return dao.saveCollection(collection)
})
