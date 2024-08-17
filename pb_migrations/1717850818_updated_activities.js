/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("92qqnrkgx2ri0ig")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "u40uep0l",
    "name": "track_as_sale",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("92qqnrkgx2ri0ig")

  // remove
  collection.schema.removeField("u40uep0l")

  return dao.saveCollection(collection)
})
