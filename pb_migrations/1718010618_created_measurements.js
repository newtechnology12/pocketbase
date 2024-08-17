/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "1viopevvytxg0z7",
    "created": "2024-06-10 09:10:18.567Z",
    "updated": "2024-06-10 09:10:18.567Z",
    "name": "measurements",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "pbjnfyoq",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("1viopevvytxg0z7");

  return dao.deleteCollection(collection);
})
