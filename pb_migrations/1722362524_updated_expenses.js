/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vbr7ze75k0p5vo5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ww5zkn2t",
    "name": "payment_method",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "qrwl8n4ejdf3fb3",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vbr7ze75k0p5vo5")

  // remove
  collection.schema.removeField("ww5zkn2t")

  return dao.saveCollection(collection)
})
