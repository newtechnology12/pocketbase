routerAdd("GET", "/hello/:name", (c) => {
  const dd = [];
  for (let i = 0; i < 1000; i++) {
    const ff = $security.randomString(15);
    dd.push(ff);
  }
  console.log(JSON.stringify(dd));
  let name = c.pathParam("name");
  return c.json(200, { message: "Hello " + name });
});

routerAdd("POST", "/create-order-item", (c) => {
  const data = $apis.requestInfo(c).data;

  const menu = data?.menu;
  const quantity = data?.quantity;
  const order = data?.order;
  const modifiers = data?.modifiers;
  const variant = data?.variant;
  const notes = data?.notes;
  const amount = data?.amount;
  const ticket = data?.order_ticket;

  const reqs = {
    order: order,
    menu: menu,
    quantity: quantity,
    modifiers: modifiers,
    variant: variant,
    notes: notes,
    amount: amount,
    status: "draft",
    order_ticket: ticket,
  };

  const order_item_collection = $app
    .dao()
    .findCollectionByNameOrId("order_items");

  const order_item = new Record(order_item_collection, {
    id: $security.randomString(15),
    ...reqs,
  });

  $app.dao().saveRecord(order_item);

  const order_record = $app.dao().findRecordById("orders", reqs.order);

  const order_ticket = $app
    .dao()
    .findRecordById("order_tickets", reqs.order_ticket);

  order_record.set("items", [
    ...order_record.get("items"),
    order_item.get("id"),
  ]);

  order_ticket.set("order_items", [
    ...order_ticket.get("order_items"),
    order_item.get("id"),
  ]);

  $app.dao().saveRecord(order_record);
  $app.dao().saveRecord(order_ticket);

  return c.json(200, { message: "Order item created" });
});

routerAdd("POST", "/fire-ticket", (c) => {
  const data = $apis.requestInfo(c).data;

  console.log(JSON.stringify(data));

  const ticket_items = data?.items;
  const station = data?.station;

  // loop and update ticket items to pending
  for (let item of ticket_items) {
    const order_item = $app.dao().findRecordById("order_items", item);
    order_item.set("status", "pending");
    $app.dao().saveRecord(order_item);
  }

  const order_ticket = $app.dao().findRecordById("order_tickets", data?.ticket);
  const bill_to_use = $app.dao().findRecordById("order_bills", data?.bill);
  // update ticket status to pending
  order_ticket.set("status", "open");
  order_ticket.set("fired_at", new Date().toISOString());
  order_ticket.set("order_station", station);

  $app.dao().saveRecord(order_ticket);

  // bill update items
  bill_to_use.set("items", [...bill_to_use.get("items"), ...ticket_items]);
  $app.dao().saveRecord(bill_to_use);

  return c.json(200, { message: "Order item created" });
});

routerAdd("POST", "/complete-ticket", (c) => {
  const data = $apis.requestInfo(c).data;

  const ticket_items = data?.items;
  const user = data?.user;
  const ticket = data?.ticket;

  // loop and update ticket items to pending
  for (let item of ticket_items) {
    const order_item = $app.dao().findRecordById("order_items", item);
    order_item.set("status", "completed");
    $app.dao().saveRecord(order_item);
  }

  const order_ticket = $app.dao().findRecordById("order_tickets", ticket);
  // update ticket status to pending
  order_ticket.set("status", "completed");
  order_ticket.set("completed_at", new Date());
  order_ticket.set("completed_by", user);

  $app.dao().saveRecord(order_ticket);

  return c.json(200, { message: "Order item created" });
});

routerAdd("POST", "/update-user-password", (c) => {
  const data = $apis.requestInfo(c).data;

  const user = data?.user;
  const password = data?.password;

  const user_record = $app.dao().findRecordById("users", user);
  user_record.setPassword(password);
  user_record.validatePassword(password);
  user_record.passwordHash();

  $app.dao().saveRecord(user_record);

  return c.json(200, { message: "Password updated" });
});

routerAdd("GET", "/sales-items", (c) => {
  const records = $app.dao().findRecordsByFilter(
    "order_items", // collection
    "status = 'completed'", // filter
    "-created", // sort
    10000, // limit
    0 // offset
  );

  return c.json(200, { count: records?.length });
});

$app.rootCmd.addCommand(
  new Command({
    use: "seed",
    run: () => {
      const roles_collection = $app.dao().findCollectionByNameOrId("roles");
      const settings_collection = $app
        .dao()
        .findCollectionByNameOrId("settings");

      const permitions = [
        {
          access: true,
          name: "general_settings",
          title: "General settings",
        },
      ];

      const role = new Record(roles_collection, {
        id: $security.randomString(15),
        name: "admin",
        status: "active",
        permitions,
      });

      const settings = new Record(settings_collection, {
        company_name: "Restaurant Portal",
      });

      $app.dao().saveRecord(role);
      $app.dao().saveRecord(settings);
    },
  })
);

