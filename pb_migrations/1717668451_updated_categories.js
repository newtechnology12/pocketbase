/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dnpqp3s5aixi9td")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2juqvbjt",
    "name": "destinations",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "vyegxqb5q93by3z",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dnpqp3s5aixi9td")

  // remove
  collection.schema.removeField("2juqvbjt")

  return dao.saveCollection(collection)
})
