/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ohg1uk384jf3xil")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tvlym3qs",
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
  const collection = dao.findCollectionByNameOrId("ohg1uk384jf3xil")

  // remove
  collection.schema.removeField("tvlym3qs")

  return dao.saveCollection(collection)
})