// fires for every auth collection
onRecordAuthRequest((e) => {
  const isActive = e.record.get("status") === "active";
  if (!isActive) {
    throw new Error("User is not active");
  } else {
    return true;
  }
});

onModelAfterCreate((e) => {
  const newOrderId = e.model.id;

  const bills_collection = $app.dao().findCollectionByNameOrId("order_bills");

  const tickets_collection = $app
    .dao()
    .findCollectionByNameOrId("order_tickets");

  const order_record = $app.dao().findRecordById("orders", newOrderId);

  const tableId = order_record.get("table");

  function generateUniqueId() {
    return Math.floor(Math.random() * 1000000);
  }

  const bill = new Record(bills_collection, {
    id: $security.randomString(15),
    items: [],
    order: newOrderId,
    code: generateUniqueId(),
  });

  const ticket = new Record(tickets_collection, {
    id: $security.randomString(15),
    order: newOrderId,
    items: [],
    status: "draft",
    code: generateUniqueId(),
  });

  const createdTicketId = ticket.get("id");
  const createdBillId = bill.get("id");

  $app.dao().saveRecord(bill);
  $app.dao().saveRecord(ticket);

  order_record.set("tickets", [createdTicketId]);
  order_record.set("bills", [createdBillId]);
  $app.dao().saveRecord(order_record);

  if (tableId) {
    const table_record = $app.dao().findRecordById("tables", tableId);
    table_record.set("status", "occupied");
    $app.dao().saveRecord(table_record);
    console.log("Table status updated -->" + table_record.get("status"));
  }

  console.log("Order created", newOrderId);
}, "orders");

// on order_item updated from draft to pending then move it to a bill
onModelAfterUpdate((e) => {
  const newOrderItemId = e.model.id;
  const orderId = e.model.get("order");

  const newStatus = e.model.get("status");
  const original = e.model.originalCopy();
  const oldStatus = original.get("status");

  if (newStatus === "pending" && oldStatus === "draft") {
    const order_record = $app.dao().findRecordById("orders", orderId);

    const order_bills = $app
      .dao()
      .findRecordsByFilter("order_bills", `order="${orderId}"`);

    let bill_to_use = null;

    // find bill to use which my have no transactions
    for (let bill of order_bills) {
      const transactions = bill.get("transactions");
      if (!transactions.length) {
        bill_to_use = bill;
        break;
      }
    }

    function generateUniqueId() {
      return Math.floor(Math.random() * 1000000);
    }

    if (!bill_to_use) {
      const bills_collection = $app
        .dao()
        .findCollectionByNameOrId("order_bills");
      bill_to_use = new Record(bills_collection, {
        id: $security.randomString(15),
        items: [],
        order: orderId,
        code: generateUniqueId(),
      });
      $app.dao().saveRecord(bill_to_use);
      order_record.set("bills", [
        ...order_record.get("bills"),
        bill_to_use.get("id"),
      ]);
      console.log("New bill created", bill_to_use.get("id"));
    }

    console.log(bill_to_use.get("id"), "bill_to_use");

    bill_to_use.set("items", [...bill_to_use.get("items"), newOrderItemId]);

    $app.dao().saveRecord(bill_to_use);
  }
}, "order_items");

onModelAfterCreate((e) => {
  const newTicketId = e.model.id;
  const orderId = e.model.get("order");

  const order_record = $app.dao().findRecordById("orders", orderId);

  order_record.set("tickets", [...order_record.get("tickets"), newTicketId]);
  $app.dao().saveRecord(order_record);
}, "order_tickets");

onModelAfterCreate((e) => {
  const newBillId = e.model.id;
  const orderId = e.model.get("order");

  const order_record = $app.dao().findRecordById("orders", orderId);

  order_record.set("bills", [...(order_record.get("bills") || []), newBillId]);
  const dao = $app.dao().withoutHooks();
  dao.saveRecord(order_record);
}, "order_bills");

onModelAfterUpdate((e) => {
  // check if order table is updated then make the new table occupied and old table free
  const newTableId = e.model.get("table");
  const original = e.model.originalCopy();
  const oldTableId = original.get("table");

  if (newTableId !== oldTableId && newTableId) {
    const newTable = $app.dao().findRecordById("tables", newTableId);
    newTable.set("status", "occupied");
    $app.dao().saveRecord(newTable);

    const oldTable = $app.dao().findRecordById("tables", oldTableId);
    oldTable.set("status", "available");
    $app.dao().saveRecord(oldTable);
    console.log("Table status updated", newTableId, oldTableId);
  } else if (!oldTableId && newTableId) {
    console.log("New table occupied", newTableId);
    const newTable = $app.dao().findRecordById("tables", newTableId);
    newTable.set("status", "occupied");
    $app.dao().saveRecord(newTable);
  }

  // check if order is completed or canceled then make the table free
  const newStatus = e.model.get("status");

  if ((newStatus === "completed" || newStatus === "canceled") && newTableId) {
    const table_record = $app.dao().findRecordById("tables", newTableId);
    table_record.set("status", "available");
    $app.dao().saveRecord(table_record);
    console.log("Table status updated", newTableId);
  }

  console.log("Order table updated", newTableId, oldTableId);
}, "orders");

