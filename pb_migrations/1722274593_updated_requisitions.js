/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v1dcnzscinfp3dh")

  // remove
  collection.schema.removeField("z0cvylxf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "giazszsi",
    "name": "stock",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "82rtspvv1p4xtom",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v1dcnzscinfp3dh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z0cvylxf",
    "name": "supplier",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "5vfl7l1y5s28vny",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("giazszsi")

  return dao.saveCollection(collection)
})
