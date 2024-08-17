/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rqr3fwoh7gp2z8q")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ehgwb5vp",
    "name": "variant",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rqr3fwoh7gp2z8q")

  // remove
  collection.schema.removeField("ehgwb5vp")

  return dao.saveCollection(collection)
})