// detect when user is updated
onModelAfterUpdate((e) => {
  // check when user role is updated and update role users array field
  const userId = e.model.id;
  const newRole = e.model.get("role");
  const original = e.model.originalCopy();
  const oldRole = original.get("role");

  if (newRole !== oldRole) {
    console.log("updating roles", newRole, oldRole);
    const role_record = $app.dao().findRecordById("roles", newRole);
    role_record.set("users", [...(role_record.get("users") || []), userId]);
    $app.dao().saveRecord(role_record);

    if (oldRole) {
      console.log("removing old role", oldRole);
      const old_role_record = $app.dao().findRecordById("roles", oldRole);

      old_role_record.set(
        "users",
        (old_role_record.get("users") || []).filter((u) => u !== userId)
      );

      $app.dao().saveRecord(old_role_record);
    }
    // if no new role then remove user from old role
    if (!newRole) {
      console.log("removing old role", oldRole);
      const old_role_record = $app.dao().findRecordById("roles", oldRole);

      old_role_record.set(
        "users",
        (old_role_record.get("users") || []).filter((u) => u !== userId)
      );

      $app.dao().saveRecord(old_role_record);
    }
  }
}, "users");

// detect when user is updated
onModelAfterUpdate((e) => {
  // check when user role is updated and update role users array field
  const newStatus = e.model.get("status");
  const oldStatus = original.get("status");
  const table = original.get("table");

  if (newStatus !== oldStatus) {
    if (
      (newStatus === "completed" || newStatus === "cancelled") &&
      (oldStatus === "confirmed" || oldStatus === "pending")
    ) {
      const table_record = $app.dao().findRecordById("tables", table);
      table_record.set("status", "available");
      $app.dao().saveRecord(table_record);
      console.log("Table status updated", table_record);
    }
  }
}, "reservations");

// onModelAfterCreate((e) => {
//   const menu = e.model.get("menu_item");
//   const ingredient = e.model.get("ingredient");
//   const new_stock_item_id = e.model.id;

//   // update menu stock items
//   const record = menu
//     ? $app.dao().findRecordById("menu_items", menu)
//     : $app.dao().findRecordById("ingredients", ingredient);

//   const new_stock_items = [
//     ...(record.get("stock_items") || []),
//     new_stock_item_id,
//   ];

//   const unique_stock_items = [...new Set(new_stock_items)];

//   console.log("Stock item created", unique_stock_items);

//   record.set("stock_items", unique_stock_items);
//   // update stock items
//   $app.dao().saveRecord(record);
// }, "stock_items");

routerAdd("POST", "/adjust-stock-after-sale", (c) => {
  const utils = require(`${__hooks}/utils.js`);

  const data = new DynamicModel({
    items: [],
    order_id: "",
  });

  c.bind(data);

  const items = data?.items;
  const order_id = data?.order_id;

  const order = $app.dao().findRecordById("orders", order_id);

  for (let item of items || []) {
    const order_item = $app.dao().findRecordById("order_items", item);
    $app
      .dao()
      .expandRecord(
        order_item,
        [
          "menu",
          "menu.ingredients",
          "menu.ingredients.ingredient",
          "menu.ingredients.ingredient.stock_items",
          "order_ticket.order_station",
          "order_ticket.order_station.stock",
          "menu.stock_items",
        ],
        null
      );

    const menu = order_item.expandedOne("menu");
    const menu_ingredients = menu.expandedAll("ingredients");
    const item_ticket = order_item.expandedOne("order_ticket");
    const menu_stock_items = menu.expandedAll("stock_items");
    const item_ticket_order_station = item_ticket.expandedOne("order_station");

    const order_station_stock = item_ticket
      .expandedOne("order_station")
      .get("stock");

    if (!menu.getBool("track_inventory") && !menu_ingredients?.length) {
      console.log("-- No inventory tracking set --| Skipped ---");
      continue;
    }

    const isStandaloneItem = !menu_ingredients?.length;

    if (isStandaloneItem) {
      const stock_item_to_use = menu_stock_items?.find(
        (e) => e.get("stock") === order_station_stock
      );

      if (!stock_item_to_use) {
        console.log("-- No stock item linked --| Skipped ---");
        continue;
      }

      utils.adjustStockItem({
        stock_item: stock_item_to_use,
        type: "reduction",
        reason: "sale",
        created_by: order.get("waiter"),
        quantity: order_item.getInt("quantity"),
      });
    } else {
      const trackable_ingredients = menu_ingredients.filter((e) =>
        e.expandedOne("ingredient").get("track_inventory")
      );

      if (!trackable_ingredients.length) {
        console.log("-- No trackable ingredients in the menu --| Skipped ---");
        continue;
      }

      const adjustments = trackable_ingredients.map((menu_ingredient) => {
        const stock_items = menu_ingredient
          .expandedOne("ingredient")
          .expandedAll("stock_items");

        if (!item_ticket_order_station.get("stock")) {
          console.log("-- No stock for destination set -| Skipping --");
          return;
        }

        const stock_item_to_use = stock_items?.find(
          (e) => e.get("stock") === item_ticket_order_station.get("stock")
        );

        return stock_item_to_use
          ? {
              stock_item: stock_item_to_use,
              type: "reduction",
              reason: "sale",
              created_by: order.get("waiter"),
              quantity:
                menu_ingredient.get("quantity") * order_item.get("quantity"),
            }
          : null;
      });

      const adjustments_to_use = adjustments.filter((e) => e);

      if (!adjustments_to_use.length) {
        console.log("No stock items found for menu ingredients |- Skiped");
        return;
      }

      for (let index = 0; index < adjustments_to_use.length; index++) {
        const element = adjustments_to_use[index];
        utils.adjustStockItem(element);
      }
    }
  }

  return c.json(200, { message: "Success" });
});

routerAdd("POST", "/adjust-stock-after-cancel", (c) => {
  const utils = require(`${__hooks}/utils.js`);

  const data = new DynamicModel({
    items: [],
    order_id: "",
  });

  c.bind(data);

  const items = data?.items;
  const order_id = data?.order_id;

  const order = $app.dao().findRecordById("orders", order_id);

  for (let item of items || []) {
    const order_item = $app.dao().findRecordById("order_items", item);
    $app
      .dao()
      .expandRecord(
        order_item,
        [
          "menu",
          "menu.ingredients",
          "menu.ingredients.ingredient",
          "menu.ingredients.ingredient.stock_items",
          "order_ticket.order_station",
          "order_ticket.order_station.stock",
          "menu.stock_items",
        ],
        null
      );

    const menu = order_item.expandedOne("menu");
    const menu_ingredients = menu.expandedAll("ingredients");
    const item_ticket = order_item.expandedOne("order_ticket");
    const menu_stock_items = menu.expandedAll("stock_items");
    const item_ticket_order_station = item_ticket.expandedOne("order_station");

    const order_station_stock = item_ticket
      .expandedOne("order_station")
      .get("stock");

    if (!menu.getBool("track_inventory") && !menu_ingredients?.length) {
      console.log("-- No inventory tracking set --| Skipped ---");
      continue;
    }

    const isStandaloneItem = !menu_ingredients?.length;

    if (isStandaloneItem) {
      const stock_item_to_use = menu_stock_items?.find(
        (e) => e.get("stock") === order_station_stock
      );

      if (!stock_item_to_use) {
        console.log("-- No stock item linked --| Skipped ---");
        continue;
      }

      utils.adjustStockItem({
        stock_item: stock_item_to_use,
        type: "addition",
        reason: "cancelation",
        created_by: order.get("waiter"),
        quantity: order_item.getInt("quantity"),
      });
    } else {
      const trackable_ingredients = menu_ingredients.filter((e) =>
        e.expandedOne("ingredient").get("track_inventory")
      );

      if (!trackable_ingredients.length) {
        console.log("-- No trackable ingredients in the menu --| Skipped ---");
        continue;
      }

      const adjustments = trackable_ingredients.map((menu_ingredient) => {
        const stock_items = menu_ingredient
          .expandedOne("ingredient")
          .expandedAll("stock_items");

        if (!item_ticket_order_station.get("stock")) {
          console.log("-- No stock for destination set -| Skipping --");
          return;
        }

        const stock_item_to_use = stock_items?.find(
          (e) => e.get("stock") === item_ticket_order_station.get("stock")
        );

        return stock_item_to_use
          ? {
              stock_item: stock_item_to_use,
              type: "addition",
              reason: "cancelation",
              created_by: order.get("waiter"),
              quantity:
                menu_ingredient.get("quantity") * order_item.get("quantity"),
            }
          : null;
      });

      const adjustments_to_use = adjustments.filter((e) => e);

      if (!adjustments_to_use.length) {
        console.log("No stock items found for menu ingredients |- Skiped");
        return;
      }

      for (let index = 0; index < adjustments_to_use.length; index++) {
        const element = adjustments_to_use[index];
        utils.adjustStockItem(element);
      }
    }
  }

  return c.json(200, { message: "Success" });
});
